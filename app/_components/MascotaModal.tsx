"use client";

import "../../styles/modal.css";
import "../../styles/global.css";
import Image from "next/image";
import cardImage from "../../public/Freya_logo.png";
import { stringToUppercase, formatPhone, getPetSize } from "../_utils/utils";
import { Mascota } from "../_model/Pets";

interface Props {
  pet: Mascota;
  onEdit: (pet) => void;
}

export default function MascotaDetails({ pet, onEdit }: Props) {
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
          {/*               
              TO PLAY ADDING SHADOWS TO THE IMG
              <div className="clippy absolute bottom-0 left-0 top-0 right-0 bg-blue-200 bg-opacity-50 p-4 text-white flex flex-col justify-end items-center"></div>
              */}{" "}
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
              onClick={() => onEdit(pet)}
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
            {stringToUppercase(pet.name)}
          </p>
          <p className="mb-2 font-semibold text-background-50 text-xl">
            {stringToUppercase(pet.breed)}
          </p>
        </div>
      </div>
      <div className="flex-1 rounded shadow-lg px-5">
        <div className="flex font-bold text-2xl items-center justify-center h-12 text-white  bg-background-50  rounded-xl shadow-md">
          <h2>Datos del Cliente</h2>
        </div>
        <div className="pt-5 pl-8">
          <div className="flex text-black font-semibold text-xl items-center ">
            <svg
              width="48px"
              height="48px"
              viewBox="0 1 24 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title />
              <circle cx="12" cy="8" fill="#388585" r="4" />
              <path
                d="M20,19v1a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V19a6,6,0,0,1,6-6h4A6,6,0,0,1,20,19Z"
                fill="#388585"
              />
            </svg>
            <p className="ps-4">Dueño: {stringToUppercase(pet.owner)}</p>
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
            <p className="ps-4">Telefono: {formatPhone(pet.phone)}</p>
          </div>
          <div className="flex text-black font-semibold text-xl items-center">
            <svg
              width="48px"
              height="48px"
              viewBox="0 -2 24 14.92"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g data-name="Camada 2" id="Camada_2">
                <g data-name="Camada 1" id="Camada_1-2">
                  <path
                    fill="#388585"
                    d="M23.5,4H22V2.5a.5.5,0,0,0-.5-.5H20V.5a.5.5,0,0,0-.5-.5H.5A.5.5,0,0,0,0,.5v9.91a.5.5,0,0,0,.5.5H2v1.5a.5.5,0,0,0,.5.5H4v1.5a.5.5,0,0,0,.5.5h19a.5.5,0,0,0,.5-.5V4.5A.5.5,0,0,0,23.5,4ZM15.8,9.91H4.2A3.74,3.74,0,0,0,1,6.71V4.2A3.74,3.74,0,0,0,4.2,1H15.8A3.74,3.74,0,0,0,19,4.2V6.71A3.74,3.74,0,0,0,15.8,9.91ZM19,7.71V9.91H16.79A2.76,2.76,0,0,1,19,7.71ZM19,1V3.21A2.76,2.76,0,0,1,16.79,1ZM1,1H3.21A2.76,2.76,0,0,1,1,3.21ZM1,7.71A2.76,2.76,0,0,1,3.21,9.91H1Zm2,3.21H19.5a.5.5,0,0,0,.5-.5V3h1v8.91H3Zm20,3H5v-1H21.5a.5.5,0,0,0,.5-.5V5h1Z"
                  />
                  <path
                    fill="#388585"
                    d="M10,2.06a3.39,3.39,0,1,0,3.39,3.39A3.4,3.4,0,0,0,10,2.06Zm0,5.78a2.39,2.39,0,1,1,2.39-2.39A2.39,2.39,0,0,1,10,7.85Z"
                  />
                </g>
              </g>
            </svg>
            <p className="ps-4">Último trabajo a {pet.prize} €</p>
          </div>
          <div className="flex text-black font-semibold text-xl items-center">
            <svg
              width="48px"
              height="48px"
              viewBox="0 5 36 14.92"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs></defs>
              <g id="dog">
                <path
                  fill="#388585"
                  d="M29 7h-2.37a4.24 4.24 0 0 0-2.31-1.95A4.13 4.13 0 0 0 23 4.84V3a1 1 0 0 0-1-1h-1.29a3.36 3.36 0 0 0-3.2 2.3l-.44 1.33-1.3 3.26A9.54 9.54 0 0 1 14 11.72l-3.75 4.17a1 1 0 1 0 1.48 1.33l3.75-4.16a11.41 11.41 0 0 0 2.13-3.43L19 6.32l.46-1.39A1.38 1.38 0 0 1 20.71 4H21v2a1 1 0 0 0 1.31 1 2.22 2.22 0 0 1 1.37 0 2.38 2.38 0 0 1 1.38 1.39A1 1 0 0 0 26 9h2v1.63A1.37 1.37 0 0 1 26.63 12H24a1 1 0 0 0-.86.49 1 1 0 0 0 0 1 7.55 7.55 0 0 1 .86 2.64 8.06 8.06 0 0 1-.89 4.78.94.94 0 0 0-.12.47 4.45 4.45 0 0 0 .08.81 4.7 4.7 0 0 0 .25.78l2.15 5h-1.85L21 22.76V20a1 1 0 0 0-2 0v3a1 1 0 0 0 .11.45L21.38 28H20v-.67a3.32 3.32 0 0 0-2-3V24a4 4 0 0 0-4-4 1 1 0 0 0 0 2 2 2 0 0 1 2 2h-2a1 1 0 0 0 0 2h2.67A1.34 1.34 0 0 1 18 27.33V28h-3.46a4.71 4.71 0 0 1-4.23-2.61l-.06-.12a6.71 6.71 0 0 1-.62-4.11 3.82 3.82 0 0 1 .09-.44 1 1 0 0 0-.36-1v-.17a8 8 0 0 1-.74-4.94L9 12.16A1 1 0 0 0 7.73 11 7.81 7.81 0 0 0 2 19a6.32 6.32 0 0 0 2.4 4.8A6.07 6.07 0 0 0 8 25a8.81 8.81 0 0 0 .47 1.16l.06.12a6.71 6.71 0 0 0 6 3.72H27a1 1 0 0 0 .92-1.39l-2.76-6.43a2.91 2.91 0 0 1-.12-.39v-.19a9.84 9.84 0 0 0 1-5.73 10 10 0 0 0-.5-1.87h1.09A3.37 3.37 0 0 0 30 10.63V8a1 1 0 0 0-1-1zM5.6 22.2A4.34 4.34 0 0 1 4 18.94a6 6 0 0 1 .85-3.41 5.67 5.67 0 0 1 1.86-1.86l-.1.61a10 10 0 0 0 .92 6.17 1.06 1.06 0 0 0 .16.21v.18a9 9 0 0 0-.1 2.16 4 4 0 0 1-1.99-.8z"
                />
                <path fill="#388585" d="M24 9a1 1 0 0 0-1-1 1 1 0 1 0 1 1z" />
              </g>
            </svg>
            <p className="ps-4">Tamaño {petSize}</p>
          </div>
        </div>
        <div className="flex font-bold text-2xl items-center justify-center h-12 text-white  bg-background-50 shadow-md mt-5 mb-5 rounded-xl">
          <h2 className="mr-4">Notas</h2>
          {pet.warning ? (
            <svg
              width="32px"
              height="32px"
              viewBox="0 0 520 520"
              xmlns="http://www.w3.org/2000/svg"
              className="grid justify-self-end"
            >
              <title />
              <path
                d="M85.57,446.25H426.43a32,32,0,0,0,28.17-47.17L284.18,82.58c-12.09-22.44-44.27-22.44-56.36,0L57.4,399.08A32,32,0,0,0,85.57,446.25Z"
                fill="#FFAF00"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32px"
              />
              <path
                d="M250.26,195.39l5.74,122,5.73-121.95a5.74,5.74,0,0,0-5.79-6h0A5.74,5.74,0,0,0,250.26,195.39Z"
                fill="#FFAF00"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32px"
              />
              <path d="M256,397.25a20,20,0,1,1,20-20A20,20,0,0,1,256,397.25Z" />
            </svg>
          ) : (
            ""
          )}
        </div>

        <div className="text-black font-semibold text-xl  min-h-48 shadow-2xl">
          <p className="py-4 px-8">{stringToUppercase(pet.description)}</p>
        </div>
      </div>
    </>
  );
}
