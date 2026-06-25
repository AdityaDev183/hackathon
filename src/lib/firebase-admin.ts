import { initializeApp, getApps, cert, ServiceAccount, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount: ServiceAccount | null = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
} : null;

function getAdminApp() {
  if (getApps().length === 0) {
    if (!serviceAccount) return null;
    try {
        return initializeApp({
            credential: cert(serviceAccount),
        });
    } catch (e) {
        return null;
    }
  }
  return getApp();
}

const app = getAdminApp();

export const adminAuth = app ? getAuth(app) : null as any;
export const adminDb = app ? getFirestore(app) : null as any;
