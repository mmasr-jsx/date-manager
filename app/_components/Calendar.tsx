'use client';

import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Para editar eventos
import ReModal from './ReModal';
import CitaForm from './CitaForm';
import { getCitasAction, updateCitaAction } from '../_actions/citasActions';
import { getMascotasAction } from '../_actions/mascotasActions';
import { Cita } from '../_model/Cita';
import { MascotaDto } from '../_model/MascotaDto';
import { toMascotasDtoList } from '../_utils/clientesUtils';
import { getClientesAction } from '../_actions/clienteActions';
import { toast } from 'sonner';

export default function Calendar() {
  const [events, setEvents] = useState<any[]>([]);
  const [calendarView, setCalendarView] = useState('time');
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );
  const [currentCita, setCurrentCita] = useState<Cita | undefined>(undefined);
  const [mascotasMap, setMascotasMap] = useState<Map<string, MascotaDto>>(
    new Map()
  );

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDate(undefined);
    setCurrentCita(undefined);
  };

  const handleSaveCita = (cita: Cita) => {
    const newEvents = events.filter((e) => e.id !== cita.id);
    const mascotaName =
      mascotasMap.get(cita.mascotaId)?.name || 'Mascota Desconocida';
    const ownerName = mascotasMap.get(cita.mascotaId)?.owner || '';
    const ownerLastName = mascotasMap.get(cita.mascotaId)?.owner_lastName || '';

    const startDate = new Date(cita.start_time);
    const endDate = cita.end_time ? new Date(cita.end_time) : undefined;

    setEvents([
      ...newEvents,
      {
        id: cita.id,
        title: `${mascotaName} - ${ownerName} ${ownerLastName}`.trim(),
        start: startDate.toISOString(),
        end: endDate?.toISOString(),
        extendedProps: {
          mascotaId: cita.mascotaId,
          description: cita.description,
        },
      },
    ]);
  };

  useEffect(() => {
    async function loadCitasAndMascotas() {
      try {
        const [citasData, mascotasRawData, clientesData] = await Promise.all([
          getCitasAction(),
          getMascotasAction(),
          getClientesAction(),
        ]);

        const mascotasDto = toMascotasDtoList(clientesData, mascotasRawData);
        const map = new Map<string, MascotaDto>();
        mascotasDto.forEach((m) => map.set(m.id, m));
        setMascotasMap(map);

        const formattedEvents = citasData.map((cita) => {
          const mascota = map.get(cita.mascotaId);
          const title = mascota
            ? `${mascota.name} - ${mascota.owner} ${
                mascota.owner_lastName || ''
              }`.trim()
            : `Cita ${cita.id}`;

          const startDate = new Date(cita.start_time);
          const endDate = cita.end_time ? new Date(cita.end_time) : undefined;

          return {
            id: cita.id,
            title: title,
            start: startDate.toISOString(),
            end: endDate?.toISOString(),
            extendedProps: {
              mascotaId: cita.mascotaId,
              description: cita.description,
            },
          };
        });
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error al cargar citas o mascotas:', error);
      }
    }
    loadCitasAndMascotas();
  }, []);

  const handleDateClick = async (info: any) => {
    setSelectedDate(info.dateStr);
    setShowModal(true);
  };

  const handleEventDrop = async (info: any) => {
    const event = info.event;
    const newDate = new Date(event.start);

    const updatedCita: Cita = {
      id: event.id,
      mascotaId: String(event.extendedProps.mascotaId),
      start_time: newDate,
      end_time: event.end ? new Date(event.end) : undefined,
      description: event.extendedProps.description || null,
    };

    try {
      const result = await updateCitaAction(updatedCita);
      if (result.success) {
        toast.success(result.message);
        console.log('Cita actualizada exitosamente:', result.data);
      } else {
        toast.error('Error al actualizar la cita');
        console.error('Error al actualizar la cita', result.message);
        info.revert();
      }
    } catch (error) {
      toast.error('Error al actualizar la cita');
      console.error('Error al actualizar la cita:', error);
      info.revert();
    }
  };

  const handleEventResize = async (info: any) => {
    const event = info.event;
    const updatedCita: Cita = {
      id: event.id,
      mascotaId: event.extendedProps.mascotaId,
      start_time: event.start ? new Date(event.start) : undefined,
      end_time: event.end ? new Date(event.end) : undefined,
      description: event.extendedProps.description,
    };

    try {
      const result = await updateCitaAction(updatedCita);
      if (result.success) {
        toast.success(result.message);
        console.log('Cita actualizada exitosamente:', result.data);
      } else {
        toast.error('Error al actualizar la cita');
        console.error('Error al actualizar la cita:', result.message);
        info.revert();
      }
    } catch (error) {
      toast.error('Error al actualizar la cita:', error);
      console.error('Error al actualizar la cita:', error);
      info.revert();
    }
  };

  const handleEventClick = (info: any) => {
    const clickedCita = events.find((e) => e.id === info.event.id);
    if (clickedCita) {
      setCurrentCita({
        id: clickedCita.id,
        mascotaId: clickedCita.extendedProps.mascotaId,
        start_time: new Date(clickedCita.start),
        end_time: clickedCita.end ? new Date(clickedCita.end) : undefined,
        description: clickedCita.extendedProps.description,
      });
      setShowModal(true);
    }
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'dayGridMonth,timeGridWeek,timeGridDay',
          center: 'title',
          right: 'today,prev,next',
        }}
        events={events}
        eventColor="#149FA9"
        height={'auto'}
        dateClick={handleDateClick}
        editable={true}
        eventDrop={handleEventDrop}
        dayMaxEvents={4}
        slotMinTime={'08:00:00'}
        slotMaxTime={'22:00:00'}
        locale={'es'}
        buttonText={{
          prev: '<',
          next: '>',
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Dia',
        }}
        eventResize={handleEventResize}
        eventClick={handleEventClick}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          meridiem: false,
        }}
        displayEventTime={true}
        allDaySlot={false}
        timeZone="UTC"
      />
      <ReModal
        showModal={showModal}
        onClose={handleCloseModal}
        title={currentCita ? 'Editar Cita' : 'Nueva Cita'}
      >
        <CitaForm
          initialCita={currentCita}
          selectedDate={selectedDate}
          onClose={handleCloseModal}
          onSave={handleSaveCita}
        />
      </ReModal>
    </>
  );
}
