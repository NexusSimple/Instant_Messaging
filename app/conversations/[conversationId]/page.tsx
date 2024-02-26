interface ConversationIdParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: ConversationIdParams }) => {
  return <div>Conversation Id</div>;
};

export default ConversationId;
