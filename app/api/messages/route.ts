import getCurrentUser from "@/app/actions/getCurrentUser";
import { prismadb } from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { message, image, conversationId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 👇  Create the new message in the DB
    const newMessage = await prismadb.message.create({
      include: {
        seen: true,
        sender: true,
      },
      data: {
        body: message,
        image: image,
        conversation: {
          connect: { id: conversationId },
        }, // Connect this new message to the conversation "conversationId"
        sender: {
          connect: { id: currentUser.id },
        }, // Connect this new message to the sender "currentUser.id" i.e. to the current user.
        seen: {
          connect: {
            id: currentUser.id,
          },
        }, // Since the current user is the one who has sent the message, so automatically push the current user to the array of "seen" users.
        // Or Connect this new message to the seen user "currentUser.id" i.e. to the current user as the seen user.
      },
    });

    // 👇 Update the conversation to have the newly created message
    const updatedConversation = await prismadb.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          }, // Connect this conversation "conversationId" with the message "newMessage.id"
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    // Add the "newMessage" to the conversation "conversationId" in Real Time.
    await pusherServer.trigger(conversationId, "messages:new", newMessage);
    // https://chat.openai.com/share/3de83c50-1878-436d-95d7-2a8b48831cd3

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        id: conversationId,
        messages: [lastMessage],
      });
    });
    // https://chat.openai.com/share/3ffa3b3c-4f30-4ebc-94c9-0f1360c3f0d4

    return NextResponse.json(newMessage);
  } catch (error: any) {
    console.log("[MESSAGES]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
