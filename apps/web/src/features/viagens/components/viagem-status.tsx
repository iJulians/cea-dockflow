
import { Badge } from '@/components/ui/badge';
import type { ViagemStatus } from '@/mocks/viagens';

const statusConfig: Record<
  ViagemStatus,
  { label: string; className: string }
> = {
  AGUARDANDO: {
    label: 'Aguardando',
    className: 'bg-amber-100 text-amber-800 hover:bg-amber-100',
  },
  EM_TRANSITO: {
    label: 'Em trânsito',
    className: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  },
  CONCLUIDA: {
    label: 'Concluída',
    className: 'bg-green-100 text-green-800 hover:bg-green-100',
  },
  CANCELADA: {
    label: 'Cancelada',
    className: 'bg-red-100 text-red-800 hover:bg-red-100',
  },
};

export function ViagemStatusBadge({
  status,
}: {
  status: ViagemStatus;
}) {
  const config = statusConfig[status];

  return (
    <Badge variant="secondary" className={config.className}>
      {config.label}
    </Badge>
  );
}
