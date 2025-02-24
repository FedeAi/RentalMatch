'use client';

import { initializeApp, getApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBVppZFgWuzXg92Ik-5293bKzL-ry_O8yc",
  authDomain: "rentalmatch-46ef9.firebaseapp.com",
  projectId: "rentalmatch-46ef9",
  storageBucket: "rentalmatch-46ef9.firebasestorage.app",
  messagingSenderId: "960594512954",
  appId: "1:960594512954:web:48fa8d720f664da21d7903",
  measurementId: "G-RE0PYGEZB4"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export { app };