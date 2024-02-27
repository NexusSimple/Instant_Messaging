import getCurrentUser from "@/app/actions/getCurrentUser";
import { prismadb } from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // This existingConversation will be used when Implementing PUSHER ( real time )
    const existingConversation = await prismadb.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const deletedConversation = await prismadb.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        }, // Only users which are part of the group can remove a conversation
      },
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.log("[DELETE_CONVERSATION]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
