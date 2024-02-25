import getUsers from "@/app/actions/getUsers";
import Sidebar from "@/app/components/sidebar/sidebar";
import UserList from "@/app/users/components/user-list";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <UserList />
        {children}
      </div>
    </Sidebar>
  );
}
