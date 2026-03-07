import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOytRdDt_TLDxFomorYa7DCmXKaqAifsM",
  authDomain: "chitra--kala.firebaseapp.com",
  projectId: "chitra--kala",
  storageBucket: "chitra--kala.firebasestorage.app",
  messagingSenderId: "1083290317464",
  appId: "1:1083290317464:web:033d1f6fc4d43d64a696ed",
  measurementId: "G-2YRNWKH423",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

if (typeof window !== "undefined") {
  isSupported()
    .then((ok) => ok && getAnalytics(app))
    .catch(() => {});
}
