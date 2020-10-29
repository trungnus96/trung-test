const admin = require("firebase-admin");

const service_account = require("../constants/firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(service_account),
});

const db = admin.firestore();

exports.db = db;
