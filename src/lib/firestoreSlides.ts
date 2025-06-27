import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove, collection, getDocs } from "firebase/firestore";
import { firebaseApp } from "./firebaseConfig";

const db = getFirestore(firebaseApp);

// Guarda (o actualiza) todas las diapositivas de una sección
export async function saveSlidesForSection(sectionId: string, slides: string[]) {
  await setDoc(doc(db, "slides", sectionId), { slides });
}

// Obtiene todas las diapositivas de una sección
export async function getSlidesForSection(sectionId: string): Promise<string[]> {
  const snap = await getDoc(doc(db, "slides", sectionId));
  if (snap.exists()) {
    return snap.data().slides || [];
  }
  return [];
}

// Obtiene todas las diapositivas de todas las secciones
export async function getAllSlides(): Promise<Record<string, string[]>> {
  const slidesCol = collection(db, "slides");
  const snap = await getDocs(slidesCol);
  const result: Record<string, string[]> = {};
  snap.forEach(doc => {
    result[doc.id] = doc.data().slides || [];
  });
  return result;
}
