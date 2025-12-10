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
    const { title, start_date, end_date, date, color, description, city, state } = req.body;
    
    // Aceitar tanto formato antigo (date) quanto novo (start_date)
    const startDate = start_date || date;
    if (!title || !startDate) {
      return res.status(400).json({ error: 'Título e data são obrigatórios' });
    }

    const finalEndDate = end_date || startDate;
    const sql = 'INSERT INTO events (title, date, start_date, end_date, color, description, city, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [title, startDate, startDate, finalEndDate, color || '#3174ad', description || '', city || '', state || ''];

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
    const { title, start_date, end_date, date, color, description, city, state } = req.body;

    // Aceitar tanto formato antigo (date) quanto novo (start_date)
    const startDate = start_date || date;
    if (!title || !startDate) {
      return res.status(400).json({ error: 'Título e data são obrigatórios' });
    }

    const finalEndDate = end_date || startDate;
    const sql = 'UPDATE events SET title = ?, date = ?, start_date = ?, end_date = ?, color = ?, description = ?, city = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    const params = [title, startDate, startDate, finalEndDate, color, description, city || '', state || '', id];

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