import { adaptMascota } from './mascotasAdapter';

export function adaptCliente(cliente) {
  return {
    ...cliente,
    id: String(cliente.id),
    phone: cliente.phone ? String(cliente.phone) : null,
    sec_phone: cliente.sec_phone ? String(cliente.sec_phone) : null,
    pets: cliente.pets ? cliente.pets.map(adaptMascota) : [],
  };
}

export function adaptClientesList(clientes) {
  return clientes.map(adaptCliente);
}
