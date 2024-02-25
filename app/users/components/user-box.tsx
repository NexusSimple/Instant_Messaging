"use client";

import { User } from "@prisma/client";

interface UserBoxProps {
  data: User;
}

const UserBox = ({ data }: UserBoxProps) => {
  return <div>User</div>;
};

export default UserBox;
