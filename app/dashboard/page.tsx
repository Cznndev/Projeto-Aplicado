"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HardwareTab } from "@/components/tabs/hardware-tab"
import { SoftwareTab } from "@/components/tabs/software-tab"
import { RedeTab } from "@/components/tabs/rede-tab"
import { BancoDadosTab } from "@/components/tabs/banco-dados-tab"
import { Overview } from "@/components/dashboard/overview"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  Activity,
  HardDrive,
  Database,
  Network,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Users,
  BarChart3,
  Thermometer,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertSystem } from "@/components/notifications/alert-system"
import { AdvancedReports } from "@/components/reports/advanced-reports"
import { AutomationAIDashboard } from "@/components/ai/automation-ai-dashboard"
import { SystemSettings } from "@/components/settings/system-settings"
import { UserManagement } from "@/components/users/user-management"
import { ChamadosTab } from "@/components/tabs/chamados-tab"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState("visao-geral")
  const router = useRouter()

  useEffect(() => {
    // Verificar autenticação
    const auth = localStorage.getItem("et-wicca-auth")
    const userData = localStorage.getItem("et-wicca-user")

    if (!auth || auth !== "authenticated") {
      router.push("/")
      return
    }

    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [router])

  // Função para navegar entre abas (será chamada pelo DashboardShell)
  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue)
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  // Função para renderizar o conteúdo baseado na aba ativa
  const renderActiveContent = () => {
    switch (activeTab) {
      case "visao-geral":
        return <Overview />
      case "chamados":
        return <ChamadosTab />
      case "hardware":
        if (user.role === "admin" || user.role === "ti") {
          return <HardwareTab />
        }
        return <AccessDenied />
      case "software":
        if (user.role === "admin" || user.role === "ti") {
          return <SoftwareTab />
        }
        return <AccessDenied />
      case "rede":
        if (user.role === "admin" || user.role === "ti") {
          return <RedeTab />
        }
        return <AccessDenied />
      case "banco-dados":
        if (user.role === "admin" || user.role === "ti") {
          return <BancoDadosTab />
        }
        return <AccessDenied />
      case "relatorios":
        return <RelatoriosTab userRole={user.role} />
      case "relatorios-avancados":
        return <AdvancedReports />
      case "monitoramento":
        if (user.role === "admin" || user.role === "ti") {
          return <MonitoramentoTab />
        }
        return <AccessDenied />
      case "usuarios":
        if (user.role === "admin") {
          return <UserManagement />
        }
        return <AccessDenied />
      case "configuracoes":
        if (user.role === "admin") {
          return <SystemSettings />
        }
        return <AccessDenied />
      case "alertas":
        if (user.role === "admin" || user.role === "ti") {
          return <AlertSystem />
        }
        return <AccessDenied />
      case "automacao-ia":
        if (user.role === "admin" || user.role === "ti") {
          return <AutomationAIDashboard />
        }
        return <AccessDenied />
      default:
        return <Overview />
    }
  }

  return (
    <DashboardShell onTabChange={handleTabChange} activeTab={activeTab}>
      <DashboardHeader
        heading="Sistema de Gestão de TI - ET & WICCA"
        subheading={`Bem-vindo, ${
