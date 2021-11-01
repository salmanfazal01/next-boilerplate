import {
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";

export const getFirestoreDoc = (db, name, cid, callback) => {
  const q = query(doc(db, `${name}/${cid}`));
  const unsub = onSnapshot(q, (snapshot) => {
    const data = snapshot.data();
    if (callback) callback(data);

    return data;
  });

  return unsub;
};

export const editFirestoreDoc = (db, name, cid, data = {}, callback) => {
  const docRef = doc(db, name, cid);
  const payload = { ...data, updateTimestamp: serverTimestamp() };

  updateDoc(docRef, payload).then((res) => callback?.(res));
};
