'use client';

import { redirect } from 'next/navigation';
import { MascotaDto } from '../_model/MascotaDto';
import { useActionState } from 'react';
import { createMascotaAction } from '../_actions/mascotasActions';
import { Mascota } from '../_model/Mascota';
import updateDtoAction from '../_actions/dtoActions';
import { SubmitButton } from './SubmitButton';

interface Props {
  pet: MascotaDto;
}

const initialState = {
  message: '',
  success: false,
};

interface FormState {
  message: string;
  success: boolean;
}

export default function MascotaForm({ pet }: Props) {
  const [state, formAction] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData): Promise<FormState> => {
      const mascotaDto: MascotaDto = {
        ...pet,
        name: formData.get('name') as string,
        owner: formData.get('owner') as string,
        owner_lastName: formData.get('owner_lastName') as string,
        phone: parseInt(formData.get('phone') as string),
        sec_phone: parseInt(formData.get('sec_phone') as string),
        breed: formData.get('breed') as string,
        size: formData.get('size') as string,
        prize: parseInt(formData.get('prize') as string),
        warning: formData.get('warning') === 'on',
        description: formData.get('description') as string,
      };

      const result = await updateDtoAction(mascotaDto);

      if (result.success) {
        redirect('/mascotas');
      }

      return {
        message: result.message,
        success: result.success,
      };
    },
    initialState
  );

  return (
    <div className="w-full shadow-2xl">
      <form action={formAction} className="pt-4 mx-4">
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
            type="text"
            name="owner_lastName"
            id="owner_lastName"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-background-100 focus:outline-none focus:ring-0 focus:border-background-50 peer"
            placeholder=" "
            defaultValue={pet.owner_lastName}
            required
          />
          <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-background-100 peer-focus:dark:text-background-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Apellidos
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
            Mascota
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
              {pet.size === 'l' ? (
                <option value="l" defaultValue={'l'}>
                  Grande
                </option>
              ) : (
                <option value="l" className="text-lg text-gray-900">
                  Grande
                </option>
              )}
              {pet.size === 'm' ? (
                <option value="m" defaultValue={'m'}>
                  Mediano
                </option>
              ) : (
                <option value="m">Mediano</option>
              )}
              {pet.size === 's' ? (
                <option value="s" defaultValue={'s'}>
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

        {state?.message && (
          <div
            className={`mb-4 px-4 py-2 rounded text-center ${
              state.success
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {state.message}
          </div>
        )}

        <div className="flex relative z-0 w-full mb-5 group flex-row-reverse">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
