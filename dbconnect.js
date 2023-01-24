const Database = require('better-sqlite3');
const db = new Database('./db/tfh_framedata.db', { verbose: console.log, fileMustExist: true });

module.exports = db;