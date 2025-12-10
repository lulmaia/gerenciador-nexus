import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const EventCalendar = ({ events, onSelectEvent, onSelectSlot }) => {
  const calendarEvents = events.map(event => {
    // Corrigir problema de fuso horário
    const eventDate = new Date(event.date + 'T12:00:00');
    return {
      id: event.id,
      title: event.title,
      start: eventDate,
      end: eventDate,
      resource: event
    };
  });

  const eventStyleGetter = (event) => {
    const backgroundColor = event.resource.color || '#3174ad';
    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  return (
    <div className="calendar-section">
      <h2>Calendário de Eventos</h2>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable
        eventPropGetter={eventStyleGetter}
        views={['month', 'week', 'day']}
        defaultView="month"
        messages={{
          next: "Próximo",
          previous: "Anterior",
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia"
        }}
      />
    </div>
  );
};

export default EventCalendar;