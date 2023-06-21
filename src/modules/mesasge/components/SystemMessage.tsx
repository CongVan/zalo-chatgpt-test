import { memo, useEffect, useState } from "react";
import { useOpenAi } from "../../openai/use-openai";
import { useChat } from "../context";

interface SystemMessageProps {
  prompt: string;
}

function SystemMessage({ prompt }: SystemMessageProps) {
  const { controller, setIsProcessing } = useChat();
  const [isLoading, setIsLoading] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [error, setError] = useState(false);

  const { mutate } = useOpenAi({
    controller,
    onMessage(msg) {
      setResponseText((s) => s + msg);
    },
    onCompleted() {
      setIsProcessing(false);
      setIsLoading(false);
      setIsDone(true);
    },
    onError() {
      setError(true);
      setIsProcessing(false);
      setIsLoading(false);
    },
  });
  useEffect(() => {
    mutate(prompt);
  }, []);

  const onClickRegenerate = () => {
    setResponseText("");
    mutate(prompt);
  };

  const onClickTryAgain = () => {
    mutate(prompt);
  };

  return (
    <>
      {error ? (
        <>
          <div>Some thing went wrong!Please click try again after 20s</div>
          <button
            className="btn btn-primary rounded-full btn-sm"
            onClick={() => onClickTryAgain()}
          >
            Try again!
          </button>
        </>
      ) : isLoading ? (
        <span className="loading loading-dots loading-md"></span>
      ) : (
        <>
          <div>{responseText}</div>

          {isDone && (
            <button
              className="btn btn-accent rounded-full btn-sm"
              onClick={() => onClickRegenerate()}
            >
              Re-generate
            </button>
          )}
        </>
      )}
    </>
  );
}
// SystemMessage.name = "SystemMessage";

export default memo(SystemMessage);
