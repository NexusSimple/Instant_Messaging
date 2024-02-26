"use client";

import { Conversation, User } from "@prisma/client";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}

const ProfileDrawer = ({ isOpen, onClose, data }: ProfileDrawerProps) => {
  return <div></div>;
};

export default ProfileDrawer;
