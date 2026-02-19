import type { Agenda } from "../type";

const DB_NAME = 'easy-calendar';
const DB_VERSION = 1;
const STORE_NAME = 'agenda';

/**
 * Initialize the database and return the database object.
 * @returns {Promise<IDBDatabase>} DB object
 */
const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = () => {
            console.error('Error opening database');
            reject(request.error);
        };
        
        request.onsuccess = () => {
            console.log('Database opened successfully');
            resolve(request.result);
        };
        
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                console.log('Object store created');
            }
        };
    });
};

/**
 * Add an agenda to the database.
 * @param {Agenda} agenda 
 */
export const addAgenda = async (agenda: Agenda): Promise<void> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add(agenda);
        
        request.onsuccess = () => {
            console.log('Agenda added successfully');
            resolve();
        };
        
        request.onerror = () => {
            console.error('Error adding agenda');
            reject(request.error);
        };
        
        transaction.oncomplete = () => {
            db.close();
        };
    });
};

/**
 * Update an agenda in the database.
 * @param {Agenda} agenda 
 */
export const updateAgenda = async (agenda: Agenda): Promise<void> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(agenda);
        
        request.onsuccess = () => {
            console.log('Agenda updated successfully');
            resolve();
        };
        
        request.onerror = () => {
            console.error('Error updating agenda');
            reject(request.error);
        };
        
        transaction.oncomplete = () => {
            db.close();
        };
    });
};

/**
 * Delete an agenda from the database.
 * @param {string} id 
 */
export const deleteAgenda = async (id: string): Promise<void> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);
        
        request.onsuccess = () => {
            console.log('Agenda deleted successfully');
            resolve();
        };
        
        request.onerror = () => {
            console.error('Error deleting agenda');
            reject(request.error);
        };
        
        transaction.oncomplete = () => {
            db.close();
        };
    });
};

/**
 * Get all agendas from the database.
 * @returns {Promise<Agenda[]>} List of agendas
 */
export const getAllAgendas = async (): Promise<Agenda[]> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();
        
        request.onsuccess = () => {
            console.log('Agendas retrieved successfully');
            resolve(request.result);
        };
        
        request.onerror = () => {
            console.error('Error retrieving agendas');
            reject(request.error);
        };
        
        transaction.oncomplete = () => {
            db.close();
        };
    });
};

/**
 * Get an agenda by title (fuzzy search)
 * @param {string} title Title to search for
 * @returns {Promise<Agenda[]>} List of matching agendas
 */
export const getAgendaByTitle = async (title: string): Promise<Agenda[]> => {
    const allAgendas = await getAllAgendas();
    const searchTerm = title.toLowerCase();
    return allAgendas.filter(agenda => 
        agenda.title.toLowerCase().includes(searchTerm)
    );
};

/**
 * Get agendas by date range
 * @param {string} startDate Start date (ISO string)
 * @param {string} endDate End date (ISO string)
 * @returns {Promise<Agenda[]>} List of agendas in the date range
 */
export const getAgendasByDateRange = async (startDate: string, endDate: string): Promise<Agenda[]> => {
    const allAgendas = await getAllAgendas();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return allAgendas.filter(agenda => {
        const agendaDate = new Date(agenda.start);
        return agendaDate >= start && agendaDate <= end;
    });
};

/**
 * Get an agenda by ID from the database.
 * @param {string} id 
 * @returns {Promise<Agenda | undefined>} Agenda
 */
export const getAgendaById = async (id: string): Promise<Agenda | undefined> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);
        
        request.onsuccess = () => {
            console.log('Agenda retrieved successfully');
            resolve(request.result);
        };
        
        request.onerror = () => {
            console.error('Error retrieving agenda');
            reject(request.error);
        };
        
        transaction.oncomplete = () => {
            db.close();
        };
    });
};

/**
 * Make an agenda ID from the start date and a random suffix.
 * @param {string} start 
 * @returns {string} Agenda ID
 */
export const makeAgendaId = (start: string) => {
    let id: string = '';
    const len = start.length;
    for (let i = 0; i < len; i++) if (start[i]! >= '0' && start[i]! <= '9') id += start[i];
    return id + '_' + Math.random().toString();
}