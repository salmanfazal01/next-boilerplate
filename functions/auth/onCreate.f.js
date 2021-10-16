import * as functions from "firebase-functions";
import admin from "firebase-admin";
import moment from "moment";

export default functions.auth.user().onCreate(async (userRecord) => {
  const { email, uid, creationTime: created } = userRecord || {};
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
  //   if (providerId) {
  //     await admin
  //       .firestore()
  //       .doc(`/provider_count/${providerId}`)
  //       .transaction((current) => (current || 0) + 1);
  //   }

  //   const transactions = admin.firestore().runTransaction(async (t) => {
  //     if (providerId) {
  //       const providerRef = admin
  //         .firestore()
  //         .collection("provider_count")
  //         .doc(providerId);

  //       await t.get(providerRef).then((doc) => {
  //         const count = (doc.data() || 0) + 1;
  //         t.update(providerRef, { count });
  //       });
  //     }
  //   });

  //   // Set analytics
  //   // Day
  //   await admin
  //     .firestore()
  //     .doc(`/user_registrations_per_day/${year}/${month}/${day}`)
  //     .transaction((current) => (current || 0) + 1);

  //   // Month
  //   await admin
  //     .firestore()
  //     .doc(`/user_registrations_per_month/${year}/${month}`)
  //     .transaction((current) => (current || 0) + 1);

  //   // Counter
  //   await admin
  //     .firestore()
  //     .doc(`/users_count`)
  //     .transaction((current) => (current || 0) + 1);

  // Create their contact
  const firstName = displayName.substr(0, displayName.indexOf(" "));
  const lastName = displayName.substr(displayName.indexOf(" ") + 1);

  const contactRef = await admin.firestore().collection("contacts").doc();
  await contactRef.set({
    uid,
    email,
    created,
    firstName,
    lastName,
    id: contactRef.id,
  });

  return;
});
