import getConversations from "@/app/actions/getConversations";
import getUsers from "@/app/actions/getUsers";
import Sidebar from "@/app/components/sidebar/sidebar";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
