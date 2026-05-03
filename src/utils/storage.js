import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "healthflow_progress";

export async function saveProgress(data) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Storage save failed:", e);
  }
}

export async function loadProgress() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export async function clearProgress() {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch (e) {}
}
