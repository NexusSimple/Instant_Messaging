"use client";

import { FullMessageType } from "@/app/types";
import { useSession } from "next-auth/react";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox = ({ data, isLast }: MessageBoxProps) => {
  const session = useSession();

  // Is the current user the sender of the current message
  const isOwn = session.data?.user?.email === data?.sender?.email;

  // Remove the sender user from the array of the seen users for the current message
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");
  // And convert the array of each seen user's names to a string using the join method.

  return <div>Message Box</div>;
};

export default MessageBox;
