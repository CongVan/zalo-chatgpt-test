import { StepType } from "@reactour/tour";

export const steps: StepType[] = [
  {
    selector: "[data-tour-step='1']",
    content: "Hello! Welcome to my ChatGPT",
  },
  {
    selector: "[data-tour-step='2']",
    content: "Input your prompt here and press Enter",
  },
  {
    selector: "[data-tour-step='3']",
    content: "See response in text here and enjoy it!",
  },
];
