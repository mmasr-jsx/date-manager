'use client';

import { useFormStatus } from 'react-dom';

interface Props {
  children?: React.ReactNode;
}

export function SubmitButton({ children }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="min-w-4/12 text-white bg-background-50 hover:bg-background-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-background-100 dark:hover:bg-background-50 dark:focus:ring-background-50"
      disabled={pending}
    >
      {pending ? 'Añadiendo...' : children || 'Añadir'}
    </button>
  );
}
