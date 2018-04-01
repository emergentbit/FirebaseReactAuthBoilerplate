import * as firebase from 'firebase';

const config = {
  apiKey: '<PUT YOUR API KEY HERE>',
  authDomain: '<PUT YOUR AUTH DOMAIN HERE>',
  databaseURL: '<PUT YOUR DB URL HERE',
  projectId: '<PUT YOUR PROJECT ID HERE>',
  storageBucket: '<PUT YOUR STORAGE BUCKET HERE>',
  messagingSenderId: '<PUT YOUR MESSAGE SENDER ID HERE>'
};
firebase.initializeApp(config);

export default firebase;