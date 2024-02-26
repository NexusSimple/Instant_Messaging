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

  return <div>Message Box</div>;
};

export default MessageBox;
