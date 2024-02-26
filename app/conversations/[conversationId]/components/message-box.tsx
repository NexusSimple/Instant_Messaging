import { FullMessageType } from "@/app/types";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox = ({ data, isLast }: MessageBoxProps) => {
  return <div>Message Box</div>;
};

export default MessageBox;
