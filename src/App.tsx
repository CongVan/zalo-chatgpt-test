import "./App.css";
import MessageBubble from "./modules/mesasge/components/MessageBubble";
import { useChat } from "./modules/mesasge/context";

function App() {
  const { messages, addMessage, isProcessing, controller } = useChat();

  function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    e.target.reset();
    const prompt = form.get("prompt")?.toString();
    if (!prompt) return;

    addMessage({
      role: "user",
      prompt: prompt,
    });

    addMessage({
      role: "system",
      prompt: prompt,
    });
  }

  return (
    <div className="h-full mx-auto max-w-6xl" data-tour-step={1}>
      <div className="h-full mb-16" data-tour-step={3}>
        {messages.length > 0 ? (
          <>
            {messages.map((msg, index) => (
              <MessageBubble key={index} {...msg} />
            ))}
          </>
        ) : (
          <div className="tex-center text-4xl pt-10 font-bold flex items-center justify-center">Hi !!! Ask me anything.</div>
        )}
      </div>

      <form
        onSubmit={onSubmit}
        className="sticky mt-2.5 bottom-2 left-0 w-full flex flex-col items-center justify-center"
      >
        {isProcessing && (
          <button
            type="button"
            className="btn btn-accent rounded-full mx-auto mb-2 px-10"
            onClick={() => controller.abort()}
          >
            Cancel
          </button>
        )}

        <input
          name="prompt"
          className="input input-lg input-bordered w-full rounded-full"
          placeholder="Nhập gì đó vào đây nào..."
          autoFocus
          data-tour-step={2}
        />
      </form>
    </div>
  );
}

export default App;
