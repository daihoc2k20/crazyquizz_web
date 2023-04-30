import { useEffect, useState } from "react";
import { fireauth } from "../firebase";
import { User } from "firebase/auth";

export function useAuth(): [User | null, boolean] {
  const [auth, setAuth] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unlisten = fireauth.onAuthStateChanged((newAuth) => {
      setAuth((prev) => {
        if (newAuth != prev) {
          return newAuth;
        }

        return prev;
      });
      setLoading(false);
    });

    return () => {
      unlisten();
    };
  }, []);

  return [auth, loading];
}
