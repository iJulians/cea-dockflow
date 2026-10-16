
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useEntregasStore } from './entregas.store';
import { useViagensStore } from '../viagens/viagens.store';
import {
  EntregaStatusBadge,
  entregaStatusOptions,
} from './components/entrega-status';

export function EntregasPage() {
  const entregas = useEntregasStore((s) => s.entregas);
  const viagens = useViagensStore((s) => s.viagens);

  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState('TODOS');

  const lista = useMemo(() => {
    return entregas.filter((entrega) => {
      const viagem = viagens.find(
        (v) => v.id === entrega.viagemId
      );

      const texto = [
        entrega.codigo,
        entrega.shipment,
        entrega.destino,
        viagem?.codigo ?? '',
        viagem?.motorista ?? '',
      ].join(' ').toLowerCase();

      return (
        texto.includes(busca.toLowerCase().trim()) &&
        (status === 'TODOS' || entrega.status === status)
      );
    });
  }, [entregas, viagens, busca, status]);

  return (
    <div className="w-full min-w-0 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Entregas
        </h1>
        <p className="text-muted-foreground">
          Acompanhamento das entregas vinculadas às viagens.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Entregas cadastradas</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative min-w-52 flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Buscar entrega, shipment ou viagem..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            <Select
              value={status}
              onValueChange={(value) => setStatus(value ?? 'TODOS')}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TODOS">Todos os status</SelectItem>
                {entregaStatusOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entrega</TableHead>
                  <TableHead>Shipment</TableHead>
                  <TableHead>Viagem</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Previsão</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {lista.map((entrega) => {
                  const viagem = viagens.find(
                    (v) => v.id === entrega.viagemId
                  );

                  return (
                    <TableRow key={entrega.id}>
                      <TableCell className="font-medium">
                        {entrega.codigo}
                      </TableCell>
                      <TableCell>{entrega.shipment}</TableCell>
                      <TableCell>
                        {viagem?.codigo ?? 'Não vinculada'}
                      </TableCell>
                      <TableCell>{entrega.destino}</TableCell>
                      <TableCell>
                        {new Date(entrega.previsao).toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        <EntregaStatusBadge status={entrega.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          to={`/entregas/${entrega.id}`}
                          aria-label={`Ver entrega ${entrega.codigo}`}
                          className="inline-flex size-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                          <Eye className="size-4" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {lista.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-10 text-center text-muted-foreground"
                    >
                      Nenhuma entrega encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <p className="text-sm text-muted-foreground">
            {lista.length} entrega(s) encontrada(s).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
