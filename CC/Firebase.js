require("dotenv").config();
const admin = require("firebase-admin");
const serviceAccount = require("./ServiceKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_DEV,
  });
}
const firestore = admin.firestore();
const storage = admin.storage();
const bucket = storage.bucket();

module.exports = {
  firestore,
  storage,
  bucket,
};
