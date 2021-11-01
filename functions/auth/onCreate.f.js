import * as functions from "firebase-functions";
import admin from "firebase-admin";
import moment from "moment";

const db = admin.firestore();

export default functions.auth.user().onCreate(async (userRecord) => {
  const {
    email,
    uid,
    creationTime: created = moment().format(),
  } = userRecord || {};
  const creationTime = moment(created);
  const year = creationTime.format("YYYY");
  const month = creationTime.format("MM");
  const day = creationTime.format("DD");

  const user = await admin.auth().getUser(uid);
  const { providerData = [], displayName = "" } = user;

  // Set the provider
  const { providerId: id } = providerData[0] || {
    providerId: email ? "password" : "phone",
  };
  const providerId = id.replace(".com", "");

  //Increment Provider - email/google/twitter ...
  const providerTransaction = await db.runTransaction(async (t) => {
    if (providerId) {
      const ref = db.doc(`provider_count/${providerId}`);
      const doc = await t.get(ref);

      if (doc.exists) {
        const _count = doc.data().count || 0;
        t.update(ref, { count: _count + 1 });
      } else {
        t.set(ref, { count: 1 });
      }
    }
  });

  // ---------- Set analytics ----------
  // Day
  const dayTransaction = await db.runTransaction(async (t) => {
    if (year && month && day) {
      const ref = db.doc(`/user_registrations_per_day/${year}-${month}-${day}`);
      const doc = await t.get(ref);

      if (doc.exists) {
        const _count = doc.data().count || 0;
        t.update(ref, { count: _count + 1 });
      } else {
        t.set(ref, { count: 1 });
      }
    }
  });

  // Month
  const monthTransaction = await db.runTransaction(async (t) => {
    if (year && month) {
      const ref = db.doc(`/user_registrations_per_month/${year}-${month}`);
      const doc = await t.get(ref);

      if (doc.exists) {
        const _count = doc.data().count || 0;
        t.update(ref, { count: _count + 1 });
      } else {
        t.set(ref, { count: 1 });
      }
    }
  });

  // User
  const userTransaction = await db.runTransaction(async (t) => {
    const ref = db.doc("users_count/counter");
    const doc = await t.get(ref);

    // User counter
    if (doc.exists) {
      const _count = doc.data().count || 0;
      t.update(ref, { count: _count + 1 });
    } else {
      t.set(ref, { count: 1 });
    }
  });
  // ---------- Set analytics ----------

  // ---------- Contact Profile ----------
  const firstName = displayName.substr(0, displayName.indexOf(" "));
  const lastName = displayName.substr(displayName.indexOf(" ") + 1);

  const contactRef = await db.collection("contacts").doc();
  await contactRef.set({
    uid,
    email,
    created,
    firstName,
    lastName,
    providerId,
    id: contactRef.id,
    clientStatus: "free",
  });
  // ---------- Contact Profile ----------

  return;
});
