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
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      color TEXT NOT NULL DEFAULT '#3174ad',
      description TEXT,
      city TEXT,
      state TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Inserir dados de exemplo
  const stmt = db.prepare(`
    INSERT INTO events (title, date, start_date, end_date, color, description, city, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run('Reunião de Equipe', '2024-12-15', '2024-12-15', '2024-12-15', '#ff6b6b', 'Reunião mensal da equipe de desenvolvimento', 'São Paulo', 'SP');
  stmt.run('Apresentação do Projeto', '2024-12-20', '2024-12-20', '2024-12-20', '#4ecdc4', 'Apresentação final do projeto para o cliente', 'Rio de Janeiro', 'RJ');
  stmt.run('Workshop React', '2024-12-25', '2024-12-25', '2024-12-25', '#45b7d1', 'Workshop sobre React e suas melhores práticas', 'Belo Horizonte', 'MG');
  stmt.run('Drop Open Air', '2025-01-01', '2025-01-01', '2025-01-02', '#e74c3c', 'Festival de música eletrônica de 2 dias', 'Florianópolis', 'SC');
  stmt.run('Planejamento 2025', '2025-01-05', '2025-01-05', '2025-01-07', '#9b59b6', 'Reunião de planejamento estratégico de 3 dias', 'Brasília', 'DF');
  
  stmt.finalize();
});

db.close((err) => {
  if (err) {
    console.error('Erro ao fechar banco:', err);
  } else {
    console.log('Banco SQLite inicializado com sucesso!');
  }
});