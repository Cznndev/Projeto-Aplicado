"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
} from "lucide-react"

interface DashboardShellProps {
  children: React.ReactNode
  onTabChange?: (tabValue: string) => void
  activeTab?: string
}

export function DashboardShell({ children, onTabChange, activeTab }: DashboardShellProps) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("et-wicca-user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // Definir itens do menu baseado no nível de acesso
  const getMenuItems = () => {
    const baseItems = [
      {
        icon: BarChart3,
        label: "Dashboard",
        value: "visao-geral",
        active: activeTab === "visao-geral",
      },
    ]

    if (!user) return baseItems

    if (user.role === "admin") {
      return [
        ...baseItems,
        {
          icon: HardDrive,
          label: "Hardware",
          value: "hardware",
          active: activeTab === "hardware",
        },
        {
          icon: FileText,
          label: "Software",
          value: "software",
          active: activeTab === "software",
        },
        {
          icon: Network,
          label: "Rede",
          value: "rede",
          active: activeTab === "rede",
        },
        {
          icon: Database,
          label: "Banco de Dados",
          value: "banco-dados",
          active: activeTab === "banco-dados",
        },
        {
          icon: Activity,
          label: "Monitoramento",
          value: "monitoramento",
          active: activeTab === "monitoramento",
        },
        {
          icon: AlertTriangle,
          label: "Alertas",
          value: "alertas",
          active: activeTab === "alertas",
        },
        {
          icon: Bot,
          label: "Automação & IA",
          value: "automacao-ia",
          active: activeTab === "automacao-ia",
        },
        {
          icon: FileText,
          label: "Relatórios",
          value: "relatorios-avancados",
          active: activeTab === "relatorios-avancados",
        },
        {
          icon: Users,
          label: "Usuários",
          value: "usuarios",
          active: activeTab === "usuarios",
        },
        {
          icon: Settings,
          label: "Configurações",
          value: "configuracoes",
          active: activeTab === "configuracoes",
        },
      ]
    } else if (user.role === "ti") {
      return [
        ...baseItems,
        {
          icon: HardDrive,
          label: "Hardware",
          value: "hardware",
          active: activeTab === "hardware",
        },
        {
          icon: FileText,
          label: "Software",
          value: "software",
          active: activeTab === "software",
        },
        {
          icon: Network,
          label: "Rede",
          value: "rede",
          active: activeTab === "rede",
        },
        {
          icon: Database,
          label: "Banco de Dados",
          value: "banco-dados",
          active: activeTab === "banco-dados",
        },
        {
          icon: Activity,
          label: "Monitoramento",
          value: "monitoramento",
          active: activeTab === "monitoramento",
        },
        {
          icon: AlertTriangle,
          label: "Alertas",
          value: "alertas",
          active: activeTab === "alertas",
        },
        {
          icon: Bot,
          label: "Automação & IA",
          value: "automacao-ia",
          active: activeTab === "automacao-ia",
        },
        {
          icon: FileText,
          label: "Relatórios",
          value: "relatorios-avancados",
          active: activeTab === "relatorios-avancados",
        },
      ]
    } else if (user.role === "gestor") {
      return [
        ...baseItems,
        {
          icon: FileText,
          label: "Relatórios",
          value: "relatorios-avancados",
          active: activeTab === "relatorios-avancados",
        },
        {
          icon: BarChart3,
          label: "Status Geral",
          value: "status",
          active: activeTab === "status",
        },
      ]
    }

    return baseItems
  }

  const menuItems = getMenuItems()

  // Função para navegar entre as abas
  const handleNavigation = (tabValue: string) => {
    if (onTabChange) {
      onTabChange(tabValue)
    }
  }

  return (
    <div className="flex-1 items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="fixed top-0 z-30 -ml-2 hidden h-screen w-full shrink-0 overflow-y-auto border-r border-blue-100 bg-white md:sticky md:block">
        <div className="h-full py-6 pl-8 pr-6 lg:px-8">
          <nav className="grid items-start gap-2">
            <div className="group flex flex-col gap-4 py-2">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-blue-600">ET & WICCA TI</h2>
                {user && (
                  <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                    {user.role === "admin" ? "Admin" : user.role === "ti" ? "TI" : "Gestor"}
                  </Badge>
                )}
              </div>

              {/* Informação sobre nível de acesso */}
              {user && (
                <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded border border-blue-100">
                  <strong>Nível de Acesso:</strong>
                  <br />
                  {user.role === "admin" && "Acesso completo ao sistema"}
                  {user.role === "ti" && "Acesso técnico e operacional"}
                  {user.role === "gestor" && "Acesso a relatórios e visão geral"}
                </div>
              )}

              <div className="grid gap-1">
                {menuItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={index}
                      onClick={() => handleNavigation(item.value)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-blue-600 hover:bg-blue-50 text-left w-full ${
                        item.active ? "bg-blue-50 text-blue-600 border border-blue-200" : ""
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="text-sm font-medium mb-2 text-blue-800">Status do Sistema</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Servidores</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                      Online
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Rede</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                      Estável
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Backup</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                      OK
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </aside>
      <main className="flex w-full flex-col overflow-hidden p-4 md:p-6 bg-gray-50">{children}</main>
    </div>
  )
}
