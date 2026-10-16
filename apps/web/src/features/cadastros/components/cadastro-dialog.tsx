
import { useEffect, useState, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { CadastroTipo } from '@/mocks/cadastros';
import { useCadastrosStore } from '../cadastros.store';

export type CadastroRegistro = {
  id: string;
  ativo: boolean;
  [key: string]: string | boolean;
};

export const cadastroConfig: Record<
  CadastroTipo,
  {
    titulo: string;
    singular: string;
    campos: {
      nome: string;
      label: string;
      placeholder: string;
    }[];
  }
> = {
  motoristas: {
    titulo: 'Motoristas',
    singular: 'motorista',
    campos: [
      { nome: 'nome', label: 'Nome', placeholder: 'Nome completo' },
      { nome: 'ddd', label: 'DDD', placeholder: '47' },
      { nome: 'telefone', label: 'Telefone', placeholder: '999887766' },
    ],
  },
  veiculos: {
    titulo: 'Veículos',
    singular: 'veículo',
    campos: [
      { nome: 'placa', label: 'Placa', placeholder: 'ABC1D23' },
      { nome: 'tipo', label: 'Tipo', placeholder: 'Carreta, Truck...' },
    ],
  },
  transportadoras: {
    titulo: 'Transportadoras',
    singular: 'transportadora',
    campos: [
      { nome: 'nome', label: 'Nome', placeholder: 'Nome da empresa' },
      { nome: 'contato', label: 'Contato', placeholder: 'Telefone ou e-mail' },
    ],
  },
  cds: {
    titulo: 'Centros de Distribuição',
    singular: 'centro de distribuição',
    campos: [
      { nome: 'nome', label: 'Nome', placeholder: 'CD Navegantes' },
    ],
  },
};

interface Props {
  tipo: CadastroTipo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registro?: CadastroRegistro | null;
}

export function CadastroDialog({
  tipo,
  open,
  onOpenChange,
  registro,
}: Props) {
  const adicionar = useCadastrosStore((s) => s.adicionar);
  const editar = useCadastrosStore((s) => s.editar);

  const config = cadastroConfig[tipo];
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;

    const valores: Record<string, string> = {};

    for (const campo of config.campos) {
      valores[campo.nome] =
        registro && typeof registro[campo.nome] === 'string'
          ? String(registro[campo.nome])
          : '';
    }

    setForm(valores);
  }, [open, registro, config]);

  function salvar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const dados = Object.fromEntries(
      Object.entries(form).map(([chave, valor]) => [
        chave,
        valor.trim(),
      ])
    );

    if (registro) {
      editar(tipo, registro.id, dados);
    } else {
      adicionar(tipo, dados);
    }

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {registro ? 'Editar' : 'Novo'} {config.singular}
          </DialogTitle>
          <DialogDescription>
            Preencha os dados do cadastro.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={salvar} className="space-y-4">
          {config.campos.map((campo) => (
            <div key={campo.nome} className="space-y-2">
              <Label htmlFor={`cadastro-${campo.nome}`}>
                {campo.label}
              </Label>

              <Input
                id={`cadastro-${campo.nome}`}
                required
                value={form[campo.nome] ?? ''}
                placeholder={campo.placeholder}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    [campo.nome]: event.target.value,
                  }))
                }
              />
            </div>
          ))}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>

            <Button type="submit">
              {registro ? 'Salvar alterações' : 'Cadastrar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
