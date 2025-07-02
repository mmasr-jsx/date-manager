'use client';

import '../../styles/modal.css';
import '../../styles/global.css';
import Image from 'next/image';
import cardImage from '../../public/Freya_logo.png';
import { stringToUppercase, formatPhone } from '../_utils/utils';
import { Cliente } from '../_model/Cliente';
import SlimMascotaCard from './SlimMascotaCard';
import PhoneIcon from './icons/PhoneIcon';
import DogIcon from './icons/DogIcon';
import EditIcon from './icons/EditIcon';
import { MascotaDto } from '../_model/MascotaDto';
import { deleteMascotaAction } from '../_actions/mascotasActions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ReModal from './ReModal';
import MascotaDtoForm from './MascotaDtoForm';

interface Props {
  cliente: Cliente;
  onEdit: (isEdit: boolean, clienteId: string) => void;
  onEditMascota: (mascotaDto: MascotaDto) => void;
}

export default function ClienteCard({
  cliente: initialCliente,
  onEdit,
  onEditMascota,
}: Props) {
  const router = useRouter();
  const [cliente, setCliente] = useState(initialCliente);
  const [showMascotaDtoForm, setshowMascotaDtoForm] = useState(false);

  useEffect(() => {
    setCliente(initialCliente);
  }, [initialCliente]);

  async function handleDeleteMascota(mascotaId: string) {
    const result = await deleteMascotaAction(mascotaId);
    if (result.success) {
      toast.success(result.message);
      setCliente((prevCliente) => ({
        ...prevCliente,
        pets: prevCliente.pets.filter((pet) => pet.id !== mascotaId),
      }));
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  function onClose() {
    showMascotaDtoForm && setshowMascotaDtoForm(false);
  }

  return (
    <>
      <div className=" flex-1 max-w-sm rounded overflow-hidden shadow-lg">
        <div className="relative">
          <Image
            className="w-full clippy h-1/4"
            src={cardImage}
            alt="Sunset in the mountains"
          />
          <div className="absolute bottom-0 right-0 mb-6 mr-6 rounded-full h-16 w-16 flex items-center bg-detail-0 justify-center text-4xl text-white shadow-2xl font-bold">
            <EditIcon onClick={() => onEdit(true, cliente.id)} />
          </div>
          <div className="contenedor">
            <div className="fondo-arco"></div>
          </div>
        </div>
        <div className="pt-3 pb-5 px-5 flex flex-col items-center">
          <p className="font-bold text-3xl text-detail-0">
            {cliente.name ? stringToUppercase(cliente.name) : ''}
          </p>
          <p className="mb-2 font-semibold text-detail-0 text-xl">
            {cliente.last_name ? stringToUppercase(cliente.last_name) : ''}
          </p>
        </div>
      </div>
      <div className="flex-1 rounded shadow-lg px-5 h-full">
        <div className="flex font-bold text-2xl items-center justify-center h-12 text-white  bg-detail-0  rounded-xl shadow-md">
          <h2>Datos del Cliente</h2>
        </div>
        <div className="pt-5 pl-8">
          <div className="flex text-black font-semibold text-xl items-center ">
            <PhoneIcon fill="#56c085" />
            <p className="ps-4">
              Telefono:{' '}
              {cliente.phone ? formatPhone(Number(cliente.phone)) : ''}
            </p>
          </div>
          <div className="flex text-black font-semibold text-xl items-center">
            <PhoneIcon fill="#388585" />

            <p className="ps-4">
              Otro contacto:{' '}
              {cliente.sec_phone ? formatPhone(Number(cliente.sec_phone)) : ''}
            </p>
          </div>
        </div>
        <div className="flex font-bold text-2xl items-center justify-center h-12 text-white bg-detail-0 rounded-xl shadow-md mt-4 gap-4">
          <h2>Peludos del Cliente</h2>
          <DogIcon fill="#ffff" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {cliente.pets && cliente.pets.length > 0 ? (
            cliente.pets.map((pet) => (
              <SlimMascotaCard
                key={pet.id}
                mascota={pet}
                cliente={cliente}
                onEdit={onEditMascota}
                onDelete={handleDeleteMascota}
              />
            ))
          ) : (
            <p className="text-gray-500 italic">No hay mascotas registradas</p>
          )}
        </div>
      </div>
      {showMascotaDtoForm && (
        <ReModal
          title={'Editar Mascota'}
          onClose={onClose}
          showModal={showMascotaDtoForm}
        >
          <MascotaDtoForm mascotaDto={selectedMascotaDto} onClose={onClose} />
        </ReModal>
      )}
    </>
  );
}
