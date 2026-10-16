
import { Badge } from '@/components/ui/badge';
import type { EntregaStatus } from '@/mocks/entregas';

export const entregaStatusOptions: {
  value: EntregaStatus;
  label: string;
}[] = [
  { value: 'PENDENTE', label: 'Pendente' },
  { value: 'EM_CARREGAMENTO', label: 'Em carregamento' },
  { value: 'EM_TRANSITO', label: 'Em trânsito' },
  { value: 'ENTREGUE', label: 'Entregue' },
  { value: 'CANCELADA', label: 'Cancelada' },
];

const styles: Record<EntregaStatus, string> = {
  PENDENTE: 'bg-amber-100 text-amber-800',
  EM_CARREGAMENTO: 'bg-violet-100 text-violet-800',
  EM_TRANSITO: 'bg-blue-100 text-blue-800',
  ENTREGUE: 'bg-green-100 text-green-800',
  CANCELADA: 'bg-red-100 text-red-800',
};

export function EntregaStatusBadge({
  status,
}: {
  status: EntregaStatus;
}) {
  const label = entregaStatusOptions.find(
    (option) => option.value === status
  )?.label;

  return (
    <Badge variant="secondary" className={styles[status]}>
      {label}
    </Badge>
  );
}
