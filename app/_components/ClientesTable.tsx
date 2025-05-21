'use client';

import { useState } from 'react';
import { listMascotas } from '../_utils/clientesUtils';
import { oddLine, truncateText, stringToUppercase } from '../_utils/utils';
import MascotaForm from './MascotaForm';
import ReModal from './ReModal';
import { Cliente } from '../_model/Cliente';
import ClienteCard from './ClienteCard';
import ClienteForm from './ClienteForm';

interface Props {
  clientes: Cliente[];
}

export default function ClientesTable({ clientes }: Props) {
  const [showMascotaForm, setshowMascotaForm] = useState(false);
  const [showClienteCard, setshowClienteCard] = useState(false);
  const [showClienteForm, setShowClienteForm] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  function openMascotaForm(clienteId) {
    setSelectedCliente(clientes.find((cliente) => cliente.id === clienteId));
    setshowMascotaForm(true);
  }

  function openClienteCard(clienteId) {
    setSelectedCliente(clientes.find((cliente) => cliente.id === clienteId));
    setshowClienteCard(true);
  }

  function openClienteEditForm() {
    setshowClienteCard(false);
    setShowClienteForm(true);
  }

  function onClose() {
    showMascotaForm && setshowMascotaForm(false);
    showClienteCard && setshowClienteCard(false);
    showClienteForm && setShowClienteForm(false);
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
                    Mis Clientes
                  </h3>
                </div>

                <div className="flex mx-4 justify-end border rounded-full border-background-50 hover:bg-background-50">
                  <button
                    className="w-full px-4 font-semibold text-xl text-background-50 hover:text-white"
                    onClick={() => console.log('boton nuevo cliente')}
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
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      Nombre
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      Apellidos
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      Telefono
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      Segundo Contacto
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      Mascotas
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      Añadir Mascota
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {clientes.map((cliente, index) => (
                    <tr
                      className={`${oddLine(index) ? 'bg-background-0' : ''}`}
                      key={cliente.id}
                    >
                      <th
                        className="border-t-0 px-8 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-left font-bold flex items-center"
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
                      <td className="border-t-0 px-8 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 font-semibold">
                        {truncateText(listMascotas(cliente.pets, cliente), 16)}
                      </td>
                      <td className="border-t-0 px-8 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 font-semibold">
                        <div className="flex max-w-40 justify-center border rounded-full border-background-50 hover:bg-background-50">
                          <button
                            className="font-semibold text-lg px-4 text-background-50 hover:text-white w-full"
                            onClick={() => openMascotaForm(cliente.id)}
                          >
                            Nueva Mascota
                          </button>
                        </div>
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
          <MascotaForm cliente={selectedCliente} redirectTo="/clientes" />
        </ReModal>
      )}
      {showClienteCard && (
        <ReModal
          title={'Editar Cliente'}
          onClose={onClose}
          showModal={showClienteCard}
        >
          <ClienteCard cliente={selectedCliente} onEdit={openClienteEditForm} />
        </ReModal>
      )}
      {showClienteForm && (
        <ReModal
          title={'Editar Cliente'}
          onClose={onClose}
          showModal={showClienteForm}
        >
          <ClienteForm cliente={selectedCliente} />
        </ReModal>
      )}
    </>
  );
}
