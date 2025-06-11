"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  Database,
  HardDrive,
  Network,
  BarChart3,
  FileText,
  Users,
  Settings,
  AlertTriangle,
  Bot,
  Ticket,
} from "lucide-react"

// Interface para as props do componente principal
interface DashboardShellProps {
  children: React.ReactNode
  onTabChange?: (tabValue: string) => void
  activeTab?: string
  user: { name: string; role: string } | null
}

// Interface para um item de menu
interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  active: boolean;
}

// Componente para um único item do menu
function MenuItem({ icon: Icon, label, value, active, onClick }: MenuItemProps & { onClick: (value: string) => void }) {
    return (
        <button
          onClick={() => onClick(value)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-blue-600 hover:bg-blue-50 text-left w-full ${
            active ? "bg-blue-50 text-blue-600 border border-blue-200" : ""
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
    );
}

// Componente para a barra lateral de navegação
function SidebarNav({ user, activeTab, onTabChange }: Pick<DashboardShellProps, 'user' | 'activeTab' | 'onTabChange'>) {
    const getMenuItems = () => {
        const baseItems = [
            { icon: BarChart3, label: "Dashboard", value: "visao-geral" },
            { icon: Ticket, label: "Chamados", value: "chamados" },
        ];
        
        const tiItems = [
            ...baseItems,
            { icon: HardDrive, label: "Hardware", value: "hardware" },
            { icon: FileText, label: "Software", value: "software" },
            { icon: Network, label: "Rede", value: "rede" },
            { icon: Database, label: "Banco de Dados", value: "banco-dados" },
            { icon: Activity, label: "Monitoramento", value: "monitoramento" },
            { icon: AlertTriangle, label: "Alertas", value: "alertas" },
            { icon: Bot, label: "Automação & IA", value: "automacao-ia" },
            { icon: FileText, label: "Relatórios", value: "relatorios-avancados" },
        ];

        const adminItems = [
            ...tiItems,
            { icon: Users, label: "Usuários", value: "usuarios" },
            { icon: Settings, label: "Configurações", value: "configuracoes" },
        ];
        
        const gestorItems = [
            ...baseItems,
            { icon: FileText, label: "Relatórios", value: "relatorios-avancados" },
            { icon: BarChart3, label: "Status Geral", value: "status" },
        ];

        if (!user) return baseItems;

        switch (user.role) {
            case "admin": return adminItems;
            case "ti": return tiItems;
            case "gestor": return gestorItems;
            default: return baseItems;
        }
    };

    const menuItems = getMenuItems();

    return (
        <aside className="fixed top-0 z-30 -ml-2 hidden h-screen w-full shrink-0 overflow-y-auto border-r border-blue-100 bg-white md:sticky md:block">
            <div className="h-full py-6 pl-8 pr-6 lg:px-8">
                <nav className="grid items-start gap-2">
                    <div className="group flex flex-col gap-4 py-2">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-blue-600">ET & WICCA TI</h2>
                            {user && (
                                <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 capitalize">
                                    {user.role}
                                </Badge>
                            )}
                        </div>

                        <div className="grid gap-1">
                            {menuItems.map((item) => (
                                <MenuItem
                                    key={item.value}
                                    {...item}
                                    active={activeTab === item.value}
                                    onClick={(value) => onTabChange?.(value)}
                                />
                            ))}
                        </div>

                        <div className="mt-auto p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <h3 className="text-sm font-medium mb-2 text-blue-800">Status do Sistema</h3>
                            <div className="space-y-2 text-xs">
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-700">Servidores</span>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">Online</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-700">Rede</span>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">Estável</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
}

export function DashboardShell({ children, onTabChange, activeTab, user }: DashboardShellProps) {
  return (
    <div className="flex-1 items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SidebarNav user={user} activeTab={activeTab} onTabChange={onTabChange} />
      <main className="flex w-full flex-col overflow-hidden p-4 md:p-6 bg-gray-50">
        {children}
      </main>
    </div>
  )
}
