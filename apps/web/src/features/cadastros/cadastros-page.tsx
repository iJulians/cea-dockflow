
import { useMemo, useState } from 'react';
import { Pencil, Plus, Search } from 'lucide-react';

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { CadastroTipo } from '@/mocks/cadastros';
import { useCadastrosStore } from './cadastros.store';

import {
  CadastroDialog,
  cadastroConfig,
  type CadastroRegistro,
} from './components/cadastro-dialog';

interface Props {
  tipo: CadastroTipo;
}

export function CadastrosPage({ tipo }: Props) {
  const registros = useCadastrosStore((state) => state[tipo]);
  const alternarAtivo = useCadastrosStore(
    (state) => state.alternarAtivo
  );

  const [busca, setBusca] = useState('');
  const [dialogAberto, setDialogAberto] = useState(false);
  const [registroEditando, setRegistroEditando] =
    useState<CadastroRegistro | null>(null);

  const config = cadastroConfig[tipo];

  const lista = useMemo(() => {
    return registros.filter((registro) =>
      Object.values(registro)
        .some((valor) =>
          String(valor)
            .toLowerCase()
            .includes(busca.toLowerCase().trim())
        )
    );
  }, [registros, busca]);

  function novoCadastro() {
    setRegistroEditando(null);
    setDialogAberto(true);
  }

  function editarCadastro(registro: CadastroRegistro) {
    setRegistroEditando(registro);
    setDialogAberto(true);
  }

  return (
    <div className="w-full min-w-0 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {config.titulo}
          </h1>
          <p className="text-muted-foreground">
            Gerencie os registros cadastrados no sistema.
          </p>
        </div>

        <Button onClick={novoCadastro}>
          <Plus className="mr-2 size-4" />
          Novo cadastro
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registros cadastrados</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              className="pl-9"
              placeholder={`Buscar ${config.titulo.toLowerCase()}...`}
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {config.campos.map((campo) => (
                    <TableHead key={campo.nome}>
                      {campo.label}
                    </TableHead>
                  ))}

                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {lista.map((registro) => (
                  <TableRow key={registro.id}>
                    {config.campos.map((campo) => (
                      <TableCell key={campo.nome}>
                        {String(
                          registro[
                            campo.nome as keyof typeof registro
                          ] ?? ''
                        )}
                      </TableCell>
                    ))}

                    <TableCell>
                      <Badge
                        variant={
                          registro.ativo
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {registro.ativo ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            editarCadastro(
                              registro as unknown as CadastroRegistro
                            )
                          }
                        >
                          <Pencil className="size-4" />
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            alternarAtivo(tipo, registro.id)
                          }
                        >
                          {registro.ativo
                            ? 'Desativar'
                            : 'Ativar'}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {lista.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={config.campos.length + 2}
                      className="py-10 text-center text-muted-foreground"
                    >
                      Nenhum registro encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <p className="text-sm text-muted-foreground">
            {lista.length} registro(s) encontrado(s).
          </p>
        </CardContent>
      </Card>

      <CadastroDialog
        tipo={tipo}
        open={dialogAberto}
        onOpenChange={setDialogAberto}
        registro={registroEditando}
      />
    </div>
  );
}
