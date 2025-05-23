'use client';

import '../../styles/modal.css';
import '../../styles/global.css';
import Image from 'next/image';
import cardImage from '../../public/Freya_logo.png';
import { stringToUppercase, formatPhone, truncateText } from '../_utils/utils';
import { Cliente } from '../_model/Cliente';

interface Props {
  cliente: Cliente;
  onEdit: (isEdit: boolean) => void;
}

export default function ClienteCard({ cliente, onEdit }: Props) {
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
            <svg
              className="feather feather-edit clickable"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => onEdit(true)}
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
          <div className="contenedor">
            <div className="fondo-arco"></div>
          </div>
        </div>
        <div className="pt-3 pb-5 px-5 flex flex-col items-center">
          <p className="font-bold text-3xl text-background-50">
            {cliente.name ? stringToUppercase(cliente.name) : ''}
          </p>
          <p className="mb-2 font-semibold text-background-50 text-xl">
            {cliente.last_name ? stringToUppercase(cliente.last_name) : ''}
          </p>
        </div>
      </div>
      <div className="flex-1 rounded shadow-lg px-5 h-full">
        <div className="flex font-bold text-2xl items-center justify-center h-12 text-white  bg-background-50  rounded-xl shadow-md">
          <h2>Datos del Cliente</h2>
        </div>
        <div className="pt-5 pl-8">
          <div className="flex text-black font-semibold text-xl items-center ">
            <svg
              width="48px"
              height="48px"
              viewBox="-2 1 20 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#56c085"
                d="M5,16h6c1.105,0,2-0.895,2-2V2c0-1.105-0.895-2-2-2H5C3.895,0,3,0.895,3,2v12C3,15.105,3.895,16,5,16z M4,2h8v12H4V2z"
              />
            </svg>
            <p className="ps-4">
              Telefono:{' '}
              {cliente.phone ? formatPhone(Number(cliente.phone)) : ''}
            </p>
          </div>
          <div className="flex text-black font-semibold text-xl items-center">
            <svg
              width="48px"
              height="48px"
              viewBox="-2 1 20 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#388585"
                d="M5,16h6c1.105,0,2-0.895,2-2V2c0-1.105-0.895-2-2-2H5C3.895,0,3,0.895,3,2v12C3,15.105,3.895,16,5,16z M4,2h8v12H4V2z"
              />
            </svg>
            <p className="ps-4">
              Otro contacto:{' '}
              {cliente.sec_phone ? formatPhone(Number(cliente.sec_phone)) : ''}
            </p>
          </div>
        </div>
        <div className="flex font-bold text-2xl items-center justify-center h-12 text-white bg-background-50 rounded-xl shadow-md mt-4">
          <h2>Peludos del Cliente</h2>
          <svg
            width="48px"
            height="48px"
            viewBox="0 9 36 14.92"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs></defs>
            <g id="dog">
              <path
                fill="#FFFFFF"
                d="M29 7h-2.37a4.24 4.24 0 0 0-2.31-1.95A4.13 4.13 0 0 0 23 4.84V3a1 1 0 0 0-1-1h-1.29a3.36 3.36 0 0 0-3.2 2.3l-.44 1.33-1.3 3.26A9.54 9.54 0 0 1 14 11.72l-3.75 4.17a1 1 0 1 0 1.48 1.33l3.75-4.16a11.41 11.41 0 0 0 2.13-3.43L19 6.32l.46-1.39A1.38 1.38 0 0 1 20.71 4H21v2a1 1 0 0 0 1.31 1 2.22 2.22 0 0 1 1.37 0 2.38 2.38 0 0 1 1.38 1.39A1 1 0 0 0 26 9h2v1.63A1.37 1.37 0 0 1 26.63 12H24a1 1 0 0 0-.86.49 1 1 0 0 0 0 1 7.55 7.55 0 0 1 .86 2.64 8.06 8.06 0 0 1-.89 4.78.94.94 0 0 0-.12.47 4.45 4.45 0 0 0 .08.81 4.7 4.7 0 0 0 .25.78l2.15 5h-1.85L21 22.76V20a1 1 0 0 0-2 0v3a1 1 0 0 0 .11.45L21.38 28H20v-.67a3.32 3.32 0 0 0-2-3V24a4 4 0 0 0-4-4 1 1 0 0 0 0 2 2 2 0 0 1 2 2h-2a1 1 0 0 0 0 2h2.67A1.34 1.34 0 0 1 18 27.33V28h-3.46a4.71 4.71 0 0 1-4.23-2.61l-.06-.12a6.71 6.71 0 0 1-.62-4.11 3.82 3.82 0 0 1 .09-.44 1 1 0 0 0-.36-1v-.17a8 8 0 0 1-.74-4.94L9 12.16A1 1 0 0 0 7.73 11 7.81 7.81 0 0 0 2 19a6.32 6.32 0 0 0 2.4 4.8A6.07 6.07 0 0 0 8 25a8.81 8.81 0 0 0 .47 1.16l.06.12a6.71 6.71 0 0 0 6 3.72H27a1 1 0 0 0 .92-1.39l-2.76-6.43a2.91 2.91 0 0 1-.12-.39v-.19a9.84 9.84 0 0 0 1-5.73 10 10 0 0 0-.5-1.87h1.09A3.37 3.37 0 0 0 30 10.63V8a1 1 0 0 0-1-1zM5.6 22.2A4.34 4.34 0 0 1 4 18.94a6 6 0 0 1 .85-3.41 5.67 5.67 0 0 1 1.86-1.86l-.1.61a10 10 0 0 0 .92 6.17 1.06 1.06 0 0 0 .16.21v.18a9 9 0 0 0-.1 2.16 4 4 0 0 1-1.99-.8z"
              />
              <path fill="#FFFFFF" d="M24 9a1 1 0 0 0-1-1 1 1 0 1 0 1 1z" />
            </g>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {cliente.pets ? (
            cliente.pets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => console.log(pet)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-background-50">
                    {stringToUppercase(pet.name)}
                  </h3>
                  {pet.warning && (
                    <span
                      className="text-2xl"
                      title="Requiere atención especial"
                    >
                      🚨
                    </span>
                  )}
                </div>
                <div className="text-gray-600">
                  <p className="mb-1">
                    <span className="font-medium">Raza:</span>{' '}
                    {stringToUppercase(pet.breed)}
                  </p>
                  {pet.description && (
                    <p className="text-sm text-gray-500 mt-2 italic">
                      "{truncateText(pet.description, 50)}"
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No hay mascotas registradas</p>
          )}
        </div>
      </div>
    </>
  );
}
