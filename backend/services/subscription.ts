import DB from "./db";
import { Subscription } from "../../api-types";

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

const SubscriptionModel = DB.model("subscriptions", subscriptionSchema);

//teacher
//get all subscriptions for a session
export const getSubscriptionsBySessionForTeacher = async (
  session_id: string,
) => {
  return SubscriptionModel.find({ session_id });
};

//student
//get own subscriptions for a session
export const getSubscriptionBySessionForStudent = async (
  session_id: string,
  ctx
) => {
  const user = await ctx.session.user;

  return SubscriptionModel.find({ session_id }).where({
    student_id: user._id,
  });
};

// export const getSubscriptionById = async (subscriptionId: string) => {
//   return SubscriptionModel.find({ subscriptionId });
// };

export const postSubscription = async (subscription: Subscription) => {
  const subscriptionDocument = new SubscriptionModel(subscription);

  return subscriptionDocument.save();
};
