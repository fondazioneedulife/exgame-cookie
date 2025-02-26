import { createContext, PropsWithChildren, useState } from "react";

type TQuestions = {
  domanda1: string;
  domanda2: string;
  domanda3: string;
  domanda4: string;
};

type TSetQUestions = React.Dispatch<React.SetStateAction<TQuestions>>;

export const QuestionContext = createContext<{
  questions: TQuestions;
  setQuestions: TSetQUestions;
}>({
  questions: {
    domanda1: "",
    domanda2: "",
    domanda3: "",
    domanda4: "",
  },
  setQuestions: () => {},
});

export const QuestionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState({
    domanda1: "",
    domanda2: "",
    domanda3: "",
    domanda4: "",
  });

  return (
    <QuestionContext.Provider
      value={{ questions: state, setQuestions: setState }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
