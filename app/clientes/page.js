import { getClientesAction } from '../_actions/clienteActions';
import ClientesTable from '../_components/ClientesTable';

export const metadata = {
  title: 'Clientes',
};

export default async function Page() {
  try {
    const clientes = await getClientesAction();

    return (
      <div className="w-5/6 place-self-center px-20">
        <ClientesTable clientes={clientes} />
      </div>
    );
  } catch (error) {
    console.error('Error en la pagina de clientes:', error.message);
    return <div>Error al cargar los datos</div>;
  }
}
