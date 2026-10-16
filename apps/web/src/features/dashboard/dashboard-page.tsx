import {
  Truck,
  Package,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { dashboardStats, viagensRecentes } from '@/mocks/dashboard';

const stats = [
  {
    title: 'Viagens ativas',
    value: dashboardStats.viagensAtivas,
    icon: Truck,
  },
  {
    title: 'Entregas pendentes',
    value: dashboardStats.entregasPendentes,
    icon: Package,
  },
  {
    title: 'Entregas concluídas',
    value: dashboardStats.entregasConcluidas,
    icon: CheckCircle2,
  },
  {
    title: 'Ocorrências abertas',
    value: dashboardStats.ocorrenciasAbertas,
    icon: AlertTriangle,
  },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Visão geral das operações logísticas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="size-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Viagens recentes</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-3">Viagem</th>
                  <th className="p-3">Motorista</th>
                  <th className="p-3">Transportadora</th>
                  <th className="p-3">Origem</th>
                  <th className="p-3">Destino</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {viagensRecentes.map((viagem) => (
                  <tr key={viagem.id} className="border-b">
                    <td className="p-3 font-medium">{viagem.id}</td>
                    <td className="p-3">{viagem.motorista}</td>
                    <td className="p-3">{viagem.transportadora}</td>
                    <td className="p-3">{viagem.origem}</td>
                    <td className="p-3">{viagem.destino}</td>
                    <td className="p-3">
                      <Badge variant="secondary">
                        {viagem.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}