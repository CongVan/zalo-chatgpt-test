import { useCallback, useEffect } from "react";
type UseOpenAIProps = {
  onMessage: (msg) => void;
  onCompleted: () => void;
  onError: (e) => void;
  controller: AbortController;
};
export const useOpenAi = ({
  onMessage,
  onCompleted,
  controller,
  onError,
}: UseOpenAIProps) => {
  const mutate = useCallback(
    async (prompt) => {
      const response = await fetch(
        import.meta.env.VITE_APP_OPENAPI_URL + "?input=" + prompt,
        {
          signal: controller.signal,
        }
      ).catch((e) => {
        onError(e);
      });
      // const reader = response.body.getReader();

      const reader = response?.body
        ?.pipeThrough(new TextDecoderStream())
        .getReader();
      if (!reader) {
        return;
      }
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read();

        if (value === undefined && done) {
          onCompleted();
          break;
        }
        // const jsonData = JSON.parse(value);
        onMessage(value);
      }
    },
    [onCompleted, onMessage, onError, controller]
  );

  return {
    mutate,
  };
};
