const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'events.db');
const db = new sqlite3.Database(dbPath);

// Criar tabela e inserir dados de exemplo
db.serialize(() => {
  // Criar tabela
  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      color TEXT NOT NULL DEFAULT '#3174ad',
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Inserir dados de exemplo
  const stmt = db.prepare(`
    INSERT INTO events (title, date, color, description) VALUES (?, ?, ?, ?)
  `);

  stmt.run('Reunião de Equipe', '2024-12-15', '#ff6b6b', 'Reunião mensal da equipe de desenvolvimento');
  stmt.run('Apresentação do Projeto', '2024-12-20', '#4ecdc4', 'Apresentação final do projeto para o cliente');
  stmt.run('Workshop React', '2024-12-25', '#45b7d1', 'Workshop sobre React e suas melhores práticas');
  stmt.run('Festa de Ano Novo', '2024-12-31', '#e74c3c', 'Celebração de fim de ano da empresa');
  stmt.run('Planejamento 2025', '2025-01-05', '#9b59b6', 'Reunião de planejamento estratégico');
  
  stmt.finalize();
});

db.close((err) => {
  if (err) {
    console.error('Erro ao fechar banco:', err);
  } else {
    console.log('Banco SQLite inicializado com sucesso!');
  }
});