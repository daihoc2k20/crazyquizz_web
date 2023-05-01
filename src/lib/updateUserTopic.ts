import { Timestamp, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { FireCollections } from "../firebase/collections";
import { firestore } from "../firebase";
import { UserTopicModel } from "../models/user";

export async function updateUserTopic(
  userId: string,
  topicId: string,
  newList: string[]
) {
  if (
    Array.isArray(newList) &&
    newList.length > 0 &&
    typeof topicId == "string" &&
    typeof userId == "string"
  ) {
    const userTopicRef = doc(
      firestore,
      FireCollections.userTopic(userId, topicId)
    );

    const userTopicDoc = await getDoc(userTopicRef);
    if (userTopicDoc.exists()) {
      const userTopicData = userTopicDoc.data() as UserTopicModel;
      let listQuestion = Array.isArray(userTopicData.questionCompleted)
        ? userTopicData.questionCompleted
        : [];
      listQuestion.push(...newList);
      listQuestion = listQuestion.filter(function (questionId, index, self) {
        return index === self.indexOf(questionId);
      });

      await updateDoc(userTopicRef, {
        questionCompleted: listQuestion,
        updatedAt: Timestamp.now(),
      });
    } else {
      const newData: UserTopicModel = {
        id: topicId,
        questionCompleted: newList,
        updatedAt: Timestamp.now(),
      };

      await setDoc(userTopicRef, newData);
    }
  }
}
