"use client";

import { Conversation, User } from "@prisma/client";

interface ConversationListProps {
  initialItems: Conversation[];
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
