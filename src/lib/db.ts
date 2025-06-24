// This file should only be used in client components
import type { IndexItem } from './index-data';

const DB_NAME = 'signals-and-systems-db';
const STORE_NAME = 'slides';
const DB_VERSION = 1;

interface SlideRecord {
  id: string;
  html: string;
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

export async function saveSlide(id: string, html: string): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({ id, html });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getSlide(id: string): Promise<string | null> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => {
      resolve(request.result ? request.result.html : null);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function getAllSlides(): Promise<Record<string, string>> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const slides: Record<string, string> = {};
      request.result.forEach((record: SlideRecord) => {
        slides[record.id] = record.html;
      });
      resolve(slides);
    };
    request.onerror = () => reject(request.error);
  });
}
