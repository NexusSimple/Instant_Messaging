"use client";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem = ({
  label,
  icon,
  href,
  onClick,
  active,
}: DesktopItemProps) => {
  return <div>Desktop</div>;
};

export default DesktopItem;
