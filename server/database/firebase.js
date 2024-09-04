import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './chat-react-8a82d-firebase-adminsdk-fmx4k-5abe3751f6.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'chat-react-8a82d.appspot.com' // Solo el nombre del bucket
});

export const db = getFirestore();
export const bucket = admin.storage().bucket();

;
