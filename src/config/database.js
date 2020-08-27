const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db')

const USERS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        mensagem TEXT NOT NULL
    )
`;

const RESERVATION_SCHEMA = `
    CREATE TABLE IF NOT EXISTS reservation (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        tipo TEXT NOT NULL,
        data_chegada DATE NOT NULL,
        data_saida TEXT NOT NULL,
        valor TEXT NOT NULL
    )
`;

db.serialize(() => {
    db.run(USERS_SCHEMA);
    db.run(RESERVATION_SCHEMA);
});

process.on('SIGINT', () => {
    db.close( () => {
        process.exit(0);
    })
})

module.exports = db;

