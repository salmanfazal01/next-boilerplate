import React, { useEffect } from "react";
import { useFirestore } from "src/hooks/firebase";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

const Test = () => {
  const db = useFirestore();

  useEffect(() => {
    const collectionRef = collection(db, "contacts");
    const q = query(collectionRef, orderBy("creationTime", "desc"));

    const unsub = onSnapshot(q, (snapshot) =>
      console.log(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
    );

    return unsub;
  }, []);

  return <div>hi</div>;
};

export default Test;
