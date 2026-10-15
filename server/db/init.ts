import { config } from '../config.js';
import { openDatabase } from './database.js';

const db = openDatabase(config.databasePath);
console.log(JSON.stringify({ level: 'info', event: 'database_initialized', path: config.databasePath }));
db.close();
