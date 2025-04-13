// firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('./config/headshot-hub-firebase-adminsdk-fbsvc-7951d38daa.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // If you are using Firebase Cloud Firestore, you can also specify a database URL:
  // databaseURL: 'https://your-project.firebaseio.com',
});

module.exports = admin;
