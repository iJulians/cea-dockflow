
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Plus, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

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

import { useOcorrenciasStore } from './ocorrencias.store';
import { useViagensStore } from '../viagens/viagens.store';
import { useEntregasStore } from '../entregas/entregas.store';
import { NovaOcorrenciaDialog } from './components/nova-ocorrencia-dialog';

const statusLabels: Record<string, string> = {
  ABERTA: 'Aberta',
  EM_ANALISE: 'Em análise',
  RESOLVIDA: 'Resolvida',
  CANCELADA: 'Cancelada',
};

export function OcorrenciasPage() {
  const ocorrencias = useOcorrenciasStore((s) => s.ocorrencias);
  const viagens = useViagensStore((s) => s.viagens);
  const entregas = useEntregasStore((s) => s.entregas);

  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState('TODOS');
  const [dialogAberto, setDialogAberto] = useState(false);

  const lista = useMemo(
    () =>
      ocorrencias.filter((ocorrencia) => {
        const viagem = viagens.find(
          (v) => v.id === ocorrencia.viagemId
        );
        const entrega = entregas.find(
          (e) => e.id === ocorrencia.entregaId
        );

        const texto = [
          ocorrencia.codigo,
          ocorrencia.titulo,
          viagem?.codigo ?? '',
          entrega?.codigo ?? '',
        ]
          .join(' ')
          .toLowerCase();

        return (
          texto.includes(busca.toLowerCase().trim()) &&
          (status === 'TODOS' || ocorrencia.status === status)
        );
      }),
    [ocorrencias, viagens, entregas, busca, status]
  );

  return (
    <div className="w-full min-w-0 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Ocorrências
          </h1>
          <p className="text-muted-foreground">
            Acompanhe e resolva problemas operacionais.
          </p>
        </div>

        <Button onClick={() => setDialogAberto(true)}>
          <Plus className="mr-2 size-4" />
          Nova ocorrência
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ocorrências registradas</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative min-w-52 flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Buscar ocorrência..."
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
                <SelectItem value="ABERTA">Aberta</SelectItem>
                <SelectItem value="EM_ANALISE">Em análise</SelectItem>
                <SelectItem value="RESOLVIDA">Resolvida</SelectItem>
                <SelectItem value="CANCELADA">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Ocorrência</TableHead>
                  <TableHead>Vínculo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Itens</TableHead>
                  <TableHead>Abertura</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {lista.map((ocorrencia) => {
                  const viagem = viagens.find(
                    (v) => v.id === ocorrencia.viagemId
                  );
                  const entrega = entregas.find(
                    (e) => e.id === ocorrencia.entregaId
                  );

                  return (
                    <TableRow key={ocorrencia.id}>
                      <TableCell className="font-medium">
                        {ocorrencia.codigo}
                      </TableCell>
                      <TableCell>{ocorrencia.titulo}</TableCell>
                      <TableCell>
                        {viagem
                          ? `Viagem ${viagem.codigo}`
                          : entrega
                            ? `Entrega ${entrega.codigo}`
                            : 'Sem vínculo'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {statusLabels[ocorrencia.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {ocorrencia.itens.length}
                      </TableCell>
                      <TableCell>
                        {new Date(
                          ocorrencia.criadoEm
                        ).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          to={`/ocorrencias/${ocorrencia.id}`}
                          aria-label="Ver ocorrência"
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
                      Nenhuma ocorrência encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <NovaOcorrenciaDialog
        open={dialogAberto}
        onOpenChange={setDialogAberto}
      />
    </div>
  );
}
