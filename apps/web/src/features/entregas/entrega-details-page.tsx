
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Truck,
  MapPin,
  UserRound,
  Package,
  CalendarClock,
} from 'lucide-react';

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

import { useViagensStore } from '../viagens/viagens.store';
import { ViagemStatusBadge } from '../viagens/components/viagem-status';

import { useEntregasStore } from '../entregas/entregas.store';
import { EntregaStatusBadge } from '../entregas/components/entrega-status';

export function EntregaDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const viagem = useViagensStore((state) =>
    state.viagens.find((item) => item.id === id)
  );

  const atualizarStatus = useViagensStore().atualizarStatus;

  const entregas = useEntregasStore((state) =>
    state.entregas.filter((entrega) => entrega.viagemId === id)
  );

  if (!viagem) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">
          Viagem não encontrada
        </h1>

        <p className="text-muted-foreground">
          A viagem solicitada não existe ou foi removida.
        </p>

        <Link
          to="/viagens"
          className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ArrowLeft className="mr-2 size-4" />
          Voltar às viagens
        </Link>
      </div>
    );
  }

  const entregasConcluidas = entregas.filter(
    (entrega) => entrega.status === 'ENTREGUE'
  ).length;

  const progresso =
    entregas.length > 0
      ? Math.round((entregasConcluidas / entregas.length) * 100)
      : 0;

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* Cabeçalho */}
      <div className="space-y-4">
        <Link
          to="/viagens"
          className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <ArrowLeft className="mr-2 size-4" />
          Voltar às viagens
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {viagem.codigo}
            </h1>

            <p className="text-sm text-muted-foreground">
              Detalhes e acompanhamento da viagem.
            </p>
          </div>

          <ViagemStatusBadge status={viagem.status} />
        </div>
      </div>

      {/* Informações da viagem */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <UserRound className="size-5 text-muted-foreground" />
              Motorista
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="font-semibold">{viagem.motorista}</p>
            <p className="text-sm text-muted-foreground">
              {viagem.transportadora}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Truck className="size-5 text-muted-foreground" />
              Veículo
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="font-semibold">{viagem.placa}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="size-5 text-muted-foreground" />
              Rota
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="font-medium">{viagem.origem}</p>
            <p className="text-xs text-muted-foreground">até</p>
            <p className="font-medium">{viagem.destino}</p>
          </CardContent>
        </Card>
      </div>

      {/* Resumo das entregas */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <Package className="size-8 text-muted-foreground" />

            <div>
              <p className="text-sm text-muted-foreground">
                Total de entregas
              </p>
              <p className="text-2xl font-bold">
                {entregas.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <Package className="size-8 text-green-600" />

            <div>
              <p className="text-sm text-muted-foreground">
                Entregas concluídas
              </p>
              <p className="text-2xl font-bold">
                {entregasConcluidas}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <CalendarClock className="size-8 text-blue-600" />

            <div>
              <p className="text-sm text-muted-foreground">
                Progresso da viagem
              </p>
              <p className="text-2xl font-bold">
                {progresso}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Entregas vinculadas */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>Entregas vinculadas</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                {entregas.length} entrega(s) nesta viagem
              </p>
            </div>

            <Link
              to="/entregas"
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
                Ver todas as entregas
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          {entregas.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <Package className="mx-auto mb-3 size-8 text-muted-foreground" />

              <p className="font-medium">
                Nenhuma entrega vinculada
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Esta viagem ainda não possui entregas cadastradas.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {entregas.map((entrega) => (
                <div
                  key={entrega.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/40"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="rounded-lg bg-muted p-3">
                      <Package className="size-5 text-muted-foreground" />
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold">
                        {entrega.codigo}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Shipment: {entrega.shipment}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Destino: {entrega.destino}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <EntregaStatusBadge status={entrega.status} />

                    <Link
                      to={`/entregas/${entrega.id}`}
                      className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                        Ver detalhes
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Atualização do status da viagem */}
      <Card>
        <CardHeader>
          <CardTitle>Atualizar status da viagem</CardTitle>
          <p className="text-sm text-muted-foreground">
            Altere o status operacional desta viagem.
          </p>
        </CardHeader>

        <CardContent>
          <Select
            value={viagem.status}
            onValueChange={(value) =>
              atualizarStatus(
                viagem.id,
                value as ViagemStatus
              )
            }
          >
            <SelectTrigger className="w-full max-w-sm">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="AGUARDANDO">
                Aguardando
              </SelectItem>

              <SelectItem value="EM_TRANSITO">
                Em trânsito
              </SelectItem>

              <SelectItem value="CONCLUIDA">
                Concluída
              </SelectItem>

              <SelectItem value="CANCELADA">
                Cancelada
              </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
}
