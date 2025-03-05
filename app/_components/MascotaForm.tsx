"use client";

import createMascota from "../api/create";
import Form from "next/form";
import { redirect } from "next/navigation";
import { Mascota } from "../_model/Pets";

interface Props {
  pet: Mascota;
}

export default function MascotaForm({ pet }: Props) {
  async function addMascota(formData) {
    const mascota: Mascota = {
      id: 1,
      name: formData.get("name"),
      owner: formData.get("owner"),
      phone: formData.get("phone"),
      breed: formData.get("breed"),
      size: formData.get("size"),
      prize: formData.get("prize"),
      warning: formData.get("warning") ? true : false,
      description: formData.get("description"),
    };

    createMascota(formData);

    redirect("/mascotas");
  }

  return (
    <div className="w-full shadow-2xl mx-12">
      <Form action={addMascota} className="max-w-xl pt-4 mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="owner"
            id="owner"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-background-100 focus:outline-none focus:ring-0 focus:border-background-50 peer"
            placeholder=" "
            defaultValue={pet.owner}
            required
          />
          <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-background-100 peer-focus:dark:text-background-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Cliente
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            pattern="[0-9]{3}[0-9]{2}[0-9]{2}[0-9]{2}"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-background-100 focus:outline-none focus:ring-0 focus:border-background-50 peer"
            placeholder=" "
            defaultValue={pet.phone}
            required
          />
          <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-background-100 peer-focus:dark:text-background-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Telefono cliente (666123456)
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-background-100 focus:outline-none focus:ring-0 focus:border-background-50 peer"
            placeholder=" "
            defaultValue={pet.name}
            required
          />
          <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-background-100 peer-focus:dark:text-background-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Macota
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="breed"
              id="breed"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-background-100 focus:outline-none focus:ring-0 focus:border-background-50 peer"
              placeholder=" "
              defaultValue={pet.breed}
              required
            />
            <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-background-100 peer-focus:dark:text-background-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Raza
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group flex items-center mt-2">
            <label className="text-lg text-gray-500 mr-4">¿Algun riesgo?</label>
            <input type="checkbox" name="warning" id="warning" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="prize"
              id="prize"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 hover:appearance-none dark:text-white dark:border-gray-600 dark:focus:border-background-100 focus:outline-none focus:ring-0 focus:border-background-50 peer"
              placeholder=" "
              defaultValue={pet.prize ? pet.prize : null}
            />
            <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-background-100 peer-focus:dark:text-background-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Precio €
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <select
              name="size"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-background-100 focus:outline-none focus:ring-0 focus:border-background-50 peer"
            >
              {pet.size === "l" ? (
                <option value="l" defaultValue={"l"}>
                  Grande
                </option>
              ) : (
                <option value="l" className="text-lg text-gray-900">
                  Grande
                </option>
              )}
              {pet.size === "m" ? (
                <option value="m" defaultValue={"m"}>
                  Mediano
                </option>
              ) : (
                <option value="m">Mediano</option>
              )}
              {pet.size === "s" ? (
                <option value="s" defaultValue={"s"}>
                  Pequeño
                </option>
              ) : (
                <option value="s">Pequeño</option>
              )}
            </select>
            <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-background-100 peer-focus:dark:text-background-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Tamaño
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-background-100 peer-focus:dark:text-background-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Descripcion
          </label>
          <textarea
            name="description"
            rows={4}
            cols={50}
            defaultValue={pet.description ? pet.description : null}
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-background-100 focus:outline-none focus:ring-0 focus:border-background-50 peer"
          />
        </div>
        <div className="flex relative z-0 w-full mb-5 group flex-row-reverse">
          <button
            type="submit"
            className="w-4/12 text-white bg-background-50 hover:bg-background-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-background-100 dark:hover:bg-background-50 dark:focus:ring-background-50"
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}
