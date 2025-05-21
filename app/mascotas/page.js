import MascotasTable from '../_components/MascotasTable';
import { toMascotasDtoList } from '../_utils/clientesUtils';
import { getMascotasAction } from '../_actions/mascotasActions';
import { getClientesAction } from '../_actions/clienteActions';

export const metadata = {
  title: 'Mascotas',
};

export default async function Page() {
  try {
    const mascotas = await getMascotasAction();
    const clientes = await getClientesAction();
    const mascotasDTO = toMascotasDtoList(clientes, mascotas);

    return (
      <div className="w-5/6 place-self-center px-20">
        <MascotasTable mascotasList={mascotasDTO} />
      </div>
    );
  } catch (error) {
    console.error('Error en la pagina de mascotas:', error.message);
    return <div>Error al cargar los datos</div>;
  }
}
