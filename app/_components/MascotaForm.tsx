'use client';

import { redirect } from 'next/navigation';
import { useActionState } from 'react';
import { createMascotaAction } from '../_actions/mascotasActions';
import { Mascota } from '../_model/Mascota';
import { SubmitButton } from './SubmitButton';
import { Cliente } from '../_model/Cliente';
import { updateClienteAction } from '../_actions/clienteActions';
import { toast } from 'sonner';

interface Props {
  cliente: Cliente;
  redirectTo: string;
}

const initialState = {
  message: '',
  success: false,
};

interface FormState {
  message: string;
  success: boolean;
}

export default function MascotaForm({ cliente, redirectTo }: Props) {
  const [state, formAction] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData): Promise<FormState> => {
      const newMascota: Mascota = {
        name: formData.get('name') as string,
        ownerId: cliente.id,
        breed: formData.get('breed') as string,
        size: formData.get('size') as string,
        prize: parseInt(formData.get('prize') as string),
        warning: formData.get('warning') === 'on',
        description: formData.get('description') as string,
      };

      const result = await createMascotaAction(newMascota);

      if (result.success && result.data) {
        const resultUpdateCliente = await updateClienteAction(
          cliente,
          result.data
        );
        if (resultUpdateCliente.success) {
          toast.success('Mascota añadida correctamente.');
        } else {
          toast.error('Error desconocido al crear o añadir la mascota.');
        }
        redirect(redirectTo);
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
          <p className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600">
            {cliente.name} {cliente.last_name ? cliente.last_name : ''}
          </p>
          <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-detail-0 peer-focus:dark:text-detail-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Cliente
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-detail-0 focus:outline-none focus:ring-0 focus:border-detail-0 peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-detail-0 peer-focus:dark:text-detail-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Nombre Mascota
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="breed"
              id="breed"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-detail-0 focus:outline-none focus:ring-0 focus:border-detail-0 peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-detail-0 peer-focus:dark:text-detail-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Raza
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="prize"
              id="prize"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-detail-0 focus:outline-none focus:ring-0 focus:border-detail-0 peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-detail-0 peer-focus:dark:text-detail-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Precio
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <select
              name="size"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-detail-0 focus:outline-none focus:ring-0 focus:border-detail-0 peer"
              required
            >
              <option value="l">Grande</option>
              <option value="m">Mediano</option>
              <option value="s">Pequeño</option>
            </select>
            <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-detail-0 peer-focus:dark:text-detail-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Tamaño
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group flex items-center mt-2">
            <label className="text-lg text-gray-500 mr-4">¿Algún riesgo?</label>
            <input type="checkbox" name="warning" id="warning" />
          </div>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-detail-0 peer-focus:dark:text-detail-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Descripción
          </label>
          <textarea
            name="description"
            rows={4}
            cols={50}
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-detail-0 focus:outline-none focus:ring-0 focus:border-detail-0 peer"
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
