import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

let firestore: ReturnType<typeof getFirestore>;
let storage: ReturnType<typeof getStorage>;
let database: ReturnType<typeof getDatabase>;
let analytics: ReturnType<typeof getAnalytics>;

export const useFirestore = () => {
  if (!firestore) {
    firestore = getFirestore();
  }
  return firestore;
};

export const useDatabase = () => {
  if (!database) {
    database = getDatabase();
  }
  return database;
};

export const useStorage = () => {
  if (!storage) {
    storage = getStorage();
  }
  return storage;
};

export const useAnalytics = () => {
  if (!analytics) {
    analytics = getAnalytics();
  }
  return analytics;
};
