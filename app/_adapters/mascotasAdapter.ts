export function adaptMascota(mascota) {
  return {
    ...mascota,
    id: String(mascota.id),
    ownerId: String(mascota.ownerId),
    prize: Number(mascota.prize),
    created_at: mascota.created_at.toISOString(),
  };
}

export function adaptMascotasList(mascotas) {
  return mascotas.map(adaptMascota);
}
