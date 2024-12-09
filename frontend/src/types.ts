import { Session, Subscription, Exam } from "../../api-types";

export type TTeacherDatasContext = {
   exams?: Exam[],
   sessions?: Session[],
   subscriptions?: Subscription[]
  };