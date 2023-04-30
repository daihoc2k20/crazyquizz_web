import { useEffect, useState } from "react";
import { HistoryModel, HistoryModelUpdate } from "../models/user";
import { creatTest } from "../lib/createTest";
import {
  CollectionReference,
  Timestamp,
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { FireCollections } from "../firebase/collections";

type UseTest = {
  test: HistoryModel | undefined;
  create: (topicId: string, limit: number) => Promise<void>;
  update: (history: Partial<HistoryModelUpdate>) => Promise<void>;
};

export function useTest(userId?: string): UseTest {
  const [test, setTest] = useState<HistoryModel>();

  useEffect(() => {
    if (userId) {
      const topicRef = collection(
        firestore,
        FireCollections.userHistories(userId)
      ) as CollectionReference<HistoryModel>;

      const topicsQuery = query(
        topicRef,
        where("endedAt", ">=", Timestamp.now()),
        limit(1)
      );

      const unListen = onSnapshot(topicsQuery, (topicsCollection) => {
        if (topicsCollection.empty) {
          setTest(undefined);
        } else {
          setTest(topicsCollection.docs[0].data());
        }
      });

      return () => {
        unListen();
      };
    }
  }, [userId]);

  async function create(topicId: string, limit: number) {
    if (!test && userId) {
      await creatTest(userId, topicId, limit);
    }
  }

  async function update(history: Partial<HistoryModelUpdate>) {
    if (test && userId) {
      const topicRef = doc(
        firestore,
        FireCollections.userHistory(userId, test.id)
      );
      const topicDoc = await getDoc(topicRef);
      if (topicDoc.exists() && history) {
        await updateDoc(topicRef, history);
      }
    }
  }

  return {
    test,
    create,
    update,
  };
}
