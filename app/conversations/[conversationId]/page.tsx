import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";

interface ConversationIdParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: ConversationIdParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  return <div>Conversation Id</div>;
};

export default ConversationId;
