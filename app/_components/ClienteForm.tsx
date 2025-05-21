'use client';

import { Cliente } from '../_model/Cliente';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { createClienteAction } from '../_actions/clienteActions';
import { SubmitButton } from './SubmitButton';

interface Props {
  cliente?: Cliente;
}

const initialState = {
  message: '',
  success: false,
};

interface FormState {
  message: string;
  success: boolean;
}

export default function ClienteForm({ cliente }: Props) {
  const router = useRouter();
  const [state, formAction] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData): Promise<FormState> => {
      const newCliente: Cliente = {
        name: formData.get('name') as string,
        last_name: formData.get('last_name') as string,
        phone: formData.get('phone') as string,
        sec_phone: formData.get('sec_phone') as string | null,
      };

      const result = await createClienteAction(newCliente);

      if (result.success) {
        router.push('/mascotas');
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
      <form action={formAction} className="pt-4 mx-4 px-12">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="id"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-background-100 focus:outline-none focus:ring-0 focus:border-background-50 peer"
            placeholder=" "
            defaultValue={cliente?.name}
            required
          />
          <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-background-100 peer-focus:dark:text-background-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Nombre
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="last_name"
            id="last_name"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-background-100 focus:outline-none focus:ring-0 focus:border-background-50 peer"
            placeholder=" "
            defaultValue={cliente?.last_name}
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
            defaultValue={cliente?.phone}
            required
          />
          <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-background-100 peer-focus:dark:text-background-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Telefono
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            pattern="[0-9]{3}[0-9]{2}[0-9]{2}[0-9]{2}"
            name="sec_phone"
            id="sec_phone"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-background-100 focus:outline-none focus:ring-0 focus:border-background-50 peer"
            placeholder=" "
            defaultValue={cliente?.sec_phone}
          />
          <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-background-100 peer-focus:dark:text-background-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Segundo contacto
          </label>
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
