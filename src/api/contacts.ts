import {
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";

export const getAllContacts = (db, callback) => {
  const q = query(collection(db, "contacts"));
  const unsub = onSnapshot(q, (snap) => {
    let arr = [];
    snap.docs.map((doc) => arr.push(doc.data()));

    if (callback) callback(arr);

    return arr;
  });

  return unsub;
};

export const getContact = (db, cid, callback) => {
  const q = query(doc(db, `contacts/${cid}`));
  const unsub = onSnapshot(q, (snapshot) => {
    const data = snapshot.data();
    if (callback) callback(data);

    return data;
  });

  return unsub;
};

export const editContact = (db, cid, data = {}, callback) => {
  const docRef = doc(db, "contacts", cid);
  const payload = { ...data, updateTimestamp: serverTimestamp() };

  updateDoc(docRef, payload).then((res) => callback?.(res));
};
