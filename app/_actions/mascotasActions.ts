'use server';

import prisma from '../api/prisma';
import { adaptMascota, adaptMascotasList } from '../_adapters/mascotasAdapter';
import { Mascota } from '../_model/Mascota';

export async function getMascotasAction() {
  try {
    const mascotas = await prisma.mascotas.findMany();
    return adaptMascotasList(mascotas);
  } catch (error) {
    console.error('Error al obtener mascotas:', error);
    throw new Error('Error al cargar las mascotas');
  }
}

export async function getMascotaByIdAction(id: string) {
  try {
    const mascota = await prisma.mascotas.findUnique({
      where: { id: parseInt(id) },
    });
    return adaptMascota(mascota);
  } catch (error) {
    console.error('Error al obtener mascota por ID:', error);
    throw new Error('Error al cargar la mascota');
  }
}

export async function createMascotaAction(mascota: Mascota) {
  try {
    const newMascota = await prisma.mascotas.create({
      data: {
        name: mascota.name,
        ownerId: Number(mascota.ownerId),
        breed: mascota.breed || null,
        prize: mascota.prize || null,
        size: mascota.size || null,
        warning: mascota.warning || false,
        description: mascota.description || null,
      },
    });
    const adaptedNewMascota = adaptMascota(newMascota);
    return {
      message: 'Mascota creada exitosamente',
      success: true,
      data: adaptedNewMascota,
    };
  } catch (error: any) {
    console.error('Error al crear la mascota:', error);
    return {
      message: error.message || 'Error desconocido al crear la mascota.',
      success: false,
      data: null,
    };
  }
}

export async function updateMascotaAction(mascota: Mascota) {
  try {
    const updatedMascota = await prisma.mascotas.update({
      where: { id: parseInt(mascota.id) },
      data: {
        name: mascota.name,
        ownerId: Number(mascota.ownerId),
        breed: mascota.breed || null,
        prize: mascota.prize || null,
        size: mascota.size || null,
        warning: mascota.warning || false,
        description: mascota.description || null,
      },
    });

    const adaptedMascota = adaptMascota(updatedMascota);
    return {
      message: 'Mascota actualizada exitosamente',
      success: true,
      data: adaptedMascota,
    };
  } catch (error: any) {
    console.error('Error al actualizar la mascota:', error);
    return {
      message: error.message || 'Error desconocido al actualizar la mascota.',
      success: false,
      data: null,
    };
  }
}

export async function deleteMascotaAction(id: string) {
  try {
    await prisma.mascotas.delete({
      where: { id: parseInt(id) },
    });
    return {
      message: 'Mascota eliminada exitosamente',
      success: true,
    };
  } catch (error: any) {
    console.error('Error al eliminar la mascota:', error);
    return {
      message: error.message || 'Error desconocido al eliminar la mascota.',
      success: false,
    };
  }
}
