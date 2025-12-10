import React from 'react';
import moment from 'moment';

const EventList = ({ events, onEditEvent, onDeleteEvent, onAddEvent }) => {
  const sortedEvents = events.sort((a, b) => new Date(a.start_date || a.date) - new Date(b.start_date || b.date));
  
  // Agrupar eventos por data
  const groupedEvents = sortedEvents.reduce((groups, event) => {
    const date = moment(event.start_date || event.date).format('YYYY-MM-DD');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {});

  return (
    <div className="events-section">
      <h2>Lista de Eventos</h2>
      <button className="add-event-btn" onClick={onAddEvent}>
        + Adicionar Evento
      </button>
      
      {sortedEvents.length === 0 ? (
        <p>Nenhum evento cadastrado.</p>
      ) : (
        Object.entries(groupedEvents).map(([date, dateEvents]) => (
          <div key={date} className="date-group">
            <h3 className="date-header">
              📅 {moment(date).format('DD [de] MMMM [de] YYYY')}
            </h3>
            {dateEvents.map(event => (
              <div 
                key={event.id} 
                className="event-card"
                style={{ borderLeftColor: event.color }}
              >
                <div className="event-title">{event.title}</div>
                <div className="event-date">
                  {(() => {
                    const startDate = moment(event.start_date || event.date).format('DD/MM/YYYY');
                    const endDate = event.end_date && event.end_date !== (event.start_date || event.date) 
                      ? moment(event.end_date).format('DD/MM/YYYY')
                      : null;
                    return endDate ? `${startDate} - ${endDate}` : startDate;
                  })()}
                </div>
                {(event.city || event.state) && (
                  <div className="event-location">
                    📍 {event.city}{event.city && event.state ? ', ' : ''}{event.state}
                  </div>
                )}
                {event.description && (
                  <div className="event-description">{event.description}</div>
                )}
                <div className="event-actions">
                  <button 
                    className="btn-edit"
                    onClick={() => onEditEvent(event)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => onDeleteEvent(event.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;