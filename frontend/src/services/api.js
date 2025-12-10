import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const eventService = {
  // Buscar todos os eventos
  getEvents: () => api.get('/events'),
  
  // Criar novo evento
  createEvent: (eventData) => api.post('/events', eventData),
  
  // Atualizar evento
  updateEvent: (id, eventData) => api.put(`/events/${id}`, eventData),
  
  // Deletar evento
  deleteEvent: (id) => api.delete(`/events/${id}`)
};

export const holidayService = {
  // Buscar feriados do ano
  getHolidays: (year) => api.get(`/holidays/${year}`)
};

export default api;