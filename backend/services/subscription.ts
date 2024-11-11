import DB from "./db";
import { Subscription } from "../../api-types";
import { getmockLoggedUser, isTeacher, isStudent } from "../mock/mockLoggedUser";

const subscriptionSchema = new DB.Schema({
  student_id: { type: String, required: true },
  session_id: { type: String, required: true },
  questions: [
    {
      question_id: { type: String, required: true },
      responses: [
        {
          answer_id: { type: String, required: true },
        },
      ],
    },
  ],
});

const SubscriptionModel = DB.model("subscription", subscriptionSchema);

//teacher
//get all subscriptions for a session
export const getSubscriptionsBySessionForTeacher = async (
  session_id: string,
) => {
    if(isTeacher()) {
        return SubscriptionModel.findById({ session_id });      
    }
};

//student
//get own subscriptions for an exam
export const getSubscriptionsBySessionForStudent = async (
    student_id: string,
    session_id: string,
) => {
  return SubscriptionModel.findById({ session_id })
    .where({ student_id });
};

export const getSubscriptionById = async (subscriptionId: string, ) => {
  return SubscriptionModel.find({ subscriptionId });
};

export const postSubscription = async (subscription: Subscription) => {
  const subscriptionDocument = new SubscriptionModel(subscription);

  return subscriptionDocument.save();
};
