"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // Para editar eventos

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [calendarView, setCalendarView] = useState("time");

  // Cargar eventos desde la base de datos (API)
  useEffect(() => {
    /* fetch("https://api.example.com/citas") // Reemplaza con tu endpoint
      .then((response) => response.json())
      .then((data) =>
        setEvents(
          data.map((cita) => ({
            id: cita.id,
            title: cita.mascota + " - " + cita.owner,
            start: cita.fecha, // Asegúrate de que la fecha está en formato ISO
          }))
        )
      ); */
    setEvents([
      {
        title: " Dana ",
        date: "2025-02-26", // Asegúrate de que la fecha está en formato ISO
      },
      {
        title: " Oso ",
        date: new Date(
          new Date().setDate(new Date().getDate() + 1)
        ).toISOString(), // Asegúrate de que la fecha está en formato ISO
      },
      {
        title: " Freya ",
        date: new Date(
          new Date().setDate(new Date().getDate() + 2)
        ).toISOString(), // Asegúrate de que la fecha está en formato ISO
      },
      {
        title: "Conguito",
        start: "2025-03-01T16:00", // Asegúrate de que la fecha está en formato ISO
      },
      {
        title: "Conguito",
        start: "2025-03-01T17:21", // Asegúrate de que la fecha está en formato ISO
      },
      {
        title: "Conguito",
        start: "2025-03-01", // Asegúrate de que la fecha está en formato ISO
      },
      {
        title: "Conguito",
        start: "2025-03-01T20:21", // Asegúrate de que la fecha está en formato ISO
      },
      {
        title: "Conguito",
        start: "2025-03-01T19:30", // Asegúrate de que la fecha está en formato ISO
      },
      {
        title: "Conguito mestizo mediano",
        start: "2025-03-01T18:21",
        end: "2025-03-01T19:30", // Asegúrate de que la fecha está en formato ISO
      },
    ]);
  }, []);

  // Agregar nueva cita al hacer clic en una fecha
  const handleDateClick = async (info) => {
    const title = prompt("Nombre de la mascota:");
    if (title) {
      const newEvent = {
        title,
        start: info.dateStr,
      };

      // Guardar en la base de datos (API)
      const response = await fetch("https://api.example.com/citas", {
        method: "POST",
        body: JSON.stringify(newEvent),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setEvents([...events, newEvent]); // Actualizar el estado
      }
    }
  };

  // Editar evento (arrastrar y soltar)
  const handleEventDrop = async (info) => {
    const updatedEvent = {
      id: info.event.id,
      start: info.event.start.toISOString(),
    };

    // Actualizar en la base de datos
    const response = await fetch(
      `https://api.example.com/citas/${updatedEvent.id}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedEvent),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      setEvents(
        events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
      );
    } else {
      alert("Error al actualizar la cita");
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: "dayGridMonth,timeGridWeek,timeGridDay", // user can switch between the two
        center: "title",
        right: "today,prev,next",
      }}
      events={events}
      eventColor="#149FA9"
      height={"auto"}
      dateClick={handleDateClick} // Crear cita
      editable={true} // Permite mover eventos
      eventDrop={handleEventDrop} // Editar cita al mover
      dayMaxEvents={4}
      slotMinTime={"09:00:00"}
      slotMaxTime={"22:00:00"}
      locale={"es"}
      buttonText={{
        prev: "<",
        next: ">",
        today: "Hoy",
        month: "Mes",
        week: "Semana",
        day: "Dia",
      }}
    />
  );
}
