import getUsers from "@/app/actions/getUsers";
import Sidebar from "@/app/components/sidebar/sidebar";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
