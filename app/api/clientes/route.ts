import { NextRequest, NextResponse } from 'next/server';
import {
  adaptCliente,
  adaptClientesList,
} from '../../_adapters/clientesAdapter';
import prisma from '../prisma';

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const eventData = await prisma.cliente.findMany();
    const adaptedClientes = adaptClientesList(eventData);
    return NextResponse.json(
      { message: 'Success', adaptedClientes },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET method:', error);
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const clientData = await req.json();

    const newClient = await prisma.cliente.create({
      data: {
        name: clientData.name,
        phone: clientData.phone,
      },
    });

    const adaptedNewCliente = adaptCliente(newClient);

    return NextResponse.json(
      { message: 'Success creating new client', adaptedNewCliente },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
