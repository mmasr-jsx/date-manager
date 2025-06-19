'use client';

import { useState, useEffect } from 'react';
import { MascotaDto } from '../_model/MascotaDto';
import { Cita } from '../_model/Cita';
import { getMascotasAction } from '../_actions/mascotasActions';
import {
  createCitaAction,
  updateCitaAction,
  deleteCitaAction,
} from '../_actions/citasActions';
import { SubmitButton } from './SubmitButton';
import { toast } from 'sonner';
import { toMascotasDtoList } from '../_utils/clientesUtils';
import { getClientesAction } from '../_actions/clienteActions';
import TimePicker from './TimePicker';
import { createDateTime } from '../_adapters/citasAdapter';

interface Props {
  initialCita?: Cita;
  selectedDate?: string;
  onClose: () => void;
  onSave: (cita: Cita) => void;
}

export default function CitaForm({
  initialCita,
  selectedDate,
  onClose,
  onSave,
}: Props) {
  const [mascotas, setMascotas] = useState<MascotaDto[]>([]);
  const [loadingMascotas, setLoadingMascotas] = useState(true);

  const parseStartDateTime = (date?: Date | string) => {
    if (!date) return { dateStr: '', timeStr: '' };
    const d = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(d.getTime())) return { dateStr: '', timeStr: '' };
    return {
      dateStr: d.toISOString().slice(0, 10),
      timeStr: d.toISOString().slice(11, 16),
    };
  };

  const initialStart = parseStartDateTime(
    initialCita?.start_time || selectedDate
  );
  const initialEndTime = initialCita?.end_time
    ? new Date(initialCita.end_time).toISOString().slice(11, 16)
    : '';

  const [formData, setFormData] = useState<{
    mascotaId: string;
    startDate: string;
    startTime: string;
    endTime: string;
    description?: string;
  }>(
    initialCita
      ? {
          mascotaId: String(initialCita.mascotaId),
          startDate: initialStart.dateStr,
          startTime: initialStart.timeStr,
          endTime: initialEndTime,
          description: initialCita.description || '',
        }
      : {
          mascotaId: '',
          startDate: initialStart.dateStr,
          startTime: initialStart.timeStr || '09:00',
          endTime: '',
          description: '',
        }
  );

  useEffect(() => {
    async function loadMascotas() {
      try {
        const mascotasData = await getMascotasAction();
        const clientesData = await getClientesAction();
        const mascotasDto = toMascotasDtoList(clientesData, mascotasData);
        setMascotas(mascotasDto);
      } catch (error) {
        console.error('Error al cargar las mascotas:', error);
        toast.error('Error al cargar las mascotas.');
      } finally {
        setLoadingMascotas(false);
      }
    }
    loadMascotas();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData.startTime, 'startTime');
    console.log(formData.endTime, 'endTime');

    const startDateTime = createDateTime(
      formData.startDate,
      formData.startTime
    );
    console.log(startDateTime, 'startDateTime');
    let endDateTime: Date | undefined = undefined;
    if (formData.endTime) {
      endDateTime = createDateTime(formData.startDate, formData.endTime);
    }

    if (!formData.mascotaId || isNaN(startDateTime.getTime())) {
      toast.error(
        'Por favor, selecciona una mascota y una fecha y hora de inicio válidas.'
      );
      return;
    }

    // Validate end time is not before start time on the same day
    if (endDateTime && endDateTime.getTime() < startDateTime.getTime()) {
      toast.error('La hora de fin no puede ser anterior a la hora de inicio.');
      return;
    }

    // Validate maximum 5 hours duration
    if (endDateTime) {
      const fiveHours = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
      if (endDateTime.getTime() - startDateTime.getTime() > fiveHours) {
        toast.error('La duración máxima de la cita es de 5 horas.');
        return;
      }
    }

    try {
      let result;
      const dataToSave: Cita = {
        id: initialCita?.id,
        mascotaId: String(formData.mascotaId),
        start_time: startDateTime,
        end_time: endDateTime,
        description: formData.description || null,
      };
      console.log(dataToSave, 'dataToSave');

      if (initialCita?.id) {
        result = await updateCitaAction(dataToSave);
      } else {
        result = await createCitaAction(dataToSave);
      }

      if (result.success) {
        toast.success(result.message);
        onSave(result.data as Cita);
        onClose();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error al guardar la cita:', error);
      toast.error('Error desconocido al guardar la cita.');
    }
  };

  const handleDelete = async () => {
    if (!initialCita?.id) {
      toast.error('No se puede eliminar una cita sin ID.');
      return;
    }
    if (confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
      try {
        const result = await deleteCitaAction(String(initialCita.id));
        if (result.success) {
          toast.success(result.message);
          onSave({ ...initialCita, id: undefined });
          onClose();
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error('Error al eliminar la cita:', error);
        toast.error('Error desconocido al eliminar la cita.');
      }
    }
  };

  if (loadingMascotas) {
    return <div>Cargando mascotas...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label
          htmlFor="mascotaId"
          className="block text-lg font-medium text-gray-700"
        >
          Mascota
        </label>
        <select
          id="mascotaId"
          name="mascotaId"
          value={formData.mascotaId}
          onChange={handleChange}
          required
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-gray-400 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg rounded-md"
        >
          <option value="" className="text-gray-900">
            Selecciona una mascota
          </option>
          {mascotas.map((mascota) => (
            <option
              key={mascota.id}
              value={mascota.id}
              className="text-gray-500"
            >
              {mascota.name} ({mascota.owner} {mascota.owner_lastName})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="startDate"
          className="block text-lg font-medium text-gray-700"
        >
          Fecha de Inicio
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-gray-400 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg rounded-md"
        />
      </div>

      <div>
        <label
          htmlFor="startTime"
          className="block text-lg font-medium text-gray-700"
        >
          Hora de Inicio
        </label>
        <TimePicker
          value={formData.startTime}
          onChange={(time) =>
            handleChange({ target: { name: 'startTime', value: time } } as any)
          }
          className="mt-1"
        />
      </div>

      <div>
        <label
          htmlFor="endTime"
          className="block text-lg font-medium text-gray-700"
        >
          Hora de Fin (Opcional)
        </label>
        <TimePicker
          value={formData.endTime}
          onChange={(time) =>
            handleChange({ target: { name: 'endTime', value: time } } as any)
          }
          className="mt-1"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-lg font-medium text-gray-700"
        >
          Descripción (Opcional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description || ''}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-gray-400 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg rounded-md"
        ></textarea>
      </div>

      <div className="flex gap-8">
        <div className="flex justify-start">
          {initialCita?.id && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 border rounded-md shadow-sm text-lg font-medium text-gray-50 bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Eliminar
            </button>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancelar
          </button>
          <SubmitButton>Guardar Cita</SubmitButton>
        </div>
      </div>
    </form>
  );
}
