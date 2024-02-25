"use client";

import Avatar from "@/app/components/avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
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

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        p-3 
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      <Avatar user={otherUser} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {data.name || otherUser.name}
              {/* data.name is for Group name */}
            </p>
            {lastMessage?.createdAt && (
              <p
                className="
                  text-xs 
                  text-gray-400 
                  font-light
                "
              >
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
