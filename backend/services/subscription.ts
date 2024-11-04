import DB from "./db";
import { Subscription } from "../../api-types";

const subscriptionSchema = new DB.Schema({
});

const SubscriptionModel = DB.model("subscription", subscriptionSchema);

export const getSubscriptionByExamAndClass = async (examId, studentClass: string) => {
    return SubscriptionModel.find({examId, studentClass});
}

export const getSubscriptionById = async (subscriptionId: string) => {
    return SubscriptionModel.find({subscriptionId});
}

export const postSubscription = async (subscription: Subscription) => {
   const subscriptionDocument = new SubscriptionModel(subscription);

   return subscriptionDocument.save();
}
