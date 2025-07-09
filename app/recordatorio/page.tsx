import { getTomorrowCitasAction } from '../_actions/citasActions';
import Link from 'next/link';
import PhoneIcon from '../_components/icons/PhoneIcon';
import { stringToUppercase } from '../_utils/utils';

export default async function RecordatorioPage() {
  const tomorrowCitas = await getTomorrowCitasAction();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-background-0 dark:bg-gray-900">
      <span className="bg-white rounded-md w-auto m-5 shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white my-6 mx-6">
          Recordatorios para Mañana
        </h1>
      </span>
      {tomorrowCitas.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No hay citas programadas para mañana.
        </p>
      ) : (
        <div className="w-full max-w-4xl">
          {tomorrowCitas.map((cita) => (
            <div
              key={cita.id!.toString()}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center transform transition-transform duration-200 hover:scale-[1.01]"
            >
              <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Mascota: {cita.mascotaName}
                  </h2>
                  <div className="flex items-end">
                    <input
                      style={{
                        minWidth: '25px',
                        minHeight: '20px',
                      }}
                      type="checkbox"
                    />
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Cliente: {cita.clientName}
                </p>
                <p className="text-gray-700 dark:text-gray-300 flex items-center">
                  <PhoneIcon className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400 font-semibold" />
                  <Link
                    href={`tel:${cita.clientPhone}`}
                    className="hover:underline"
                  >
                    {cita.clientPhone?.toString()}
                  </Link>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Hora:{' '}
                  {new Date(cita.startTime).toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                    timeZone: 'UTC',
                  })}
                  {' - '}
                  {cita.endTime &&
                    new Date(cita.endTime).toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                      timeZone: 'UTC',
                    })}
                </p>
                {cita.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-base mt-2">
                    {stringToUppercase(cita.description)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
