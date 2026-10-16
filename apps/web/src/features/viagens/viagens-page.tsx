
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useViagensStore } from './viagens.store';
import { ViagemStatusBadge } from './components/viagem-status';
import { NovaViagemDialog } from './components/nova-viagem-dialog';

export function ViagensPage() {
  const viagens = useViagensStore((state) => state.viagens);

  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState('TODOS');
  const [dialogAberto, setDialogAberto] = useState(false);

  const viagensFiltradas = useMemo(() => {
    return viagens.filter((viagem) => {
      const termo = busca.toLowerCase().trim();

      const correspondeBusca = [
        viagem.codigo,
        viagem.motorista,
        viagem.transportadora,
        viagem.placa,
      ].some((valor) => valor.toLowerCase().includes(termo));

      const correspondeStatus =
        status === 'TODOS' || viagem.status === status;

      return correspondeBusca && correspondeStatus;
    });
  }, [viagens, busca, status]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Viagens
          </h1>
          <p className="text-muted-foreground">
            Gerencie e acompanhe as viagens logísticas.
          </p>
        </div>

        <Button onClick={() => setDialogAberto(true)}>
          <Plus className="mr-2 size-4" />
          Nova viagem
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Viagens cadastradas</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative min-w-60 flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar viagem, motorista ou placa..."
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                className="pl-9"
              />
            </div>

            <Select
              value={status}
              onValueChange={(value) => setStatus(value ?? 'TODOS')}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TODOS">Todos os status</SelectItem>
                <SelectItem value="AGUARDANDO">Aguardando</SelectItem>
                <SelectItem value="EM_TRANSITO">Em trânsito</SelectItem>
                <SelectItem value="CONCLUIDA">Concluída</SelectItem>
                <SelectItem value="CANCELADA">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Viagem</TableHead>
                  <TableHead>Motorista</TableHead>
                  <TableHead>Transportadora</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Placa</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {viagensFiltradas.map((viagem) => (
                  <TableRow key={viagem.id}>
                    <TableCell className="font-medium">
                      {viagem.codigo}
                    </TableCell>
                    <TableCell>{viagem.motorista}</TableCell>
                    <TableCell>{viagem.transportadora}</TableCell>
                    <TableCell>{viagem.origem}</TableCell>
                    <TableCell>{viagem.destino}</TableCell>
                    <TableCell>{viagem.placa}</TableCell>
                    <TableCell>
                      <ViagemStatusBadge status={viagem.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        to={`/viagens/${viagem.id}`}
                        aria-label="Ver detalhes da viagem"
                        className="inline-flex size-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                          <Eye className="size-4" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}

                {viagensFiltradas.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="py-10 text-center text-muted-foreground"
                    >
                      Nenhuma viagem encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <p className="text-sm text-muted-foreground">
            {viagensFiltradas.length} viagem(ns) encontrada(s).
          </p>
        </CardContent>
      </Card>

      <NovaViagemDialog
        open={dialogAberto}
        onOpenChange={setDialogAberto}
      />
    </div>
  );
}
