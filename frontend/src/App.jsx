import React, { useState, useEffect } from 'react';
import EventCalendar from './components/EventCalendar';
import EventList from './components/EventList';
import EventModal from './components/EventModal';
import EventDetailModal from './components/EventDetailModal';
import { eventService } from './services/api';

function App() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  // Carregar eventos ao inicializar
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await eventService.getEvents();
      setEvents(response.data);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
      alert('Erro ao carregar eventos. Verifique se o backend está rodando.');
    }
  };

  const handleSaveEvent = async (eventData) => {
    try {
      if (editingEvent) {
        // Atualizar evento existente
        const response = await eventService.updateEvent(editingEvent.id, eventData);
        setEvents(events.map(event =>
          event.id === editingEvent.id ? response.data : event
        ));
      } else {
        // Criar novo evento
        const response = await eventService.createEvent(eventData);
        setEvents([...events, response.data]);
      }

      setIsModalOpen(false);
      setEditingEvent(null);
      setSelectedDate(null);
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      alert('Erro ao salvar evento');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      try {
        await eventService.deleteEvent(eventId);
        setEvents(events.filter(event => event.id !== eventId));
      } catch (error) {
        console.error('Erro ao excluir evento:', error);
        alert('Erro ao excluir evento');
      }
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event.resource);
    setIsDetailModalOpen(true);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleAddEvent = () => {
    setSelectedDate(null);
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setSelectedDate(null);
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Masuñi Nexus</h1>
        <p>Administração, calendário e visão — tudo em um só lugar.</p>
      </div>

      <div className="main-content">
        <EventCalendar
          events={events}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
        />

        <EventList
          events={events}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          onAddEvent={handleAddEvent}
        />
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEvent(null);
          setSelectedDate(null);
        }}
        onSave={handleSaveEvent}
        event={editingEvent}
        selectedDate={selectedDate}
      />

      <EventDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
}

export default App;