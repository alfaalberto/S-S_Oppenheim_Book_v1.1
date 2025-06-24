// This file should only be used in client components

const DB_NAME = 'signals-and-systems-db';
const STORE_NAME = 'slides';
const DB_VERSION = 1;

// Now stores an array of HTML strings for each section
interface SlideRecord {
  id: string;
  slides: string[]; 
}

let db: IDBDatabase;

function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (db) {
      return resolve(db);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('IndexedDB error:', request.error);
      reject(new Error('Failed to open IndexedDB.'));
    };

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const dbInstance = (event.target as IDBOpenDBRequest).result;
      if (!dbInstance.objectStoreNames.contains(STORE_NAME)) {
        dbInstance.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

// Saves the entire array of slides for a given section ID
export async function saveSlidesForSection(id: string, slides: string[]): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({ id, slides });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Gets all slides from the DB, returns a record mapping section ID to slide arrays
export async function getAllSlides(): Promise<Record<string, string[]>> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const slidesData: Record<string, string[]> = {};
      request.result.forEach((record: SlideRecord) => {
        slidesData[record.id] = record.slides;
      });
      resolve(slidesData);
    };
    request.onerror = () => reject(request.error);
  });
}
