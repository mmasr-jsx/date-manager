import { Mascota } from '../_model/Mascota';
import { stringToUppercase, truncateText } from '../_utils/utils';

export default function SkimMascotaCard(mascota: Mascota) {
  return (
    <div
      key={mascota.id}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => console.log(mascota)}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold text-background-50">
          {stringToUppercase(mascota.name)}
        </h3>
        {mascota.warning && (
          <span className="text-2xl" title="Requiere atención especial">
            🚨
          </span>
        )}
      </div>
      <div className="text-gray-600">
        <p className="mb-1">
          <span className="font-medium">Raza:</span>{' '}
          {stringToUppercase(mascota.breed)}
        </p>
        {mascota.description && (
          <p className="text-sm text-gray-500 mt-2 italic">
            "{truncateText(mascota.description, 50)}"
          </p>
        )}
      </div>
    </div>
  );
}
