import React, { useState, useEffect } from 'react';
import moment from 'moment';

const EventModal = ({ isOpen, onClose, onSave, event, selectedDate }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    color: '#3174ad',
    description: ''
  });

  useEffect(() => {
    if (event) {
      // Garantir que a data seja formatada corretamente
      const eventDate = event.date.includes('T') ? event.date.split('T')[0] : event.date;
      setFormData({
        title: event.title || '',
        date: eventDate,
        color: event.color || '#3174ad',
        description: event.description || ''
      });
    } else if (selectedDate) {
      setFormData({
        title: '',
        date: moment(selectedDate).format('YYYY-MM-DD'),
        color: '#3174ad',
        description: ''
      });
    } else {
      setFormData({
        title: '',
        date: moment().format('YYYY-MM-DD'),
        color: '#3174ad',
        description: ''
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
            <label>Data *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
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