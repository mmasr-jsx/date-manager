'use client';

import { useEffect, useState } from 'react';
import MascotaDtoCard from './MascotaDtoCard';
import { MascotaDto, NewMascotaDto } from '../_model/MascotaDto';
import ReModal from './ReModal';
import {
  getPetSize,
  oddLine,
  truncateText,
  stringToUppercase,
} from '../_utils/utils';
import MascotaDtoForm from './MascotaDtoForm';
import ClienteForm from './ClienteForm';
import { Mascota } from '../_model/Mascota';

interface Props {
  mascotasList: Mascota[];
}

export default function MascotasTable({ mascotasList }: Props) {
  const [showMascotaEditForm, setshowMascotaEditFormForm] = useState(false);
  const [showMascotaCard, setshowMascotaCard] = useState(false);
  const [showMascotaForm, setshowMascotaForm] = useState(false);
  const [showClientForm, setshowClientForm] = useState(false);
  const [mascotas, setMascotas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState({} as MascotaDto);

  useEffect(() => {
    if (mascotasList) {
      setMascotas(mascotasList);
      setIsLoading(false);
    }
  }, [mascotas, mascotasList]);

  function openMascotaCard(pet) {
    setSelectedPet((cur) => (cur = pet));
    setshowMascotaCard(true);
  }

  function openMascotaEditForm() {
    setshowMascotaEditFormForm(true);
  }

  function openMascotaForm(pet) {
    setSelectedPet((cur) => (cur = pet));
    setshowMascotaForm(true);
  }

  function openClientFormModal() {
    console.log('opening cliente modal');
    setshowClientForm(true);
  }

  function onClose() {
    showMascotaEditForm && setshowMascotaEditFormForm(false);
    showMascotaForm && setshowMascotaForm(false);
    showClientForm && setshowClientForm(false);
    showMascotaCard && setshowMascotaCard(false);
  }

  if (isLoading) {
    return <div> Cargando datos, futuro spinner</div>;
  }

  return (
    <>
      <section className="relative py-16 bg-blueGray-50">
        <div className="w-full mb-12 px-4">
          <div
            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded 
          bg-white text-background-50"
          >
            <div className="mb-0 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relativ px-4 flex-grow flex-1 ">
                  <h3 className="font-semibold text-3xl text-background-50">
                    Mis Peludos
                  </h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto ">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      Mascota
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      Dueño
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      Telefono
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      Raza
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      Tamaño
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      prize
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      warning
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      Decripcion
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {mascotas.map((mascota, index) => (
                    <tr
                      className={`cursor-pointer hover:bg-background-25 ${
                        oddLine(index) ? 'bg-background-0' : ''
                      }`}
                      key={mascota.id}
                      onClick={() => openMascotaCard(mascota)}
                    >
                      <th className="border-t-0 px-8 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-left font-bold flex items-center">
                        {truncateText(
                          stringToUppercase(mascota.name, true),
                          12
                        )}
                      </th>
                      <td className="border-t-0 px-8 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 font-semibold">
                        {truncateText(
                          stringToUppercase(
                            [mascota.owner, mascota.owner_lastName].join(' '),
                            true
                          ),
                          12
                        )}
                      </td>
                      <td className="border-t-0 px-8 text-black align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 font-semibold">
                        {mascota.phone}
                      </td>
                      <td className="border-t-0 px-8 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 font-semibold">
                        {truncateText(
                          stringToUppercase(mascota.breed, true),
                          12
                        )}
                      </td>
                      <td className="border-t-0 px-8 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 font-semibold">
                        {getPetSize(mascota.size)}
                      </td>
                      <td className="border-t-0 px-8 text-black align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 font-semibold">
                        {mascota.prize} €
                      </td>
                      <td className="border-t-0 px-8 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right font-semibold">
                        <div className="flex items-center">
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200 max-w-20">
                              {mascota.warning ? (
                                <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 w-full"></div>
                              ) : (
                                <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 w-full"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="border-t-0 px-8 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 font-semibold">
                        {truncateText(mascota.description, 10)}
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
          title={'Añadir nuevo Cliente'}
          onClose={onClose}
          showModal={showMascotaForm}
        >
          <MascotaDtoForm pet={selectedPet} />
        </ReModal>
      )}

      {showMascotaCard && (
        <ReModal
          title={'Detalles de la Mascota'}
          onClose={onClose}
          showModal={showMascotaCard}
        >
          <MascotaDtoCard pet={selectedPet} onEdit={openMascotaEditForm} />
        </ReModal>
      )}

      {showMascotaEditForm && (
        <ReModal
          title={'Detalles de la Mascota'}
          onClose={onClose}
          showModal={showMascotaEditForm}
        >
          <MascotaDtoForm pet={selectedPet} />
        </ReModal>
      )}

      {showClientForm && (
        <ReModal
          title={'Nuevo cliente'}
          onClose={onClose}
          showModal={showClientForm}
        >
          <ClienteForm isEdit={true} onClose={onClose} />
        </ReModal>
      )}
    </>
  );
}
