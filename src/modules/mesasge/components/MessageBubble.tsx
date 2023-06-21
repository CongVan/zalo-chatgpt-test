import { twMerge } from "tailwind-merge";
import UserMessage from "./UserMessage";
import SystemMessage from "./SystemMessage";
import { IMessage } from "../../../types/Message";

interface MessageBubbleProps extends IMessage {}
const MessageComponent = {
  user: UserMessage,
  system: SystemMessage,
};
function MessageBubble({ prompt, role }: MessageBubbleProps) {
  const Component = MessageComponent[role];
  return (
    <div
      className={twMerge(
        "chat text-left",
        role === "user" ? "chat-end" : "chat-start chat-"
      )}
    >
      <div
        className={twMerge(
          "chat-bubble ",
          role === "system" ? "chat-bubble-primary" : ""
        )}
      >
        <Component prompt={prompt} />
      </div>
    </div>
  );
}

export default MessageBubble;
