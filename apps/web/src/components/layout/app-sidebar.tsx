import {
  LayoutDashboard,
  Truck,
  Package,
  AlertTriangle,
  Users,
  Building2,
  Warehouse,
  CarFront,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';

import { useNavigate } from 'react-router-dom';

const menuItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Viagens', url: '/viagens', icon: Truck },
  { title: 'Entregas', url: '/entregas', icon: Package },
  { title: 'Ocorrências', url: '/ocorrencias', icon: AlertTriangle },
];

const cadastros = [
  { title: 'Motoristas', url: '/motoristas', icon: Users },
  { title: 'Transportadoras', url: '/transportadoras', icon: Building2 },
  { title: 'Centros de Distribuição', url: '/cds', icon: Warehouse },
  {title: 'Veículos',url: '/veiculos',icon: CarFront },
];

export function AppSidebar() {
  const navigate = useNavigate();

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <Truck className="size-6" />
          <span className="text-xl font-bold">DockFlow</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Operações</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton onClick={() => navigate(item.url)}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Cadastros</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {cadastros.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton onClick={() => navigate(item.url)}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}