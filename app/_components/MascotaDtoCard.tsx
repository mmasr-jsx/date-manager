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
import { useEffect, useState } from 'react';

interface Props {
  mascotaDto: MascotaDto;
  onEdit: () => void;
}

export default function MascotaDtoCard({
  mascotaDto: initialMascotaDto,
  onEdit,
}: Props) {
  const [mascotaDto, setMascotaDto] = useState(initialMascotaDto);
  const mascotaDtoSize = getPetSize(mascotaDto.size);

  useEffect(() => {
    setMascotaDto(initialMascotaDto);
  }, [initialMascotaDto]);

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
            <EditIcon onClick={onEdit} />
          </div>
          <div className="contenedor">
            <div className="fondo-arco"></div>
          </div>
        </div>
        <div className="pt-3 pb-5 px-5 flex flex-col items-center">
          <p className="font-bold text-3xl text-detail-0">
            {mascotaDto.name ? stringToUppercase(mascotaDto.name) : ''}
          </p>
          <p className="mb-2 font-semibold text-detail-0 text-xl">
            {mascotaDto.breed ? stringToUppercase(mascotaDto.breed) : ''}
          </p>
        </div>
      </div>
      <div className="flex-1 rounded shadow-lg px-5 h-full">
        <div className="flex font-bold text-2xl items-center justify-center h-12 text-white bg-detail-0 rounded-xl shadow-md">
          <h2>Datos del Cliente</h2>
        </div>
        <div className="pt-5 pl-8">
          <div className="flex text-black font-semibold text-xl items-center ">
            <UserIcon />
            <p className="ps-4">
              Dueño:{' '}
              {mascotaDto.owner ? stringToUppercase(mascotaDto.owner) : ''}
            </p>
          </div>
          <div className="flex text-black font-semibold text-xl items-center">
            <PhoneIcon />
            <p className="ps-4">
              Telefono:{' '}
              {mascotaDto.phone ? formatPhone(Number(mascotaDto.phone)) : ''}
            </p>
          </div>
          <div className="flex text-black font-semibold text-xl items-center">
            <MoneyIcon />
            <p className="ps-4">Último trabajo a {mascotaDto.prize} €</p>
          </div>
          <div className="flex text-black font-semibold text-xl items-center">
            <DogIcon fill="#388585" />
            <p className="ps-4">Tamaño {mascotaDtoSize}</p>
          </div>
        </div>
        <div className="flex font-bold text-2xl items-center justify-center h-12 mt-4 text-white bg-detail-0 rounded-xl shadow-md">
          <h2 className="mr-4">Notas</h2>
          {mascotaDto.warning ? <WarningIcon fill="#FBBF24" /> : null}
        </div>

        <div className="text-black font-semibold text-xl  min-h-48 shadow-2xl">
          <p className="py-4 px-8">
            {mascotaDto.description
              ? stringToUppercase(mascotaDto.description)
              : ''}
          </p>
        </div>
      </div>
    </>
  );
}
