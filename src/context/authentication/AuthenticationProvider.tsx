import { App } from "antd";
import type { User } from "firebase/auth";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { type FC, type PropsWithChildren, useEffect, useState } from "react";

import { auth } from "../../firebase";

import { AuthenticationContext } from "./AuthenticationContext";

export const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { message } = App.useApp();

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password).catch(() =>
      message.error("Wrong email or password")
    );

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
