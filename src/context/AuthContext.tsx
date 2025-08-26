"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";

interface AuthContextType {
  user: User | null;
  role: "seller" | "buyer" | null;
  loading: boolean;
  setRole: (role: "seller" | "buyer") => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRoleState] = useState<"seller" | "buyer" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setRoleState(snap.data().role);
        }
      } else {
        setRoleState(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const setRole = async (role: "seller" | "buyer") => {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    await setDoc(ref, { email: user.email, role }, { merge: true });
    setRoleState(role);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
