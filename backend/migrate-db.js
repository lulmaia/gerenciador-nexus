const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'events.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Adicionar colunas start_date e end_date
  db.run(`ALTER TABLE events ADD COLUMN start_date TEXT`, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error('Erro ao adicionar start_date:', err);
    }
  });
  
  db.run(`ALTER TABLE events ADD COLUMN end_date TEXT`, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error('Erro ao adicionar end_date:', err);
    }
  });

  // Migrar dados existentes: copiar 'date' para 'start_date' e 'end_date'
  db.run(`UPDATE events SET start_date = date, end_date = date WHERE start_date IS NULL`, (err) => {
    if (err) {
      console.error('Erro na migração:', err);
    } else {
      console.log('Migração concluída com sucesso!');
    }
  });
});

db.close();