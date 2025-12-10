import React from 'react';
import moment from 'moment';

const EventDetailModal = ({ isOpen, onClose, event, onEdit, onDelete }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Detalhes do Evento</h2>
        
        <div className="form-group">
          <label>Título</label>
          <div style={{ 
            padding: '10px', 
            background: '#f8f9fa', 
            borderRadius: '4px',
            fontWeight: 'bold'
          }}>
            {event.title}
          </div>
        </div>

        <div className="form-group">
          <label>Período</label>
          <div style={{ 
            padding: '10px', 
            background: '#f8f9fa', 
            borderRadius: '4px' 
          }}>
            {(() => {
              const startDate = moment(event.start_date || event.date).format('DD/MM/YYYY');
              const endDate = event.end_date && event.end_date !== (event.start_date || event.date) 
                ? moment(event.end_date).format('DD/MM/YYYY')
                : null;
              return endDate ? `${startDate} - ${endDate}` : startDate;
            })()}
          </div>
        </div>

        <div className="form-group">
          <label>Cor</label>
          <div style={{ 
            padding: '10px', 
            background: '#f8f9fa', 
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div 
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: event.color,
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
            {event.color}
          </div>
        </div>

        {event.description && (
          <div className="form-group">
            <label>Descrição</label>
            <div style={{ 
              padding: '10px', 
              background: '#f8f9fa', 
              borderRadius: '4px',
              minHeight: '60px'
            }}>
              {event.description}
            </div>
          </div>
        )}

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Fechar
          </button>
          <button 
            type="button" 
            className="btn-edit" 
            onClick={() => {
              onEdit(event);
              onClose();
            }}
          >
            Editar
          </button>
          <button 
            type="button" 
            className="btn-delete" 
            onClick={() => {
              if (window.confirm('Tem certeza que deseja excluir este evento?')) {
                onDelete(event.id);
                onClose();
              }
            }}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;