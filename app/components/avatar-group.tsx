"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarGroupProps {
  users?: User[];
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  users = [], // Provide an Empty array as default , so that we don't have to use "?" in users?.slice(0,3)
}) => {
  // Select only the first 3 users from the list of users.
  const slicedUsers = users.slice(0, 3);

  const positionMap = {
    0: "top-0 left-[12px]", // The 1st user is going to be positioned at the top center.
    1: "bottom-0", // The 2nd user is going to be positioned at the bottom left corner.
    2: "bottom-0 right-0", // The 3rd user is going to be positioned at the bottom right corner.
  };

  return (
    <div className="relative h-11 w-11">
      {slicedUsers.map((user, index) => (
        <div
          key={user.id}
          className={`
            absolute
            inline-block 
            rounded-full 
            overflow-hidden
            h-[21px]
            w-[21px]
            ${positionMap[index as keyof typeof positionMap]}
          `}
        >
          <Image
            fill
            src={user?.image || "/images/placeholder.jpg"}
            alt="Avatar"
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
