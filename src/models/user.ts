import { User } from "firebase/auth";
import { DocumentData, Timestamp } from "firebase/firestore";
import uuid from "../lib/uuid";

export interface UserModel extends DocumentData {
  id: string;
  email: string;
  name: string;
  nickname?: string;
  avatar: string | null;
  score?: number;
  gender?: "male" | "female";
  profile?: string;
  phoneNumber?: string;
  birthday?: Timestamp;
  role?: string;
  createdAt: Timestamp;
}

export interface HistoryModel {
  id: string;
  topicID: string;
  userID: string;
  questionIDs: string[];
  userAnswers: string[];
  score?: number;
  createdAt: Timestamp;
  endedAt: Timestamp;
}

export interface HistoryModelUpdate {
  userAnswers: string[];
  score?: number;
  endedAt: Timestamp;
}

export interface UserTopicModel {
  id: string;
  questionCompleted: string[];
  updatedAt: Timestamp;
}

export function generateUser(user: User): UserModel {
  return {
    id: user.uid,
    email: user.email!,
    name: user.displayName ?? user.email!,
    createdAt: Timestamp.now(),
    avatar: user.photoURL,
  };
}

export function createHistory(
  userId: string,
  topicId: string,
  questions: string[]
): HistoryModel {
  const now = Timestamp.now();
  const testTime = questions.length * 60;
  const endtime = new Timestamp(now.seconds + testTime, now.nanoseconds);

  return {
    id: uuid(),
    userID: userId,
    topicID: topicId,
    questionIDs: questions,
    userAnswers: [],
    endedAt: endtime,
    createdAt: now,
  };
}
