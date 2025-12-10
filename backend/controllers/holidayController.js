const db = require('../config/database');
const https = require('https');

const holidayController = {
  // GET /holidays/:year - Buscar feriados do ano
  getHolidays: async (req, res) => {
    const { year } = req.params;
    const currentYear = new Date().getFullYear();
    
    // Validar ano
    if (!year || year < 2020 || year > currentYear + 2) {
      return res.status(400).json({ error: 'Ano inválido' });
    }

    try {
      // Verificar se já temos os feriados no cache local
      db.all('SELECT * FROM holidays WHERE year = ? ORDER BY date ASC', [year], async (err, rows) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao buscar feriados no banco' });
        }

        // Se encontrou no cache, retornar
        if (rows && rows.length > 0) {
          return res.json(rows);
        }

        // Se não encontrou, buscar na API
        try {
          const holidays = await fetchHolidaysFromAPI(year);
          
          // Salvar no banco para cache
          const stmt = db.prepare('INSERT OR IGNORE INTO holidays (date, name, type, year) VALUES (?, ?, ?, ?)');
          
          holidays.forEach(holiday => {
            stmt.run([holiday.date, holiday.name, holiday.type || 'national', year]);
          });
          
          stmt.finalize();
          
          res.json(holidays);
        } catch (apiError) {
          console.error('Erro na API de feriados:', apiError.message);
          res.status(500).json({ error: 'Erro ao buscar feriados da API' });
        }
      });
    } catch (error) {
      console.error('Erro geral:', error.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};

// Função para buscar feriados na Brasil API
function fetchHolidaysFromAPI(year) {
  return new Promise((resolve, reject) => {
    const url = `https://brasilapi.com.br/api/feriados/v1/${year}`;
    
    https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const holidays = JSON.parse(data);
          resolve(holidays);
        } catch (parseError) {
          reject(new Error('Erro ao processar resposta da API'));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`Erro na requisição: ${error.message}`));
    });
  });
}

module.exports = holidayController;