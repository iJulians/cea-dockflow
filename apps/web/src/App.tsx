import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { AppLayout } from '@/components/layout/app-layout';
import { DashboardPage } from '@/features/dashboard/dashboard-page';
import { ViagensPage } from '@/features/viagens/viagens-page';
import { ViagemDetailsPage } from '@/features/viagens/viagem-details-page';
import { EntregasPage } from '@/features/entregas/entregas-page';
import { EntregaDetailsPage } from '@/features/entregas/entrega-details-page';
import { OcorrenciasPage } from '@/features/ocorrencias/ocorrencias-page';
import { OcorrenciaDetailsPage } from '@/features/ocorrencias/ocorrencia-details-page';
import { CadastrosPage } from '@/features/cadastros/cadastros-page';

// function PlaceholderPage({ title }: { title: string }) {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold">{title}</h1>
//       <p className="text-muted-foreground">
//         Módulo em desenvolvimento.
//       </p>
//     </div>
//   );
// }

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="viagens" element={<ViagensPage />} />
          <Route path="viagens/:id" element={<ViagemDetailsPage />} />
          <Route path="entregas" element={<EntregasPage />} />
          <Route path="entregas/:id" element={<EntregaDetailsPage />} />
          <Route path="ocorrencias" element={<OcorrenciasPage />} />
          <Route
            path="ocorrencias/:id"
            element={<OcorrenciaDetailsPage />}
          />
          <Route
            path="motoristas"
            element={<CadastrosPage tipo="motoristas" />}
          />

          <Route
            path="veiculos"
            element={<CadastrosPage tipo="veiculos" />}
          />

          <Route
            path="transportadoras"
            element={<CadastrosPage tipo="transportadoras" />}
          />

          <Route
            path="cds"
            element={<CadastrosPage tipo="cds" />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}