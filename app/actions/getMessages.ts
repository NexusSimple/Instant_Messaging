import { prismadb } from "@/app/libs/prismadb";

const getMessages = async (conversationId: string) => {
  try {
    const messages = await prismadb.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (error: any) {
    return null;
  }
};

export default getMessages;
