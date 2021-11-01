import React, { createContext, useContext, useEffect, useState } from "react";
import { configureAuth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  confirmPasswordReset,
} from "firebase/auth";
import { useFirestore } from "src/hooks/firebase";
import { collection, getDocs, limit, query, where } from "@firebase/firestore";
import { NormalizeMulti } from "react-i18next";

const AuthContext = createContext({
  authLoading: null,
  profileLoading: null,
  userProfile: null,
  currentUser: null,
  signInWithGoogle: () => Promise,
  login: () => Promise,
  register: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
});

const auth = configureAuth();
const db = useFirestore();

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider(props: any) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState<Boolean>(true);
  const [profileLoading, setProfileLoading] = useState<Boolean>(true);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user ? user : null);
      setAuthLoading(false);
      setProfileLoading(!!user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentUser && !userProfile) {
      getContact()
        .then(setUserProfile)
        .then(() => setReload(reload + 1));
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && !userProfile?.id) {
      setTimeout(() => {
        getContact()
          .then(setUserProfile)
          .then(() => setReload(reload + 1));
      }, [2000]);
    } else if (userProfile?.id) {
      setProfileLoading(false);
    }
  }, [reload]);

  useEffect(() => {
    if (profileLoading && !authLoading && currentUser?.uid) {
      setReload(reload + 1);
    }
  }, [profileLoading, authLoading]);

  async function getContact() {
    const q = query(
      collection(db, "contacts"),
      where("uid", "==", currentUser?.uid),
      limit(1),
    );

    const snap = await getDocs(q);

    return snap?.docs?.[0]?.data?.();
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function forgotPassword(email: string) {
    return sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3000/login`,
    });
  }

  function resetPassword(oobCode: string, newPassword: string) {
    return confirmPasswordReset(auth, oobCode, newPassword);
  }

  function logout() {
    return signOut(auth);
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  const value = {
    authLoading,
    profileLoading,
    userProfile,
    currentUser,
    signInWithGoogle,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
