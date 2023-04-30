import { useEffect, useState } from "react";
import {
  CollectionReference,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { FireCollections } from "../firebase/collections";

export function useTopics(userId?: string) {
  const [topics, setTopics] = useState<TopicModel[]>([]);

  useEffect(() => {
    if (typeof userId === "string" && userId.length === 28) {
      const collectionRef = collection(
        firestore,
        FireCollections.topics
      ) as CollectionReference<TopicModel>;

      const q = query(collectionRef, orderBy("name"));

      const unListen = onSnapshot(q, (newData) => {
        setTopics(newData.docs.map((doc) => doc.data()));
      });

      return () => {
        unListen();
      };
    } else {
      if (topics.length != 0) {
        setTopics([]);
      }
    }
  }, [userId]);

  return [topics];
}
