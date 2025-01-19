import { Exam, Session, Subscription } from "../../api-types";

export type TTeacherDatasContext = {
  exams?: Exam[];
  sessions?: Session[];
  subscriptions?: Subscription[];
  reload: () => void;
};
