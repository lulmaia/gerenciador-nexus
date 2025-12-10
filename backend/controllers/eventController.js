const db = require('../config/database');

const eventController = {
  // GET /events - Listar todos os eventos
  getAllEvents: (req, res) => {
    db.all('SELECT * FROM events ORDER BY date ASC', [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar eventos' });
      }
      res.json(rows);
    });
  },

  // POST /events - Criar novo evento
  createEvent: (req, res) => {
    const { title, date, color, description } = req.body;
    
    if (!title || !date) {
      return res.status(400).json({ error: 'Título e data são obrigatórios' });
    }

    const sql = 'INSERT INTO events (title, date, color, description) VALUES (?, ?, ?, ?)';
    const params = [title, date, color || '#3174ad', description || ''];

    db.run(sql, params, function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao criar evento' });
      }

      db.get('SELECT * FROM events WHERE id = ?', [this.lastID], (err, row) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao buscar evento criado' });
        }
        res.status(201).json(row);
      });
    });
  },

  // PUT /events/:id - Atualizar evento
  updateEvent: (req, res) => {
    const { id } = req.params;
    const { title, date, color, description } = req.body;

    if (!title || !date) {
      return res.status(400).json({ error: 'Título e data são obrigatórios' });
    }

    const sql = 'UPDATE events SET title = ?, date = ?, color = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    const params = [title, date, color, description, id];

    db.run(sql, params, function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar evento' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      db.get('SELECT * FROM events WHERE id = ?', [id], (err, row) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao buscar evento atualizado' });
        }
        res.json(row);
      });
    });
  },

  // DELETE /events/:id - Remover evento
  deleteEvent: (req, res) => {
    const { id } = req.params;
    
    db.run('DELETE FROM events WHERE id = ?', [id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao remover evento' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      res.json({ message: 'Evento removido com sucesso' });
    });
  }
};

module.exports = eventController;