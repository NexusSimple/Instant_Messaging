"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox = ({ data, selected }: ConversationBoxProps) => {
  const otherUser = useOtherUser(data);

  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data, router]);

  // A variable that stores the last message from the conversation
  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1]; // The last message from the conversation
  }, [data.messages]);

  // Store the email from the logged in user's session of NextAuth
  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  // Store the Boolean value of whether the user has seen the message before or not.
  const hasSeen = useMemo(() => {
    // If no message in the conversation
    if (!lastMessage) {
      return false;
    }

    // All the users who have seen the last message
    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    // Boolean that evaluates if The last message of the conversation has been seen by the current logged in user
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
    // or return seenArray.find((user) => user.email === userEmail)
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  return <div>Conversation Box</div>;
};

export default ConversationBox;
