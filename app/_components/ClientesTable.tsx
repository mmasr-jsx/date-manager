'use client';

import { useState } from 'react';
import { listMascotas } from '../_utils/clientesUtils';
import { oddLine, truncateText, stringToUppercase } from '../_utils/utils';
import MascotaForm from './MascotaForm';
import ReModal from './ReModal';
import { Cliente } from '../_model/Cliente';
import ClienteCard from './ClienteCard';
import ClienteForm from './ClienteForm';
import { MascotaDto } from '../_model/MascotaDto';
import MascotaDtoForm from './MascotaDtoForm';
import EditIcon from './icons/EditIcon';
import TrashIcon from './icons/TrashIcon';
import PawIcon from './icons/PawIcon';
import { deleteClienteAction } from '../_actions/clienteActions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { deleteMascotaAction } from '../_actions/mascotasActions';

interface Props {
  clientes: Cliente[];
}

export default function ClientesTable({ clientes }: Props) {
  const router = useRouter();
  const [showMascotaForm, setshowMascotaForm] = useState(false);
  const [showMascotaDtoForm, setshowMascotaDtoForm] = useState(false);
  const [showClienteCard, setshowClienteCard] = useState(false);
  const [showClienteForm, setShowClienteForm] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedMascotaDto, setSelectedMascotaDto] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  function openMascotaForm(clienteId) {
    setSelectedCliente(clientes.find((cliente) => cliente.id === clienteId));
    setshowMascotaForm(true);
  }

  function openClienteCard(clienteId) {
    setSelectedCliente(clientes.find((cliente) => cliente.id === clienteId));
    setIsEdit(true);
    setshowClienteCard(true);
  }

  function openClienteForm() {
    setshowClienteCard(false);
    setShowClienteForm(true);
  }

  function handleEdit(isEdit: boolean, clienteId: string) {
    setIsEdit(isEdit);
    !isEdit
      ? setSelectedCliente(null)
      : setSelectedCliente(
          clientes.find((cliente) => cliente.id === clienteId)
        );
    openClienteForm();
  }

  function handleMascotaDtoEdit(mascotaDto: MascotaDto) {
    setSelectedMascotaDto(mascotaDto);
    setshowMascotaDtoForm(true);
  }

  function onClose() {
    setIsEdit(false);
    showMascotaForm && setshowMascotaForm(false);
    showClienteCard && setshowClienteCard(false);
    showClienteForm && setShowClienteForm(false);
    showMascotaDtoForm && setshowMascotaDtoForm(false);
  }

  async function handleDelete(clienteId: string) {
    const result = await deleteClienteAction(clienteId);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  async function handleDeleteMascota(mascotaId: string) {
    const result = await deleteMascotaAction(mascotaId);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <>
      <section className="relative py-16 bg-blueGray-50">
        <div className="w-full mb-12 px-4">
          <div
            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded 
              bg-white text-detail-0"
          >
            <div className="mb-0 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relativ px-4 flex-grow flex-1 ">
                  <h3 className="font-semibold text-3xl text-detail-0">
                    Mis Clientes
                  </h3>
                </div>

                <div className="flex mx-4 justify-end border rounded-full border-detail-0 hover:bg-detail-0">
                  <button
                    className="w-full px-4 font-semibold text-xl text-detail-0 hover:text-white"
                    onClick={() => handleEdit(false, null)}
                  >
                    Nuevo Cliente
                  </button>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto ">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-detail-0 text-white border-detail-0">
                      Nombre
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-detail-0 text-white border-detail-0">
                      Apellidos
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-detail-0 text-white border-detail-0">
                      Telefono
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-detail-0 text-white border-detail-0">
                      Segundo Contacto
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-detail-0 text-white border-detail-0">
                      Mascotas
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-detail-0 text-white border-detail-0">
                      Administrar
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {clientes.map((cliente, index) => (
                    <tr
                      className={`hover:bg-background-25 ${
                        oddLine(index) ? 'bg-background-0' : ''
                      }`}
                      key={cliente.id}
                    >
                      <th
                        className="border-t-0 px-8 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-left font-bold flex items-center cursor-pointer"
                        onClick={() => openClienteCard(cliente.id)}
                      >
                        {stringToUppercase(cliente.name, true)}
                      </th>
                      <td className="border-t-0 px-8 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 font-semibold">
                        {truncateText(
                          stringToUppercase(cliente.last_name, true),
                          12
                        )}
                      </td>
                      <td className="border-t-0 px-8 text-black align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 font-semibold">
                        {cliente.phone}
                      </td>
                      <td className="border-t-0 px-8 text-black align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 font-semibold">
                        {cliente.sec_phone}
                      </td>
                      <td
                        className="border-t-0 px-8 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 font-semibold cursor-pointer"
                        onClick={() => openClienteCard(cliente.id)}
                      >
                        {truncateText(listMascotas(cliente.pets, cliente), 16)}
                      </td>
                      <td className="flex gap-6 border-t-0 px-8 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 font-semibold">
                        <EditIcon
                          onClick={() => handleEdit(true, cliente.id)}
                        />
                        <PawIcon onClick={() => openMascotaForm(cliente.id)} />
                        <TrashIcon onClick={() => handleDelete(cliente.id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {showMascotaForm && (
        <ReModal
          title={'Añadir nueva mascota'}
          onClose={onClose}
          showModal={showMascotaForm}
        >
          <MascotaForm cliente={selectedCliente} redirectTo="/clientes" />
        </ReModal>
      )}
      {showMascotaDtoForm && (
        <ReModal
          title={'Editar Mascota'}
          onClose={onClose}
          showModal={showMascotaDtoForm}
        >
          <MascotaDtoForm mascotaDto={selectedMascotaDto} onClose={onClose} />
        </ReModal>
      )}
      {showClienteCard && (
        <ReModal
          title={'Editar Cliente'}
          onClose={onClose}
          showModal={showClienteCard}
        >
          <ClienteCard
            cliente={selectedCliente}
            onEdit={handleEdit}
            onEditMascota={handleMascotaDtoEdit}
          />
        </ReModal>
      )}
      {showClienteForm && (
        <ReModal
          title={'Editar Cliente'}
          onClose={onClose}
          showModal={showClienteForm}
        >
          <ClienteForm
            cliente={selectedCliente}
            isEdit={isEdit}
            onClose={onClose}
          />
        </ReModal>
      )}
    </>
  );
}
