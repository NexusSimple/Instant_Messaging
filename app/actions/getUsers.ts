import getSession from "@/app/actions/getSession";
import { prismadb } from "@/app/libs/prismadb";

const getUsers = async () => {
  const session = await getSession();
  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prismadb.user.findMany({
      orderBy: {
        createdAt: "desc",
      }, // Newest users are at the TOP
      where: {
        NOT: {
          email: session.user.email,
        }, // Find users except the current user
      },
    });

    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
