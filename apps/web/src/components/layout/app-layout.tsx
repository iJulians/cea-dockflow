
import { Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { AppSidebar } from './app-sidebar';

const pageNames: Record<string, string> = {
  '/': 'Dashboard',
  '/viagens': 'Viagens',
  '/entregas': 'Entregas',
  '/ocorrencias': 'Ocorrências',
  '/motoristas': 'Motoristas',
  '/transportadoras': 'Transportadoras',
  '/cds': 'Centros de Distribuição',
};

export function AppLayout() {
  const { pathname } = useLocation();

  const pageTitle =
    pageNames[pathname] ??
    (pathname.startsWith('/viagens/') ? 'Detalhes da viagem' : 'DockFlow');

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="min-w-0 bg-slate-50/70">
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-5" />
            <span className="truncate text-sm font-medium text-foreground">
              {pageTitle}
            </span>
          </div>

          <span className="hidden text-xs text-muted-foreground sm:block">
            Ambiente de demonstração
          </span>
        </header>

        <div className="w-full min-w-0 flex-1 p-4 md:p-6 xl:p-8">
          <div className="mx-auto w-full max-w-[1600px] min-w-0">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
