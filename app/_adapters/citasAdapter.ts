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
  // Asegurarnos de que la fecha se crea en UTC
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);

  // Crear la fecha en UTC
  const date = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
  console.log('createDateTime input:', { dateStr, timeStr });
  console.log('createDateTime output:', date.toISOString());
  return date;
}
