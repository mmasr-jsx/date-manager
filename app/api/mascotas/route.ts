import { NextResponse } from 'next/server';
import { adaptMascotasList } from '../../_adapters/mascotasAdapter';
import prisma from '../prisma';

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const eventData = await prisma.mascotas.findMany();
    const adaptedMascotas = adaptMascotasList(eventData);
    return NextResponse.json(
      { message: 'Success', adaptedMascotas },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error in GET method:', err);
    return NextResponse.json({ message: 'Error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export async function PUSH() {}
