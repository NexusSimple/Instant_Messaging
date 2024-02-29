"use client";

import MessageBox from "@/app/conversations/[conversationId]/components/message-box";
import useConversation from "@/app/hooks/useConversation";
import { pusherClient } from "@/app/libs/pusher";
import { FullMessageType } from "@/app/types";
import axios from "axios";
import { find } from "lodash";
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

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    // Every user of the conversation "conversationId" is going to be listening to events in the channel "conversationId"
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      // When we receive a new message, we are going to alert everyone that we have seen that message.
      axios.post(`/api/conversations/${conversationId}/seen`);

      // Put the new message into the messages array state.
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        } // If already the new message is present in the array of messages state, then just return the already existing array of messages state.

        // Else just add the new message to the array of messages state.
        return [...current, message];
      });
      // https://chat.openai.com/share/c56955b1-878a-4356-a178-a75516190c74

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    // Bind the Pusher Client to expect the key or event "messages:new" and attach a function handler that will respond to what happens.
    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    // Unbind and Unsubscribe , everytime we unmount
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
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
