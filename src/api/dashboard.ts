import { collection, doc, onSnapshot, query } from "@firebase/firestore";
import moment from "moment";

export const getDailyReg = (db, callback) => {
  const dateToday = moment().format("YYYY-MM-DD");
  const q = query(doc(db, "user_registrations_per_day", dateToday));
  const unsub = onSnapshot(q, (snapshot) => {
    const data = snapshot.data()?.count || 0;
    if (callback) callback(data);

    return data;
  });

  return unsub;
};

export const getMonthlyReg = (db, callback) => {
  const monthToday = moment().format("YYYY-MM");
  const q = query(doc(db, "user_registrations_per_month", monthToday));
  const unsub = onSnapshot(q, (snapshot) => {
    const data = snapshot.data()?.count || 0;
    if (callback) callback(data);

    return data;
  });

  return unsub;
};

export const getTotalUsers = (db, callback) => {
  const q = query(doc(db, "users_count/counter"));
  const unsub = onSnapshot(q, (snapshot) => {
    const data = snapshot.data()?.count || 0;
    if (callback) callback(data);

    return data;
  });

  return unsub;
};
