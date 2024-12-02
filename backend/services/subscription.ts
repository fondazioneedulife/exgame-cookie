import DB from "./db";
import { Subscription, StudentGrade } from "../../api-types";
import UserModel from "user.ts";

const subscriptionSchema = new DB.Schema({
  student_id: {type: DB.Schema.Types.ObjectId, ref: "user", required: true},
  session_id: { type: String, required: true },
  grade: { type: Number, required: true },
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

const SubscriptionModel = DB.model<Subscription & Document>("subscriptions", subscriptionSchema);

//teacher
//get all subscriptions for a session
export const getSubscriptionsBySessionForTeacher = async (
  session_id: string,
) => {
  const subscriptions = await SubscriptionModel.find({ session_id }).populate('student_id', 'first_name last_name') 
  .exec();

  return subscriptions.map((subscription): StudentGrade => ({
    first_name: subscription.student_id.first_name,
    last_name: subscription.student_id.last_name,
    grade: subscription.grade,
  }));
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
