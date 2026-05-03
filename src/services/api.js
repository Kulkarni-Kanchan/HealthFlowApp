import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function postProgress(data) {
  try {
    const { userId, answers, currentStepIndex } = data;
    if (!userId) return;

    await setDoc(doc(db, "progress", userId), {
      userId,
      answers,
      currentStepIndex,
      updatedAt: new Date().toISOString(),
    });

    return { success: true };
  } catch (e) {
    console.warn("postProgress error:", e);
  }
}

export async function getProgress(userId) {
  try {
    if (!userId) return null;
    const snap = await getDoc(doc(db, "progress", userId));
    if (!snap.exists()) return null;
    return snap.data();
  } catch (e) {
    console.warn("getProgress error:", e);
    return null;
  }
}
