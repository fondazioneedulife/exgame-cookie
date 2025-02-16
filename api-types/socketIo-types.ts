export type User = {
  id: string;
  name: string;
  responses?: Answer[];
};

export type Answer = {
  questionId: string;
  answer: string;
};

export type Message = {
  user: User;
  text: string;
};
