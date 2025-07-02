import { Cita } from '../_model/Cita';

export function adaptCita(cita: any): Cita {
  const startDate = new Date(cita.start_time);
  const endDate = cita.end_time ? new Date(cita.end_time) : undefined;

  return {
    ...cita,
    id: String(cita.id),
    mascotaId: String(cita.mascotaId),
    start_time: startDate,
    end_time: endDate,
    start_date: startDate.toISOString().split('T')[0],
    start_time_str: startDate.toTimeString().slice(0, 5),
    end_time_str: endDate ? endDate.toTimeString().slice(0, 5) : undefined,
  };
}

export function adaptCitasList(citas: any[]): Cita[] {
  return citas.map(adaptCita);
}

export function createDateTime(dateStr: string, timeStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hour, minute] = timeStr.split(':').map(Number);

  // To avoid A LOT of errors working with timeZones, is a good practice to work directly with UTC dates
  const date = new Date(Date.UTC(year, month - 1, day, hour, minute));

  return date;
}
