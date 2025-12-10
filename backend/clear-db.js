const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'events.db');

// Verificar se o banco existe
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('✅ Banco de dados limpo com sucesso!');
  console.log('Execute "npm run init-db" para criar novos dados de exemplo.');
} else {
  console.log('⚠️  Banco de dados não encontrado.');
}