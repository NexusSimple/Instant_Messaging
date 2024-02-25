"use client";

import { User } from "@prisma/client";

interface UserListProps {
  items: User[];
}
const UserList = ({ items }: UserListProps) => {
  return <div>User List component</div>;
};

export default UserList;
