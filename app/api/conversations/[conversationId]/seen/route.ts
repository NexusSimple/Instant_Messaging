interface ConversationIdParams {
  conversationId?: string;
}

export async function POST(
  req: Request,
  { params }: { params: ConversationIdParams }
) {}
