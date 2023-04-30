import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import {
  CollectionReference,
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { FireCollections } from "../firebase/collections";

export function useQuestions(
  topicId: string,
  questionIDs: string[]
): {
  questions: QuestionModel[];
  isloading: boolean;
} {
  const [auth] = useAuth();
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(questionIDs) && questionIDs.length > 0) {
      const collectionRef = collection(
        firestore,
        FireCollections.topicQuestions(topicId)
      ) as CollectionReference<QuestionModel>;

      const q = query(
        collectionRef,
        where("id", "in", questionIDs),
        limit(questionIDs.length)
      );

      const unListen = onSnapshot(q, (newData) => {
        setQuestions(newData.docs.map((doc) => doc.data()));
        setLoading(false);
      });

      return () => {
        unListen();
      };
    } else {
      if (questions.length != 0) {
        setQuestions([]);
      }
    }
  }, [auth?.uid]);

  return {
    questions,
    isloading: loading,
  };
}
