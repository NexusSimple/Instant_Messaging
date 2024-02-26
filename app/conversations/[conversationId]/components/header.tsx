import { Conversation, User } from "@prisma/client";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header = ({ conversation }: HeaderProps) => {
  return <div>Header</div>;
};

export default Header;
