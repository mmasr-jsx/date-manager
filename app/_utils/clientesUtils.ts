import { MascotaDto } from '../_model/MascotaDto';
import { Mascota } from '../_model/Mascota';
import { Cliente } from '../_model/Cliente';
import { stringToUppercase } from './utils';

export function toMascotasDtoList(
  clientes: Cliente[],
  mascotas: Mascota[]
): MascotaDto[] {
  const mascotasListDto: MascotaDto[] = mascotas.map((mascota: Mascota) => {
    const owner = clientes.find((cliente) => cliente.id === mascota.ownerId);
    return {
      ...mascota,
      owner: owner ? owner.name : '',
      owner_lastName: owner ? owner.last_name : '',
      ownerId: owner ? owner.id : '',
      phone: owner ? owner.phone : null,
      sec_phone: owner ? owner.sec_phone : null,
    };
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
