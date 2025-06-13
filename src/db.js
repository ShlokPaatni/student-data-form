// src/db.js
import { openDB } from 'idb';

const DB_NAME = 'StudentAdmissionDB';
const STORE_NAME = 'submissions';

export const initDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    },
  });
};

export const addFormData = async (data) => {
  const db = await initDB();
  await db.add(STORE_NAME, data);
};

export const getAllFormData = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};
