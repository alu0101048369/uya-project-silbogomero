import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export const app = {
  firebase,
  app: null,
  auth: null,
  firestore: null,
  storage: null,
};

export function init() {
  app.app = firebase.initializeApp({
    apiKey: 'AIzaSyDMXzD4LkV0oSv5VW-SD2ygBmBT28-AlHA',
    authDomain: 'asociacionsilbogomero.firebaseapp.com',
    projectId: 'asociacionsilbogomero',
    storageBucket: 'asociacionsilbogomero.appspot.com',
    messagingSenderId: '562836318905',
    appId: '1:562836318905:web:d285b2d6223a27a3c80968',
  });
  app.auth = app.app.auth();
  app.firestore = app.app.firestore();
  app.storage = app.app.storage();
}

export function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const uploadTask = app.storage.ref(`/${new Date().getTime()}`).put(file);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      null,
      (err) => reject(err),
      () => uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => resolve(downloadURL))
    );
  });
}
