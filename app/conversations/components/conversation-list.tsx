"use client";

import { FullConversationType } from "@/app/types";
import { User } from "@prisma/client";
import { useState } from "react";

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
  const [items, setItems] = useState(initialItems);

  return <div>Conversation List</div>;
};

export default ConversationList;
