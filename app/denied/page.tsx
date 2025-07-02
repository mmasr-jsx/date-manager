import WarningIcon from '../_components/icons/WarningIcon';

export default function Page() {
  return (
    <>
      <div className="w-3/5 flex flex-col items-center mx-auto mt-44 text-center">
        <span className="text-9xl">Acceso denegado</span>
        <span className="text-5xl mt-24 text-center">
          Esta url no existe o no tienes permisos para navegar a ella
        </span>
        <span className="text-5xl mt-12 text-center">
          por favor revisa tus credenciales
        </span>
      </div>
      <div className="w-3/5 flex items-center ml-auto">
        <WarningIcon
          width={'25%'}
          height={'25%'}
          stroke="#FFFFFF"
          fill="#EF4444"
        />
      </div>
    </>
  );
}
