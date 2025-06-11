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
  Ticket,
} from "lucide-react"

interface DashboardShellProps {
  children: React.ReactNode
  onTabChange?: (tabValue: string) => void
  activeTab?: string
  user: { name: string; role: string } | null
}

// Função helper movida para fora do componente
const getMenuItems = (user: { role: string } | null, activeTab?: string) => {
    const baseItems = [
      {
        icon: BarChart3,
        label: "Dashboard",
        value: "visao-geral",
        active: activeTab === "visao-geral",
      },
      {
        icon: Ticket,
        label: "Chamados",
        value: "chamados",
        active: activeTab === "chamados",
      },
    ]

    if (!user) return baseItems

    if (user.role === "admin") {
      return [
        ...baseItems,
        { icon: HardDrive, label: "Hardware", value: "hardware", active: activeTab === "hardware" },
        { icon: FileText, label: "Software", value: "software", active: activeTab === "software" },
        { icon: Network, label: "Rede", value: "rede", active: activeTab === "rede" },
        { icon: Database, label: "Banco de Dados", value: "banco-dados", active: activeTab === "banco-dados" },
        { icon: Activity, label: "Monitoramento", value: "monitoramento", active: activeTab === "monitoramento" },
        { icon: AlertTriangle, label: "Alertas", value: "alertas", active: activeTab === "alertas" },
        { icon: Bot, label: "Automação & IA", value: "automacao-ia", active: activeTab === "automacao-ia" },
        { icon: FileText, label: "Relatórios", value: "relatorios-avancados", active: activeTab === "relatorios-avancados" },
        { icon: Users, label: "Usuários", value: "usuarios", active: activeTab === "usuarios" },
        { icon: Settings, label: "Configurações", value: "configuracoes", active: activeTab === "configuracoes" },
      ]
    } else if (user.role === "ti") {
      return [
        ...baseItems,
        { icon: HardDrive, label: "Hardware", value: "hardware", active: activeTab === "hardware" },
        { icon: FileText, label: "Software", value: "software", active: activeTab === "software" },
        { icon: Network, label: "Rede", value: "rede", active: activeTab === "rede" },
        { icon: Database, label: "Banco de Dados", value: "banco-dados", active: activeTab === "banco-dados" },
        { icon: Activity, label: "Monitoramento", value: "monitoramento", active: activeTab === "monitoramento" },
        { icon: AlertTriangle, label: "Alertas", value: "alertas", active: activeTab === "alertas" },
        { icon: Bot, label: "Automação & IA", value: "automacao-ia", active: activeTab === "automacao-ia" },
        { icon: FileText, label: "Relatórios", value: "relatorios-avancados", active: activeTab === "relatorios-avancados" },
      ]
    } else if (user.role === "gestor") {
      return [
        ...baseItems,
        { icon: FileText, label: "Relatórios", value: "relatorios-avancados", active: activeTab === "relatorios-avancados" },
        { icon: BarChart3, label: "Status Geral", value: "status", active: activeTab === "status" },
      ]
    }

    return baseItems
}

export function DashboardShell({ children, onTabChange, activeTab, user }: DashboardShellProps) {

  const menuItems = getMenuItems(user, activeTab)

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

              {user && (
                <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded border border-blue-100">
                  <strong>Nível de Acesso:</strong>
                  <br />
                  {user.role === "admin" && "Acesso completo ao sistema"}
                  {user.role === "ti" && "Acesso técnico e operacional"}
                  {user.
