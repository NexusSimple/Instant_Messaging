import { FullConversationType } from "@/app/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (
  conversation:
    | FullConversationType
    | {
        users: User[];
      }
) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    // Filter out the current user from the conversation
    const otherUser = conversation.users.find(
      (user) => user.email !== currentUserEmail
    );

    return otherUser;
  }, [session?.data?.user?.email, conversation.users]);

  return otherUser;
};

export default useOtherUser;
