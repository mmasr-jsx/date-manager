"use client";

import "../../styles/modal.css";
import { useRef, useEffect } from "react";
import ReactPortal from "./ReactPortal";
import { Mascota } from "../_model/Pets";
import Image from "next/image";
import cardImage from "../../public/Freya_logo.png";
import userBg from "../../public/userBg.jpg";

type Props = {
  onClose: () => void;
  showDialog: boolean;
  pet: Mascota;
};

export default function MascotaModal({ onClose, showDialog, pet }: Props) {
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  //Close modal on escape key press
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? onClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [onClose]);

  //Disable scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return (): void => {
      document.body.style.overflow = "unset";
    };
  }, [showDialog]);

  if (!showDialog) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <>
        <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-neutral-500 opacity-50" />
        <div className="fixed rounded flex flex-col box-border min-w-fit overflow-hidden p-5 bg-white inset-y-32 inset-x-12 sm:inset-x-24 md:inset-x-1/4 sm:inset-y-1/4 z-50 opacity-100">
          <div className="w-full h-[10%] flex flex-nowrap items-center">
            <div className="flex-1 grid justify-items-end place-items-center px-5">
              <button
                className="py-2 px-4 bg-red-600 hover:bg-red-800 rounded font-semibold text-lg text-white"
                onClick={onClose}
              >
                X
              </button>
            </div>
          </div>
          <div className="w-full flex gap-3">
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
                    className="feather feather-edit"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
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
                  {pet.name}
                </p>
                <p className="mb-2 font-semibold text-background-50 text-xl">
                  {pet.race}
                </p>
              </div>
            </div>
            <div className="flex-1 rounded shadow-lg px-5">
              <div className="flex text-background-50 font-semibold text-xl">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title />
                  <circle cx="12" cy="8" fill="#388585" r="4" />
                  <path
                    d="M20,19v1a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V19a6,6,0,0,1,6-6h4A6,6,0,0,1,20,19Z"
                    fill="#388585"
                  />
                </svg>
                <p className="ps-4">{pet.owner}</p>
              </div>
              <div className="flex text-background-50 font-semibold text-xl">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="-2 0 20 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#388585"
                    d="M5,16h6c1.105,0,2-0.895,2-2V2c0-1.105-0.895-2-2-2H5C3.895,0,3,0.895,3,2v12C3,15.105,3.895,16,5,16z M4,2h8v12H4V2z"
                  />
                </svg>
                <p className="ps-4">{pet.phone}</p>
              </div>
              <div className="flex text-background-50 font-semibold text-xl">
                <svg
                  width="24px"
                  height="24px"
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
                <p className="ps-4">{pet.prize} €</p>
              </div>
              <div className="flex text-background-50 font-semibold text-xl">
                <p className="ps-4">{pet.description}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    </ReactPortal>
  );
}
