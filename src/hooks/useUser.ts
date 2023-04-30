import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import {
  DocumentReference,
  DocumentSnapshot,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { UserModel, generateUser } from "../models/user";
import { FireCollections } from "../firebase/collections";

export function useUser(): {
  user?: UserModel;
  isloading: boolean;
} {
  const [auth] = useAuth();
  const [user, setUser] = useState<UserModel>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth?.uid && typeof auth.uid === "string" && auth.uid.length === 28) {
      const docRef = doc(
        firestore,
        `${FireCollections.users}/${auth?.uid}`
      ) as DocumentReference<UserModel>;

      const unListen = onSnapshot(
        docRef,
        (newData: DocumentSnapshot<UserModel>) => {
          if (newData.exists()) {
            setUser(newData.data());
            setLoading(false);
          } else {
            setDoc(docRef, generateUser(auth));
          }
        }
      );

      return () => {
        unListen();
      };
    } else {
      if (user) {
        setUser(undefined);
      }
    }
  }, [auth?.uid]);

  return {
    user,
    isloading: loading,
  };
}
