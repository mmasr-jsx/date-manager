'use client';

import '../../styles/modal.css';
import '../../styles/global.css';
import Image from 'next/image';
import cardImage from '../../public/Freya_logo.png';
import { stringToUppercase, formatPhone, getPetSize } from '../_utils/utils';
import { MascotaDto } from '../_model/MascotaDto';
import EditIcon from './icons/EditIcon';
import UserIcon from './icons/UserIcon';
import PhoneIcon from './icons/PhoneIcon';
import MoneyIcon from './icons/MoneyIcon';
import DogIcon from './icons/DogIcon';
import WarningIcon from './icons/WarningIcon';

interface Props {
  pet: MascotaDto;
  onEdit: () => void;
}

export default function MascotaDtoCard({ pet, onEdit }: Props) {
  const petSize = getPetSize(pet.size);

  return (
    <>
      <div className=" flex-1 max-w-sm rounded overflow-hidden shadow-lg">
        <div className="relative">
          <Image
            className="w-full clippy h-1/4"
            src={cardImage}
            alt="Sunset in the mountains"
          />
          <div className="absolute bottom-0 right-0 mb-6 mr-6 rounded-full h-16 w-16 flex items-center bg-background-150 justify-center text-4xl text-white shadow-2xl font-bold">
            <EditIcon onClick={onEdit} />
          </div>
          <div className="contenedor">
            <div className="fondo-arco"></div>
          </div>
        </div>
        <div className="pt-3 pb-5 px-5 flex flex-col items-center">
          <p className="font-bold text-3xl text-background-50">
            {pet.name ? stringToUppercase(pet.name) : ''}
          </p>
          <p className="mb-2 font-semibold text-background-50 text-xl">
            {pet.breed ? stringToUppercase(pet.breed) : ''}
          </p>
        </div>
      </div>
      <div className="flex-1 rounded shadow-lg px-5 h-full">
        <div className="flex font-bold text-2xl items-center justify-center h-12 text-white bg-background-50 rounded-xl shadow-md">
          <h2>Datos del Cliente</h2>
        </div>
        <div className="pt-5 pl-8">
          <div className="flex text-black font-semibold text-xl items-center ">
            <UserIcon />
            <p className="ps-4">
              Dueño: {pet.owner ? stringToUppercase(pet.owner) : ''}
            </p>
          </div>
          <div className="flex text-black font-semibold text-xl items-center">
            <PhoneIcon />
            <p className="ps-4">
              Telefono: {pet.phone ? formatPhone(Number(pet.phone)) : ''}
            </p>
          </div>
          <div className="flex text-black font-semibold text-xl items-center">
            <MoneyIcon />
            <p className="ps-4">Último trabajo a {pet.prize} €</p>
          </div>
          <div className="flex text-black font-semibold text-xl items-center">
            <DogIcon fill="#388585" />
            <p className="ps-4">Tamaño {petSize}</p>
          </div>
        </div>
        <div className="flex font-bold text-2xl items-center justify-center h-12 mt-4 text-white bg-background-50 rounded-xl shadow-md">
          <h2 className="mr-4">Notas</h2>
          {pet.warning ? <WarningIcon fill="#FBBF24" /> : null}
        </div>

        <div className="text-black font-semibold text-xl  min-h-48 shadow-2xl">
          <p className="py-4 px-8">
            {pet.description ? stringToUppercase(pet.description) : ''}
          </p>
        </div>
      </div>
    </>
  );
}
