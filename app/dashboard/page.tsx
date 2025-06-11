"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HardwareTab } from "@/components/tabs/hardware-tab"
import { SoftwareTab } from "@/components/tabs/software-tab"
import { RedeTab } from "@/components/tabs/rede-tab"
import { BancoDadosTab } from "@/components/tabs/banco-dados-tab"
import { ChamadosTab } from "@/components/tabs/chamados-tab"
import { Overview } from "@/components/dashboard/overview"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  Activity,
} from "lucide-react"
import { AlertSystem } from "@/components/notifications/alert-system"
import { AdvancedReports } from "@/components/reports/advanced-reports"
import { AutomationAIDashboard } from "@/components/ai/automation-ai-dashboard"
import { SystemSettings } from "@/components/settings/system-settings"
import { UserManagement } from "@/components/users/user-management"

// Componente para Acesso Negado
function AccessDenied() {
  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-800">Acesso Negado</CardTitle>
        <CardDescription>Você não tem permissão para acessar esta seção.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Shield className="h-16 w-16 text-blue-400 mx-auto mb-4" />
          <p className="text-muted-foreground">
            Entre em contato com o administrador do sistema para solicitar acesso.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente para a aba de Relatórios
function RelatoriosTab({ userRole }: { userRole: string }) {
  const adminReports = [
    { title: "Inventário Completo", description: "Relatório de todos os ativos de TI da ET & WICCA" },
    { title: "Licenças a Vencer", description: "Licenças que vencem nos próximos 30 dias" },
    { title: "Manutenções Programadas", description: "Calendário de manutenções futuras" },
    { title: "Custos de TI", description: "Análise de custos mensais e anuais" },
  ]

  const gestorReports = [
    { title: "Resumo Executivo", description: "Visão geral dos recursos de TI para gestão" },
    { title: "Custos de TI", description: "Análise de custos mensais e anuais" },
    { title: "Indicadores de Performance", description: "KPIs e métricas de TI" },
    { title: "Planejamento de Orçamento", description: "Projeções e planejamento financeiro" },
  ]

  const reports = userRole === "admin" ? adminReports : gestorReports;

  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-800">
          Relatórios ET & WICCA - {userRole === "admin" ? "Administrador" : "Gestor"}
        </CardTitle>
        <CardDescription>
          {userRole === "admin"
            ? "Acesso completo a todos os relatórios técnicos e administrativos."
            : "Relatórios executivos e de gestão para tomada de decisões estratégicas."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report, index) => (
            <Card
              key={index}
              className="p-4 border-dashed border-2 border-blue-200 cursor-pointer hover:bg-blue-50 hover:border-blue-300"
            >
              <CardTitle className="text-base text-blue-700">{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Componente para a aba de Monitoramento
function MonitoramentoTab() {
    return (
        <Card className="border-blue-200">
            <CardHeader>
                <CardTitle className="text-blue-800">Monitoramento</CardTitle>
                <CardDescription>Acompanhe a saúde e performance dos sistemas em tempo real.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center py-8">
                    <Activity className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <p className="text-muted-foreground">O painel de monitoramento em tempo real está sendo carregado.</p>
                </div>
            </CardContent>
        </Card>
    )
}


export default function DashboardPage() {
  const [user, setUser] = useState<{name: string, role: string} | null>(null)
  const [activeTab, setActiveTab] = useState("visao-geral")
  const router = useRouter()

  useEffect(() => {
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

  const renderActiveContent = (): ReactNode => {
    switch (activeTab) {
      case "visao-geral":
        return <Overview />
      case "chamados":
        return <ChamadosTab />
      case "hardware":
        if (user.role === "admin" || user.role === "ti") return <HardwareTab />
        return <AccessDenied />
      case "software":
        if (user.role === "admin" || user.role === "ti") return <SoftwareTab />
        return <AccessDenied />
      case "rede":
        if (user.role === "admin" || user.role === "ti") return <RedeTab />
        return <AccessDenied />
      case "banco-dados":
        if (user.role === "admin" || user.role === "ti") return <BancoDadosTab />
        return <AccessDenied />
      case "relatorios":
        return <RelatoriosTab userRole={user.role} />
      case "relatorios-avancados":
        return <AdvancedReports />
      case "monitoramento":
        if (user.role === "admin" || user.role === "ti") return <MonitoramentoTab />
        return <AccessDenied />
      case "usuarios":
        if (user.role === "admin") return <UserManagement />
        return <AccessDenied />
      case "configuracoes":
        if (user.role === "admin") return <SystemSettings />
        return <AccessDenied />
      case "alertas":
        if (user.role === "admin" || user.role === "ti") return <AlertSystem />
        return <AccessDenied />
      case "automacao-ia":
        if (user.role === "admin" || user.role === "ti") return <AutomationAIDashboard />
        return <AccessDenied />
      default:
        return <Overview />
    }
  }

  return (
    <DashboardShell onTabChange={handleTabChange} activeTab={activeTab} user={user}>
      <DashboardHeader
        heading="Sistema de Gestão de TI - ET & WICCA"
        subheading={`Bem-vindo, ${user.name}! Gerencie todos os recursos de tecnologia da empresa em um só lugar.`}
      />
      <Alert className="mb-4 border-blue-200 bg-blue-50">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          Você está logado como{" "}
          <strong>{user.role === "admin" ? "Administrador" : user.role === "ti" ? "Técnico de TI" : "Gestor"}</strong>.
        </AlertDescription>
      </Alert>
      <div className="space-y-4">{renderActiveContent()}</div>
    </DashboardShell>
  )
}
