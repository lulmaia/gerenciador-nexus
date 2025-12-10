const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'events.db');
const db = new sqlite3.Database(dbPath);

console.log('Iniciando migração para adicionar campos de localização...');

db.serialize(() => {
  // Adicionar campos de cidade e estado
  db.run(`ALTER TABLE events ADD COLUMN city TEXT`, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error('Erro ao adicionar coluna city:', err);
    } else {
      console.log('✅ Campo city adicionado com sucesso');
    }
  });

  db.run(`ALTER TABLE events ADD COLUMN state TEXT`, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error('Erro ao adicionar coluna state:', err);
    } else {
      console.log('✅ Campo state adicionado com sucesso');
    }
  });

  // Atualizar eventos existentes com dados de exemplo
  db.run(`UPDATE events SET city = 'São Paulo', state = 'SP' WHERE city IS NULL AND title LIKE '%Reunião%'`);
  db.run(`UPDATE events SET city = 'Rio de Janeiro', state = 'RJ' WHERE city IS NULL AND title LIKE '%Apresentação%'`);
  db.run(`UPDATE events SET city = 'Belo Horizonte', state = 'MG' WHERE city IS NULL AND title LIKE '%Workshop%'`);
  db.run(`UPDATE events SET city = 'Florianópolis', state = 'SC' WHERE city IS NULL AND title LIKE '%Drop%'`);
  db.run(`UPDATE events SET city = 'Brasília', state = 'DF' WHERE city IS NULL AND title LIKE '%Planejamento%'`);
});

db.close((err) => {
  if (err) {
    console.error('Erro ao fechar banco:', err);
  } else {
    console.log('🎉 Migração concluída com sucesso!');
  }
});