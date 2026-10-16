
import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

import type {
  OcorrenciaCategoria,
  OcorrenciaStatus,
} from '@/mocks/ocorrencias';

import { useOcorrenciasStore } from './ocorrencias.store';
import { useViagensStore } from '../viagens/viagens.store';
import { useEntregasStore } from '../entregas/entregas.store';

const statusLabels: Record<OcorrenciaStatus, string> = {
  ABERTA: 'Aberta',
  EM_ANALISE: 'Em análise',
  RESOLVIDA: 'Resolvida',
  CANCELADA: 'Cancelada',
};

const categorias: OcorrenciaCategoria[] = [
  'AVARIA',
  'EXTRAVIO',
  'ATRASO',
  'DIVERGENCIA',
  'OUTROS',
];

export function OcorrenciaDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const ocorrencia = useOcorrenciasStore((s) =>
    s.ocorrencias.find((o) => o.id === id)
  );

  const atualizarStatus = useOcorrenciasStore(
    (s) => s.atualizarStatus
  );
  const adicionarFollowup = useOcorrenciasStore(
    (s) => s.adicionarFollowup
  );
  const adicionarItem = useOcorrenciasStore(
    (s) => s.adicionarItem
  );
  const alternarItem = useOcorrenciasStore(
    (s) => s.alternarItem
  );

  const viagem = useViagensStore((s) =>
    s.viagens.find((v) => v.id === ocorrencia?.viagemId)
  );
  const entrega = useEntregasStore((s) =>
    s.entregas.find((e) => e.id === ocorrencia?.entregaId)
  );

  const [mensagem, setMensagem] = useState('');
  const [volume, setVolume] = useState('');
  const [item, setItem] = useState('');
  const [categoria, setCategoria] =
    useState<OcorrenciaCategoria>('AVARIA');
  const [descricaoItem, setDescricaoItem] = useState('');

  if (!ocorrencia) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          Ocorrência não encontrada
        </h1>
        <Button onClick={() => navigate('/ocorrencias')}>
          Voltar
        </Button>
      </div>
    );
  }

  function salvarFollowup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!mensagem.trim()) return;
    adicionarFollowup(ocorrencia!.id, mensagem.trim());
    setMensagem('');
  }

  function salvarItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!item.trim()) return;

    adicionarItem(ocorrencia!.id, {
      volume: volume.trim(),
      item: item.trim(),
      categoria,
      descricao: descricaoItem.trim(),
    });

    setVolume('');
    setItem('');
    setDescricaoItem('');
  }

  const followups = [...ocorrencia.followups].sort(
    (a, b) =>
      new Date(b.criadoEm).getTime() -
      new Date(a.criadoEm).getTime()
  );

  return (
    <div className="w-full min-w-0 space-y-6">
      <Button variant="ghost" onClick={() => navigate('/ocorrencias')}>
        <ArrowLeft className="mr-2 size-4" />
        Voltar às ocorrências
      </Button>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {ocorrencia.codigo}
          </h1>
          <p className="text-muted-foreground">
            {ocorrencia.titulo}
          </p>
        </div>
        <Badge variant="secondary">
          {statusLabels[ocorrencia.status]}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações da ocorrência</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">{ocorrencia.descricao}</p>
            <p className="text-sm text-muted-foreground">
              Aberta em{' '}
              {new Date(ocorrencia.criadoEm).toLocaleString('pt-BR')}
            </p>
            <p className="text-sm">
              Vinculada a:{' '}
              {viagem ? (
                <Link
                  className="text-primary hover:underline"
                  to={`/viagens/${viagem.id}`}
                >
                  {viagem.codigo}
                </Link>
              ) : entrega ? (
                <Link
                  className="text-primary hover:underline"
                  to={`/entregas/${entrega.id}`}
                >
                  {entrega.codigo}
                </Link>
              ) : (
                'Registro indisponível'
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atualizar status</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={ocorrencia.status}
              onValueChange={(value) =>
                atualizarStatus(
                  ocorrencia.id,
                  value as OcorrenciaStatus
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Itens da ocorrência</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {ocorrencia.itens.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhum item registrado.
            </p>
          ) : (
            <div className="space-y-2">
              {ocorrencia.itens.map((registro) => (
                <div
                  key={registro.id}
                  className="flex items-start gap-3 rounded-lg border p-3"
                >
                  <input
                    type="checkbox"
                    checked={registro.finalizado}
                    onChange={() =>
                      alternarItem(ocorrencia.id, registro.id)
                    }
                    aria-label={`Marcar ${registro.item} como ${registro.finalizado ? 'pendente' : 'finalizado'}`}
                    className="mt-1 size-4 shrink-0 cursor-pointer accent-primary"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">
                      {registro.item}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Volume: {registro.volume || 'Não informado'}
                      {' · '}
                      {registro.categoria}
                    </p>
                    {registro.descricao && (
                      <p className="mt-1 text-sm">
                        {registro.descricao}
                      </p>
                    )}
                  </div>
                  <Badge variant="secondary">
                    {registro.finalizado ? 'Finalizado' : 'Pendente'}
                  </Badge>
                </div>
              ))}
            </div>
          )}

          <form
            onSubmit={salvarItem}
            className="grid gap-3 border-t pt-4 sm:grid-cols-2"
          >
            <Input
              placeholder="Volume"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
            />
            <Input
              placeholder="Código do item"
              required
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <Select
              value={categoria}
              onValueChange={(value) =>
                setCategoria(value as OcorrenciaCategoria)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Descrição do problema"
              value={descricaoItem}
              onChange={(e) => setDescricaoItem(e.target.value)}
            />
            <div className="sm:col-span-2">
              <Button type="submit">
                <Plus className="mr-2 size-4" />
                Adicionar item
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Follow-ups ({ocorrencia.followups.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <form onSubmit={salvarFollowup} className="space-y-3">
            <Textarea
              placeholder="Registre uma atualização sobre a ocorrência..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              rows={3}
            />
            <Button type="submit" disabled={!mensagem.trim()}>
              <Send className="mr-2 size-4" />
              Adicionar follow-up
            </Button>
          </form>

          <div className="space-y-3 border-t pt-4">
            {followups.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum acompanhamento registrado.
              </p>
            ) : (
              followups.map((followup) => (
                <div
                  key={followup.id}
                  className="rounded-lg border p-4"
                >
                  <div className="mb-2 flex flex-wrap justify-between gap-2">
                    <span className="text-sm font-semibold">
                      {followup.usuario}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(
                        followup.criadoEm
                      ).toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap text-sm">
                    {followup.mensagem}
                  </p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
