import { Cliente } from '../_model/Cliente';
import { Mascota } from '../_model/Mascota';
import { MascotaDto } from '../_model/MascotaDto';
import { stringToUppercase, truncateText } from '../_utils/utils';
import { toMascotaDto } from '../_utils/clientesUtils';
import WarningIcon from './icons/WarningIcon';
import EditIcon from './icons/EditIcon';
import TrashIcon from './icons/TrashIcon';

interface Props {
  mascota: Mascota;
  cliente: Cliente;
  onEdit: (mascotaDto: MascotaDto) => void;
  onDelete: (mascotaId: string) => void;
}

export default function SlimMascotaCard({
  mascota,
  cliente,
  onEdit,
  onDelete,
}: Props) {
  const mascotaDto = toMascotaDto(mascota, cliente);
  return (
    <div
      key={mascota.id}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-center justify-between mb-2">
        {mascota.warning && (
          <span className="text-2xl" title="Requiere atención especial">
            <WarningIcon fill="#FBBF24" />
          </span>
        )}
        <h3 className="text-xl font-semibold text-detail-0">
          {stringToUppercase(mascota.name)}
        </h3>
        <div className="flex items-center gap-2">
          <EditIcon stroke="#388585" onClick={() => onEdit(mascotaDto)} />
          <TrashIcon onClick={() => onDelete(mascota.id)} />
        </div>
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
