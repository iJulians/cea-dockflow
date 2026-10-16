
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Truck, MapPin, UserRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { ViagemStatus } from '@/mocks/viagens';
import { useViagensStore } from './viagens.store';
import { ViagemStatusBadge } from './components/viagem-status';

export function ViagemDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const viagem = useViagensStore((state) =>
    state.viagens.find((item) => item.id === id)
  );

  const atualizarStatus = useViagensStore(
    (state) => state.atualizarStatus
  );

  if (!viagem) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Viagem não encontrada</h1>
        <Button onClick={() => navigate('/viagens')}>
          Voltar às viagens
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate('/viagens')}>
        <ArrowLeft className="mr-2 size-4" />
        Voltar
      </Button>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{viagem.codigo}</h1>
          <p className="text-muted-foreground">
            Detalhes e acompanhamento da viagem.
          </p>
        </div>

        <ViagemStatusBadge status={viagem.status} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserRound className="size-5" />
              Motorista
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{viagem.motorista}</p>
            <p className="text-sm text-muted-foreground">
              {viagem.transportadora}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="size-5" />
              Veículo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{viagem.placa}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="size-5" />
              Rota
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{viagem.origem}</p>
            <p className="text-sm text-muted-foreground">até</p>
            <p>{viagem.destino}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Atualizar status</CardTitle>
        </CardHeader>

        <CardContent>
          <Select
            value={viagem.status}
            onValueChange={(value) =>
              atualizarStatus(viagem.id, value as ViagemStatus)
            }
          >
            <SelectTrigger className="w-full max-w-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AGUARDANDO">Aguardando</SelectItem>
              <SelectItem value="EM_TRANSITO">Em trânsito</SelectItem>
              <SelectItem value="CONCLUIDA">Concluída</SelectItem>
              <SelectItem value="CANCELADA">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
}
