import getCurrentUser from "@/app/actions/getCurrentUser";
import { prismadb } from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    if (isGroup) {
      const newConversation = await prismadb.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        }, // users field in the Conversation Tables using connect will simply have an object with id nothing else from the fields of the Users table
        include: {
          users: true,
        }, // Populate the field "users" of the Conversation Table with data from the Users Table.
      });

      return NextResponse.json(newConversation);
    }
  } catch (error: any) {
    // console.log("[CONVERSATIONS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
