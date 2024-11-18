import DB from "./db";
import { Session } from "../../api-types";
import {
  getmockLoggedUser,
} from "../mock/mockLoggedUser";

const sessionSchema = new DB.Schema({
  exam_id: { type: String, required: true },
  student_class: { type: String, required: true },
  start_date: { type: Date, required: true },
  start_time: { type: Date, required: true },
});

const sessionModel = DB.model("session", sessionSchema);

export const getSessions = async (examId: string) => {
  return sessionModel.find({ exam_id: examId });
};