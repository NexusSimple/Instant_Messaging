"use client";

import MessageBox from "@/app/conversations/[conversationId]/components/message-box";
import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body = ({ initialMessages }: BodyProps) => {
  const [messages, setMessages] = useState(initialMessages);

  // When the user gets a new message, the user screen is scrolled down even if they were all the way up.
  // So a better UX
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1} // If the current messae is the last message
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
};

export default Body;
