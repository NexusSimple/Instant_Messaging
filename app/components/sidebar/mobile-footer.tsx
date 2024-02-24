import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  return <div>Mobile Footer</div>;
};

export default MobileFooter;
