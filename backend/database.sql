-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS events_db;
USE events_db;

-- Criar tabela de eventos
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  color VARCHAR(7) NOT NULL DEFAULT '#3174ad',
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserir alguns eventos de exemplo
INSERT INTO events (title, date, color, description) VALUES
('Reunião de Equipe', '2024-01-15', '#ff6b6b', 'Reunião mensal da equipe de desenvolvimento'),
('Apresentação do Projeto', '2024-01-20', '#4ecdc4', 'Apresentação final do projeto para o cliente'),
('Workshop React', '2024-01-25', '#45b7d1', 'Workshop sobre React e suas melhores práticas');