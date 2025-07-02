'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ReModal from './ReModal';
import { getCitasAction, updateCitaAction } from '../_actions/citasActions';
import { getMascotasAction } from '../_actions/mascotasActions';
import { Cita } from '../_model/Cita';
import { MascotaDto } from '../_model/MascotaDto';
import { toMascotasDtoList } from '../_utils/clientesUtils';
import { getClientesAction } from '../_actions/clienteActions';
import { toast } from 'sonner';
import { truncateText } from '../_utils/utils';

const LazyCitaForm = lazy(() => import('./CitaForm'));

export default function Calendar() {
  const [events, setEvents] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );
  const [currentCita, setCurrentCita] = useState<Cita | undefined>(undefined);
  const [mascotasMap, setMascotasMap] = useState<Map<string, MascotaDto>>(
    new Map()
  );
  const [mascotasList, setMascotasList] = useState<MascotaDto[]>([]);
  const [loadingInitialData, setLoadingInitialData] = useState(true);

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

  const handleDeleteCita = (id: string) => {
    const newEvents = events.filter((e) => e.id !== id);
    setEvents(newEvents);
  };

  useEffect(() => {
    async function loadInitialData() {
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
        setMascotasList(mascotasDto);

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
        console.error('Error al cargar datos iniciales:', error);
        toast.error('Error al cargar datos iniciales.');
      } finally {
        setLoadingInitialData(false);
      }
    }
    loadInitialData();
  }, []);

  const handleDateClick = async (info: any) => {
    setSelectedDate(info.dateStr);
    setCurrentCita(undefined); // Asegurarse de que es una nueva cita
    setShowModal(true);
  };

  const handleEventDrop = async (info: any) => {
    const event = info.event;
    // Recrear la fecha desde el ISO string para asegurar la zona horaria UTC
    const newDate = new Date(event.start.toISOString());

    const updatedCita: Cita = {
      id: event.id,
      mascotaId: String(event.extendedProps.mascotaId),
      start_time: newDate,
      end_time: event.end ? new Date(event.end.toISOString()) : undefined, // Asegurar también para end_time
      description: event.extendedProps.description || null,
    };

    try {
      const result = await updateCitaAction(updatedCita);
      if (result.success) {
        toast.success(result.message);
        const updatedEventIndex = events.findIndex(
          (e) => e.id === result.data.id
        );
        if (updatedEventIndex > -1) {
          const updatedEvents = [...events];
          const updatedMascota = mascotasMap.get(result.data.mascotaId);
          const updatedTitle = updatedMascota
            ? `${updatedMascota.name} - ${updatedMascota.owner} ${
                updatedMascota.owner_lastName || ''
              }`.trim()
            : `Cita ${result.data.id}`;
          updatedEvents[updatedEventIndex] = {
            ...updatedEvents[updatedEventIndex],
            start: result.data.start_time.toISOString(),
            end: result.data.end_time?.toISOString(),
            title: updatedTitle,
          };
          setEvents(updatedEvents);
        }
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
      /*       // Recrear las fechas desde el ISO string para asegurar la zona horaria UTC
      start_time: event.start ? new Date(event.start.toISOString()) : undefined,
      end_time: event.end ? new Date(event.end.toISOString()) : undefined, */
      description: event.extendedProps.description,
    };

    try {
      const result = await updateCitaAction(updatedCita);
      if (result.success) {
        toast.success(result.message);
        // Actualizar el evento en el estado de FullCalendar
        const updatedEventIndex = events.findIndex(
          (e) => e.id === result.data.id
        );
        if (updatedEventIndex > -1) {
          const updatedEvents = [...events];
          updatedEvents[updatedEventIndex] = {
            ...updatedEvents[updatedEventIndex],
            start: result.data.start_time.toISOString(),
            end: result.data.end_time?.toISOString(),
          };
          setEvents(updatedEvents);
        }
      } else {
        toast.error('Error al actualizar la cita');
        console.error('Error al actualizar la cita:', result.message);
        info.revert();
      }
    } catch (error) {
      toast.error('Error al actualizar la cita:');
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

  if (loadingInitialData) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Cargando calendario...
      </div>
    );
  }

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
          timeZone: 'UTC',
        }}
        displayEventTime={true}
        allDaySlot={false}
        eventDisplay="block"
        eventContent={(eventInfo) => {
          const event = eventInfo.event;
          const startTime = event.start
            ? event.start.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'UTC',
              })
            : '';
          const endTime = event.end
            ? event.end.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'UTC',
              })
            : '';

          const timeRange = endTime ? `${startTime}-${endTime}` : startTime;

          return {
            html: `
              <div class="fc-event-main-frame overflow-hidden">
                <div class="fc-event-title-container">
                  <div class="fc-event-title fc-sticky">
                    ${timeRange} ${truncateText(event.title, 14)}
                  </div>
                </div>
              </div>
            `,
          };
        }}
      />
      <ReModal
        showModal={showModal}
        onClose={handleCloseModal}
        title={currentCita ? 'Editar Cita' : 'Nueva Cita'}
      >
        <Suspense fallback={<div>Cargando formulario...</div>}>
          <LazyCitaForm
            initialCita={currentCita}
            selectedDate={selectedDate}
            onClose={handleCloseModal}
            onSave={handleSaveCita}
            onDelete={handleDeleteCita}
            mascotas={mascotasList}
          />
        </Suspense>
      </ReModal>
    </>
  );
}
