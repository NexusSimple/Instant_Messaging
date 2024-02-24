interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem = ({ href, icon: Icon, active, onClick }: MobileItemProps) => {
  return <div>MobileItem</div>;
};

export default MobileItem;
