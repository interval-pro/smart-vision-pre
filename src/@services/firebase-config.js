import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBob2VbG6w0emS2K8w5F5Sq8u6LJ2lCpjM",
  authDomain: "interval-monitoring.firebaseapp.com",
  projectId: "interval-monitoring",
  storageBucket: "interval-monitoring.appspot.com",
  messagingSenderId: "636242623784",
  appId: "1:636242623784:web:60950706bdd0244b94241d",
  measurementId: "G-08D6WE3R73"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//https://videos-3.earthcam.com/fecnetwork/AbbeyRoadHD1.flv/chunklist_w1708507714.m3u8