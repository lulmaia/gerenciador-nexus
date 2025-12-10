const db = require('./config/database');

console.log('🎌 Criando tabela de feriados...');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS holidays (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      name TEXT NOT NULL,
      type TEXT,
      year INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(date)
    )
  `, (err) => {
    if (err) {
      console.error('❌ Erro ao criar tabela holidays:', err.message);
    } else {
      console.log('✅ Tabela holidays criada com sucesso!');
    }
    db.close();
  });
});