"use client";

import { FullConversationType } from "@/app/types";
import { User } from "@prisma/client";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
  title?: string;
}

const ConversationList = ({
  initialItems,
  users,
  title,
}: ConversationListProps) => {
  return <div>Conversation List</div>;
};

export default ConversationList;
