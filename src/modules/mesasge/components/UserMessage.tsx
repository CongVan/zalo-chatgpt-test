
interface UserMessageProps {
  prompt: string;
}

function UserMessage({ prompt }: UserMessageProps) {
  return <>{prompt}</>;
}

export default UserMessage;
