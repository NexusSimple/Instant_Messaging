"use client";

import { FullConversationType } from "@/app/types";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
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

  const router = useRouter();

  return <div>Conversation List</div>;
};

export default ConversationList;
