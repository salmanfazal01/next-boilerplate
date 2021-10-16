const loadFunctions = require("firebase-function-tools");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const config = functions.config().firebase;

try {
  if (!admin.apps.length) {
    admin.initializeApp(config);
  }
} catch (e) {
  console.log(e);
}

loadFunctions(__dirname, exports);
