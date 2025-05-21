import { redirect } from 'next/navigation';
import { Mascota } from '../_model/Mascota';
import { MascotaDto } from '../_model/MascotaDto';
import { getClienteByIdAction, updateClienteAction } from './clienteActions';
import { getMascotaByIdAction, updateMascotaAction } from './mascotasActions';
import { Cliente } from '../_model/Cliente';
import { validatePhone } from '../_utils/clientesUtils';

export default async function updateDtoAction(mascotaDto: MascotaDto) {
  const cliente = await getClienteByIdAction(mascotaDto.ownerId);
  const mascota = await getMascotaByIdAction(mascotaDto.id);

  const clienteToUpdate: Cliente = {
    id: cliente.id,
    name: mascotaDto.owner || cliente.name,
    last_name: mascotaDto.owner_lastName || cliente.last_name || null,
    phone: validatePhone(mascotaDto.phone, cliente.phone),
    sec_phone: validatePhone(mascotaDto.sec_phone, cliente.sec_phone),
  };

  const mascotaToUpdate: Mascota = {
    id: mascota.id,
    name: mascotaDto.name || mascota.name,
    ownerId: mascota.ownerId,
    breed: mascotaDto.breed || mascota.breed,
    prize: mascotaDto.prize || mascota.prize,
    size: mascotaDto.size || mascota.size,
    warning: mascotaDto.warning || mascota.warning,
    description: mascotaDto.description || mascota.description,
  };

  const clienteResult = await updateClienteAction(clienteToUpdate);
  const mascotaResult = await updateMascotaAction(mascotaToUpdate);

  if (clienteResult.success && mascotaResult.success) {
    redirect('/mascotas');
  } else if (!clienteResult.success) {
    return {
      message: clienteResult.message,
      success: clienteResult.success,
    };
  } else if (!mascotaResult.success) {
    return {
      message: mascotaResult.message,
      success: mascotaResult.success,
    };
  }
  return {
    message: 'Error al actualizar el cliente o la mascota',
    success: false,
  };
}
