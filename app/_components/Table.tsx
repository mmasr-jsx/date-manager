"use client";

import { useState } from "react";
import MascotaModal from "./MascotaModal";
import { Mascota } from "../_model/Pets";

export default function Table() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPet, setSelectedPet] = useState({} as Mascota);
  const [isHovered, setIsHovered] = useState(false);

  function openDialog(pet) {
    setSelectedPet((c) => (c = pet));
    setShowDialog(true);
  }

  function onClose() {
    setShowDialog(false);
    console.log("on close");
  }

  function onOk() {
    console.log("Ok clicked");
  }

  const mascotas = [
    {
      id: 1,
      name: "Freya",
      owner: "Maika",
      phone: 666554433,
      race: "caniche gigange",
      prize: 80,
      warning: false,
      description: "casi tan prizesa como la dana",
    },
    {
      id: 2,
      name: "Dana",
      owner: "Mariete primero ensunombre",
      phone: 666554433,
      race: "Puta ama",
      prize: 10,
      warning: false,
      description: "La mas mejor",
    },
    {
      id: 3,
      name: "Oso",
      owner: "Almu",
      phone: 666554433,
      race: "Greasly",
      prize: 80,
      warning: false,
      description:
        "TLaboris tempor aliquip velit laborum amet voluptate aute. Adipisicing elit in anim occaecat tempor. Lorem dolor id ex dolor do consequat. Quis fugiat ullamco laboris sunt ullamco. Fugiat nisi laborum occaecat ad aute dolor nisi magna dolore irure nostrud nostrud velit.",
    },
    {
      id: 4,
      name: "Alana",
      owner: "Carmen",
      phone: 666554433,
      race: "Cosa peluda",
      prize: 70,
      warning: true,
      description:
        "TLaboris tempor aliquip velit laborum amet voluptate aute. Adipisicing elit in anim occaecat tempor.",
    },
    {
      id: 5,
      name: "Cuca",
      owner: "Cristina cabrera mas",
      phone: 666554433,
      race: "Bolita",
      prize: 180,
      warning: false,
      description: "Tia antisocial del carallo",
    },
  ];

  const mouseEnter = () => {
    setIsHovered(true);
  };

  const mouseLeave = () => {
    setIsHovered(false);
  };

  function truncateText(text, num) {
    if (text.length > 10) {
      text = text.substring(0, num) + "...";
    }
    return text;
  }

  function oddLine(num) {
    var res = num % 2;

    return res === 0 ? false : true;
  }

  return (
    <>
      <section className="relative py-16 bg-blueGray-50">
        <div className="w-full mb-12 px-4">
          <div
            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded 
          bg-white text-background-50"
          >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relativ px-4 flex-grow flex-1 ">
                  <h3 className="font-semibold text-2xl text-background-50">
                    Mis Clientes
                  </h3>
                </div>
                {isHovered ? (
                  <div className="flex px-4 mx-4 justify-end border rounded-full border-background-50 bg-background-50">
                    <button
                      className="font-semibold text-lg text-white"
                      onMouseEnter={mouseEnter}
                      onMouseLeave={mouseLeave}
                      onClick={() => console.log("clickeo")}
                    >
                      Nueva Mascota
                    </button>
                  </div>
                ) : (
                  <div className="flex px-4 mx-4 justify-end border rounded-full border-background-50">
                    <button
                      className="font-semibold text-lg text-background-50"
                      onMouseEnter={mouseEnter}
                      onMouseLeave={mouseLeave}
                      onClick={() => console.log("clickeo")}
                    >
                      Nueva Mascota
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="block w-full overflow-x-auto ">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      Mascota
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      Dueño
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      Telefono
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      Raza
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      prize
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      warning
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-background-50 text-white border-background-100">
                      Decripcion
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {mascotas.map((mascota, index) => (
                    <tr
                      className={`${oddLine(index) ? "bg-background-0" : ""}`}
                      key={mascota.id}
                    >
                      <th className="border-t-0 px-8 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left font-bold flex items-center">
                        {mascota.name}
                      </th>
                      <td className="border-t-0 px-8 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 font-semibold">
                        {truncateText(mascota.owner, 8)}
                      </td>
                      <td className="border-t-0 px-8 text-black align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 font-semibold">
                        {mascota.phone}
                      </td>
                      <td className="border-t-0 px-8 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 font-semibold">
                        {mascota.race}
                      </td>
                      <td className="border-t-0 px-8 text-black align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 font-semibold">
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
                      <td className="border-t-0 px-8 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 font-semibold">
                        <button onClick={() => openDialog(mascota)}>
                          {truncateText(mascota.description, 10)}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {showDialog && (
        <MascotaModal
          onClose={onClose}
          showDialog={showDialog}
          pet={selectedPet}
        />
      )}
    </>
  );
}
