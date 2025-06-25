// src/db.js
import { openDB } from 'idb';

const DB_NAME = 'StudentAdmissionDB';
const DB_VERSION = 1;
const STORE_NAME = 'submissions';

let dbPromise;

const initDB = () => {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
      },
    });
  }
  return dbPromise;
};

export const addFormData = async (data) => {
  const db = await initDB();
  return db.add(STORE_NAME, data);
};

export const getAllFormData = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const clearAllFormData = async () => {
  const db = await initDB();
  return db.clear(STORE_NAME);
};

export const deleteFormDataById = async (id) => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
};
