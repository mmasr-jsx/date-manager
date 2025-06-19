import { MascotaDto } from '../_model/MascotaDto';
import { Mascota } from '../_model/Mascota';
import { Cliente } from '../_model/Cliente';
import { stringToUppercase } from './utils';

export function toMascotaDto(mascota: Mascota, cliente: Cliente): MascotaDto {
  return {
    ...mascota,
    owner: cliente ? cliente.name : '',
    owner_lastName: cliente ? cliente.last_name : '',
    ownerId: cliente ? cliente.id : '',
    phone: cliente ? cliente.phone : null,
    sec_phone: cliente ? cliente.sec_phone : null,
  };
}

export function toMascotasDtoList(
  clientes: Cliente[],
  mascotas: Mascota[]
): MascotaDto[] {
  const mascotasListDto: MascotaDto[] = mascotas.map((mascota: Mascota) => {
    const cliente = clientes.find((cliente) => cliente.id === mascota.ownerId);
    return toMascotaDto(mascota, cliente);
  });

  return mascotasListDto;
}

export function listMascotas(mascotas?: Mascota[], cliente?: Cliente) {
  if (!mascotas || mascotas.length === 0) {
    return ['No hay mascotas registradas'];
  }

  const mascotasList = mascotas.map((mascota: Mascota) =>
    stringToUppercase(mascota.name, true)
  );

  return mascotasList.join(', ');
}

export function validatePhone(
  newPhone: number | string | null,
  currentPhone: string | null
): string | null {
  if (!newPhone) return currentPhone;
  return String(newPhone);
}
