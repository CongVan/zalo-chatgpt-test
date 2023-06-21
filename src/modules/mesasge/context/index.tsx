import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { IMessage } from "../../../types/Message";

type State = {
  messages: IMessage[];
  controller: AbortController;
  isProcessing: boolean;
};

type Action = {
  addMessage: (msg: IMessage) => void;
  setIsProcessing: (a: boolean) => void;
};

type ChatState = State & Action;

const initialState: ChatState = {
  messages: [],
  isProcessing: false,
  controller: new AbortController(),
  addMessage: () => {},
  setIsProcessing: () => {},
};
type Actions =
  | { type: "ADD_MESSAGE"; payload: IMessage }
  | { type: "SET_IS_PROCESSING"; payload: boolean };

function reducer(state: ChatState, action: Actions): ChatState {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "SET_IS_PROCESSING":
      return {
        ...state,
        isProcessing: action.payload,
      };

    default:
      return state;
  }
}

const ChatContext = createContext<ChatState>(initialState);

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addMessage = useCallback((msg: IMessage) => {
    dispatch({ type: "ADD_MESSAGE", payload: msg });
  }, []);

  const setIsProcessing = useCallback((isProcessing) => {
    dispatch({ type: "SET_IS_PROCESSING", payload: isProcessing });
  }, []);

  const value = useMemo(() => {
    return {
      ...state,
      addMessage,
      setIsProcessing,
    };
  }, [state, addMessage, setIsProcessing]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export const useChat = () => {
  const state = useContext(ChatContext);
  return state;
};
