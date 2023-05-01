import {
  doc,
  getDoc,
  collection,
  query,
  where,
  limit as queryLimit,
  getDocs,
  CollectionReference,
  setDoc,
} from "firebase/firestore";
import { FireCollections } from "../firebase/collections";
import { firestore } from "../firebase";
import { UserTopicModel, createHistory } from "../models/user";
import { randomList } from "./randomList";

export async function creatTest(
  userId: string,
  topicId: string,
  limit: number
) {
  const userDocRef = doc(firestore, FireCollections.user(userId));
  const userExists = (await getDoc(userDocRef)).exists();

  if (userExists) {
    console.log(topicId);
    const topicRef = doc(firestore, FireCollections.topic(topicId));
    const topicExist = (await getDoc(topicRef)).exists();

    if (topicExist) {
      const userTopic = (
        await getDoc(doc(firestore, FireCollections.userTopic(userId, topicId)))
      ).data() as UserTopicModel;

      const excludeQuestions = userTopic?.questionCompleted ?? [];

      const questionsCollection = collection(
        firestore,
        FireCollections.topicQuestions(topicId)
      ) as CollectionReference<QuestionModel>;

      const getQuestionsQuery = query(
        questionsCollection,
        ...(excludeQuestions.length > 0
          ? [where("id", "not-in", excludeQuestions)]
          : [])
      );

      const allQuestions = (await getDocs(getQuestionsQuery)).docs.map(
        (item) => item.id
      );

      const questions = randomList(limit, allQuestions.length).map(
        (index) => allQuestions[index]
      );

      const newTest = createHistory(userId, topicId, questions);

      await setDoc(
        doc(firestore, FireCollections.userHistory(userId, newTest.id)),
        newTest
      );
    } else {
      throw Error("topic not found");
    }
  } else {
    throw Error("user not found");
  }
}
