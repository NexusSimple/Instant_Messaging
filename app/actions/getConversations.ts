import getCurrentUser from "@/app/actions/getCurrentUser";
import { prismadb } from "@/app/libs/prismadb";

const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversations = await prismadb.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      }, // Order the conversations by the latest message that has been sent in the conversation
      where: {
        userIds: {
          has: currentUser.id,
        }, // Load every single conversation that has the current user in it, that includes single one on one conversation as well as group chats.
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    return conversations;
  } catch (error: any) {
    return [];
  }
};

export default getConversations;
