"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox = ({ data, selected }: ConversationBoxProps) => {
  const otherUser = useOtherUser(data);
  return <div>Conversation Box</div>;
};

export default ConversationBox;
