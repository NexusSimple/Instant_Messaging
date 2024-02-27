import getCurrentUser from "@/app/actions/getCurrentUser";
import { prismadb } from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

interface ConversationIdParams {
  conversationId?: string;
}

export async function POST(
  req: Request,
  { params }: { params: ConversationIdParams }
) {
  try {
    const currentUser = await getCurrentUser();

    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingConversation = await prismadb.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid Id", { status: 400 });
    }

    // Find the last message from the existing conversation
    const lastMessage =
      existingConversation.messages[existingConversation.messages.length - 1];

    // Confirm that there is a last message
    if (!lastMessage) {
      return NextResponse.json(existingConversation);
    }

    // If there is a last message, update the seen users of the last message to add the current user in it
    const updatedMessage = await prismadb.message.update({
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
    });

    // Update all connections with new seen
    await pusherServer.trigger(currentUser.email, "conversation:update", {
      id: conversationId,
      message: [updatedMessage],
    });

    // If user has already seen the message, no need to go further
    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(existingConversation);
    }

    // Update last message seen
    await pusherServer.trigger(
      conversationId!,
      "message:update",
      updatedMessage
    );

    return NextResponse.json(updatedMessage);
  } catch (error: any) {
    console.log("[CONVERSATION_SEEN]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
