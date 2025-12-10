import React, { useState, useEffect } from 'react';
import moment from 'moment';

const EventModal = ({ isOpen, onClose, onSave, event, selectedDate }) => {
  const [formData, setFormData] = useState({
    title: '',
    start_date: '',
    end_date: '',
    color: '#3174ad',
    description: '',
    city: '',
    state: ''
  });

  useEffect(() => {
    if (event) {
      const startDate = event.start_date ? (event.start_date.includes('T') ? event.start_date.split('T')[0] : event.start_date) : event.date;
      const endDate = event.end_date ? (event.end_date.includes('T') ? event.end_date.split('T')[0] : event.end_date) : startDate;
      setFormData({
        title: event.title || '',
        start_date: startDate,
        end_date: endDate,
        color: event.color || '#3174ad',
        description: event.description || '',
        city: event.city || '',
        state: event.state || ''
      });
    } else if (selectedDate) {
      const dateStr = moment(selectedDate).format('YYYY-MM-DD');
      setFormData({
        title: '',
        start_date: dateStr,
        end_date: dateStr,
        color: '#3174ad',
        description: '',
        city: '',
        state: ''
      });
    } else {
      const dateStr = moment().format('YYYY-MM-DD');
      setFormData({
        title: '',
        start_date: dateStr,
        end_date: dateStr,
        color: '#3174ad',
        description: '',
        city: '',
        state: ''
      });
    }
  }, [event, selectedDate, isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Título é obrigatório');
      return;
    }
    if (!formData.start_date) {
      alert('Data de início é obrigatória');
      return;
    }
    
    // Garantir que end_date não seja anterior a start_date
    if (formData.end_date && formData.end_date < formData.start_date) {
      alert('Data de fim não pode ser anterior à data de início');
      return;
    }
    
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{event ? 'Editar Evento' : 'Novo Evento'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Digite o título do evento"
            />
          </div>

          <div className="form-group">
            <label>Data de Início *</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Data de Fim</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              min={formData.start_date}
            />
          </div>

          <div className="form-group">
            <label>Cor</label>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="color-input"
            />
          </div>

          <div className="form-group">
            <label>Cidade</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ex: São Paulo"
            />
          </div>

          <div className="form-group">
            <label>Estado</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Ex: SP"
              maxLength="2"
              style={{ textTransform: 'uppercase' }}
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Digite uma descrição para o evento"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {event ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;