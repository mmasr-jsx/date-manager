'use server';

import prisma from '../api/prisma';
import { adaptCita, adaptCitasList } from '../_adapters/citasAdapter';
import { Cita } from '../_model/Cita';

export async function getCitasAction() {
  try {
    const citas = await prisma.cita.findMany();
    return adaptCitasList(citas);
  } catch (error) {
    console.error('Error al obtener citas:', error);
    throw new Error('Error al cargar las citas');
  }
}

export async function createCitaAction(cita: Cita) {
  try {
    const newCita = await prisma.cita.create({
      data: {
        mascotaId: Number(cita.mascotaId),
        start_time: cita.start_time,
        end_time: cita.end_time || null,
        description: cita.description || null,
      },
    });
    console.log('create new cita', newCita);
    const adaptedNewCita = adaptCita(newCita);
    return {
      message: 'Cita creada exitosamente',
      success: true,
      data: adaptedNewCita,
    };
  } catch (error: any) {
    console.error('Error al crear la cita:', error);
    return {
      message: error.message || 'Error desconocido al crear la cita.',
      success: false,
      data: null,
    };
  }
}

export async function updateCitaAction(cita: Cita) {
  try {
    console.log('updateCitaAction input:', {
      start_time: cita.start_time,
      end_time: cita.end_time,
    });

    const updatedCita = await prisma.cita.update({
      where: { id: parseInt(String(cita.id)) },
      data: {
        mascotaId: Number(cita.mascotaId),
        start_time: cita.start_time,
        end_time: cita.end_time || null,
        description: cita.description || null,
      },
    });

    const adaptedCita = adaptCita(updatedCita);
    return {
      message: 'Cita actualizada exitosamente',
      success: true,
      data: adaptedCita,
    };
  } catch (error: any) {
    console.error('Error al actualizar la cita:', error);
    return {
      message: error.message || 'Error desconocido al actualizar la cita.',
      success: false,
      data: null,
    };
  }
}

export async function deleteCitaAction(id: string) {
  try {
    await prisma.cita.delete({
      where: { id: parseInt(id) },
    });
    return {
      message: 'Cita eliminada exitosamente',
      success: true,
    };
  } catch (error: any) {
    console.error('Error al eliminar la cita:', error);
    return {
      message: error.message || 'Error desconocido al eliminar la cita.',
      success: false,
    };
  }
}
