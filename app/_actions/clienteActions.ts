'use server';

import prisma from '../api/prisma';
import { adaptCliente } from '../_adapters/clientesAdapter';
import { Cliente } from '../_model/Cliente';
import { adaptClientesList } from '../_adapters/clientesAdapter';
import { Mascota } from '../_model/Mascota';

export async function getClientesAction() {
  try {
    const clientes = await prisma.cliente.findMany({
      include: {
        pets: true,
      },
    });
    return adaptClientesList(clientes);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    throw new Error('Error al cargar los clientes');
  }
}

export async function getClienteByIdAction(id: string) {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: parseInt(id) },
    });
    return adaptCliente(cliente);
  } catch (error) {
    console.error('Error al obtener cliente por ID:', error);
    throw new Error('Error al cargar el cliente');
  }
}

export async function createClienteAction(cliente: Cliente) {
  try {
    const newClient = await prisma.cliente.create({
      data: {
        name: cliente.name,
        last_name: cliente.last_name || null,
        phone: cliente.phone || null,
        sec_phone: cliente.sec_phone || null,
      },
    });

    const adaptedNewCliente = adaptCliente(newClient);
    return {
      message: 'Cliente creado exitosamente',
      success: true,
      data: adaptedNewCliente,
    };
  } catch (error: any) {
    console.error('Error al crear el cliente:', error);
    return {
      message: error.message || 'Error desconocido al crear el cliente.',
      success: false,
      data: null,
    };
  }
}

export async function updateClienteAction(cliente: Cliente, mascota?: Mascota) {
  try {
    const updatedCliente = await prisma.cliente.update({
      where: { id: parseInt(cliente.id) },
      data: {
        name: cliente.name,
        last_name: cliente.last_name || null,
        phone: cliente.phone || null,
        sec_phone: cliente.sec_phone || null,
        ...(mascota && {
          pets: {
            connect: {
              id: parseInt(mascota.id),
            },
          },
        }),
      },
      include: {
        pets: true,
      },
    });

    const adaptedCliente = adaptCliente(updatedCliente);
    return {
      message: 'Cliente actualizado exitosamente',
      success: true,
      data: adaptedCliente,
    };
  } catch (error: any) {
    console.error('Error al actualizar el cliente:', error);
    return {
      message: error.message || 'Error desconocido al actualizar el cliente.',
      success: false,
      data: null,
    };
  }
}

export async function deleteClienteAction(id: string) {
  try {
    // Use a transaction to ensure both operations complete or none does
    await prisma.$transaction(async (tx) => {
      // First delete all pets associated with the client
      await tx.mascotas.deleteMany({
        where: { ownerId: parseInt(id) },
      });

      // Then delete the client
      await tx.cliente.delete({
        where: { id: parseInt(id) },
      });
    });

    return {
      message: 'Cliente y sus mascotas eliminados exitosamente',
      success: true,
    };
  } catch (error: any) {
    console.error('Error al eliminar el cliente y sus mascotas:', error);
    return {
      message:
        error.message ||
        'Error desconocido al eliminar el cliente y sus mascotas.',
      success: false,
    };
  }
}
