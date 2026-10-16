
import { useState, type FormEvent } from 'react';

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

import { useViagensStore } from '../viagens.store';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const campos = [
  { name: 'motorista', label: 'Motorista' },
  { name: 'transportadora', label: 'Transportadora' },
  { name: 'origem', label: 'Origem' },
  { name: 'destino', label: 'Destino' },
  { name: 'placa', label: 'Placa do veículo' },
] as const;

export function NovaViagemDialog({ open, onOpenChange }: Props) {
  const adicionarViagem = useViagensStore(
    (state) => state.adicionarViagem
  );

  const [form, setForm] = useState({
    motorista: '',
    transportadora: '',
    origem: '',
    destino: '',
    placa: '',
    previsao: '',
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    adicionarViagem({
      ...form,
      status: 'AGUARDANDO',
    });

    setForm({
      motorista: '',
      transportadora: '',
      origem: '',
      destino: '',
      placa: '',
      previsao: '',
    });

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nova viagem</DialogTitle>
          <DialogDescription>
            Preencha os dados para cadastrar uma viagem.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {campos.map((campo) => (
              <div key={campo.name} className="space-y-2">
                <Label htmlFor={campo.name}>{campo.label}</Label>
                <Input
                  id={campo.name}
                  required
                  value={form[campo.name]}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      [campo.name]: event.target.value,
                    }))
                  }
                />
              </div>
            ))}

            <div className="space-y-2">
              <Label htmlFor="previsao">Previsão de chegada</Label>
              <Input
                id="previsao"
                type="datetime-local"
                required
                value={form.previsao}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    previsao: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Cadastrar viagem</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
