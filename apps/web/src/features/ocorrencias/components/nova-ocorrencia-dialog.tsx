
import { useState, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useViagensStore } from '../../viagens/viagens.store';
import { useEntregasStore } from '../../entregas/entregas.store';
import { useOcorrenciasStore } from '../ocorrencias.store';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NovaOcorrenciaDialog({
  open,
  onOpenChange,
}: Props) {
  const viagens = useViagensStore((s) => s.viagens);
  const entregas = useEntregasStore((s) => s.entregas);
  const adicionar = useOcorrenciasStore(
    (s) => s.adicionarOcorrencia
  );

  const [tipo, setTipo] = useState<'VIAGEM' | 'ENTREGA'>(
    'ENTREGA'
  );
  const [referenciaId, setReferenciaId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  function salvar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!referenciaId || !titulo.trim()) return;

    adicionar({
      viagemId: tipo === 'VIAGEM' ? referenciaId : null,
      entregaId: tipo === 'ENTREGA' ? referenciaId : null,
      titulo: titulo.trim(),
      descricao: descricao.trim(),
    });

    setReferenciaId('');
    setTitulo('');
    setDescricao('');
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nova ocorrência</DialogTitle>
          <DialogDescription>
            Registre um problema operacional.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={salvar} className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo de vínculo</Label>
            <Select
              value={tipo}
              onValueChange={(value) => {
                setTipo(value as 'VIAGEM' | 'ENTREGA');
                setReferenciaId('');
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VIAGEM">Viagem</SelectItem>
                <SelectItem value="ENTREGA">Entrega</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Registro vinculado</Label>
            <Select
              value={referenciaId}
              onValueChange={(value) => setReferenciaId(value ?? '')}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um registro" />
              </SelectTrigger>
              <SelectContent>
                {tipo === 'VIAGEM'
                  ? viagens.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.codigo} - {v.motorista}
                      </SelectItem>
                    ))
                  : entregas.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.codigo} - {e.destino}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="titulo-ocorrencia">Título</Label>
            <Input
              id="titulo-ocorrencia"
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex.: Avaria na mercadoria"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao-ocorrencia">
              Descrição
            </Label>
            <Textarea
              id="descricao-ocorrencia"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva o ocorrido..."
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Registrar ocorrência</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
