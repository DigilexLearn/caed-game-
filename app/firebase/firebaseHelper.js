// app/firebase/firebaseHelper.js
import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Game progress save karne ka helper
export const saveGameProgress = async ({ level, moves, lives, status }) => {
  try {
    await addDoc(collection(db, "memoryGameProgress"), {
      level,
      moves,
      lives,
      status, // "win" | "lose" | "restart"
      timestamp: serverTimestamp(),
    });
    console.log("Progress saved ✅");
  } catch (e) {
    console.log("Error saving progress:", e);
  }
};
