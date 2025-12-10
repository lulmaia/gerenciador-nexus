import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { holidayService } from '../services/api';

const localizer = momentLocalizer(moment);

const EventCalendar = ({ events, onSelectEvent, onSelectSlot }) => {
  const [holidays, setHolidays] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Debug: verificar eventos recebidos
  useEffect(() => {
    console.log('EventCalendar - Eventos recebidos:', events);
  }, [events]);

  // Carregar feriados quando o ano mudar
  useEffect(() => {
    loadHolidays(currentYear);
  }, [currentYear]);

  const loadHolidays = async (year) => {
    try {
      const response = await holidayService.getHolidays(year);
      setHolidays(response.data);
    } catch (error) {
      console.error('Erro ao carregar feriados:', error);
      setHolidays([]);
    }
  };

  // Converter eventos do usuário
  const calendarEvents = events.map(event => {
    // Garantir que a data seja válida
    const dateStr = event.start_date || event.date;
    if (!dateStr) return null;
    
    const startDate = new Date(dateStr + 'T12:00:00');
    const endDate = new Date((event.end_date || dateStr) + 'T23:59:59');
    
    // Verificar se as datas são válidas
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.warn('Data inválida no evento:', event);
      return null;
    }
    
    return {
      id: event.id,
      title: event.title,
      start: startDate,
      end: endDate,
      resource: { ...event, type: 'event' }
    };
  }).filter(Boolean); // Remove eventos nulos

  // Converter feriados
  const holidayEvents = holidays.map(holiday => {
    const holidayDate = new Date(holiday.date + 'T12:00:00');
    
    return {
      id: `holiday-${holiday.id}`,
      title: `🎌 ${holiday.name}`,
      start: holidayDate,
      end: holidayDate,
      resource: { ...holiday, type: 'holiday' }
    };
  });

  // Combinar eventos e feriados
  const allEvents = [...calendarEvents, ...holidayEvents];
  
  // Debug: verificar eventos finais
  console.log('EventCalendar - Eventos do usuário processados:', calendarEvents);
  console.log('EventCalendar - Feriados processados:', holidayEvents);
  console.log('EventCalendar - Todos os eventos:', allEvents);

  const eventStyleGetter = (event) => {
    const isHoliday = event.resource.type === 'holiday';
    const backgroundColor = isHoliday ? '#e63946' : (event.resource.color || '#3174ad');
    
    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: isHoliday ? 0.9 : 0.8,
        color: 'white',
        border: isHoliday ? '2px solid #d62828' : '0px',
        display: 'block',
        fontWeight: isHoliday ? 'bold' : 'normal'
      }
    };
  };

  // Detectar mudança de ano no calendário
  const handleNavigate = (date) => {
    const year = moment(date).year();
    if (year !== currentYear) {
      setCurrentYear(year);
    }
  };

  // Customizar seleção de eventos (não permitir seleção de feriados)
  const handleSelectEvent = (event) => {
    if (event.resource.type === 'holiday') {
      return; // Não fazer nada para feriados
    }
    onSelectEvent(event);
  };

  return (
    <div className="calendar-section">
      <h2>Calendário de Eventos</h2>
      
      {/* Legenda */}
      <div className="calendar-legend" style={{ 
        display: 'flex', 
        gap: '20px', 
        marginBottom: '15px', 
        fontSize: '14px',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ 
            width: '16px', 
            height: '16px', 
            backgroundColor: '#3174ad', 
            borderRadius: '3px' 
          }}></div>
          <span>Seus Eventos</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ 
            width: '16px', 
            height: '16px', 
            backgroundColor: '#e63946', 
            borderRadius: '3px',
            border: '2px solid #d62828'
          }}></div>
          <span>🎌 Feriados Nacionais</span>
        </div>
        <small style={{ color: '#666', fontStyle: 'italic' }}>
          Feriados carregados automaticamente
        </small>
      </div>

      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={onSelectSlot}
        onNavigate={handleNavigate}
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
        tooltipAccessor={(event) => {
          if (event.resource.type === 'holiday') {
            return `Feriado Nacional: ${event.resource.name}`;
          }
          return event.resource.description || event.title;
        }}
      />
    </div>
  );
};

export default EventCalendar;