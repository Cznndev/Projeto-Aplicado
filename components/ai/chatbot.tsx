"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Bot, User, Send, Plus, MessageSquare, Clock, CheckCircle, AlertTriangle, Download, Trash2 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  category?: string
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  status: "active" | "resolved" | "escalated"
  createdAt: Date
  lastActivity: Date
}

export function Chatbot() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Problema de Login",
      status: "resolved",
      createdAt: new Date(Date.now() - 86400000),
      lastActivity: new Date(Date.now() - 3600000),
      messages: [
        {
          id: "1",
          type: "user",
          content: "Não consigo fazer login no sistema",
          timestamp: new Date(Date.now() - 86400000),
        },
        {
          id: "2",
          type: "bot",
          content:
            "Vou ajudá-lo com o problema de login. Primeiro, vamos verificar se suas credenciais estão corretas. Você está usando o usuário e senha fornecidos pelo administrador?",
          timestamp: new Date(Date.now() - 86400000 + 30000),
          category: "authentication",
        },
      ],
    },
  ])

  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversations, activeConversation])

  // Base de conhecimento do chatbot
  const knowledgeBase = {
    login: {
      keywords: ["login", "senha", "acesso", "entrar", "autenticação"],
      responses: [
        "Vou ajudá-lo com o problema de login. Primeiro, verifique se está usando as credenciais corretas.",
        "Para problemas de login, tente: 1) Verificar usuário e senha 2) Limpar cache do navegador 3) Tentar em modo anônimo",
        "Se o problema persistir, posso escalar para o suporte técnico. Você gostaria que eu criasse um ticket?",
      ],
    },
    hardware: {
      keywords: ["computador", "pc", "hardware", "lento", "travando", "monitor", "teclado", "mouse"],
      responses: [
        "Problemas de hardware podem afetar a produtividade. Vou ajudá-lo a diagnosticar o problema.",
        "Para problemas de performance: 1) Verifique o uso de CPU e memória 2) Reinicie o equipamento 3) Verifique conexões",
        "Se for um problema físico, posso agendar uma visita técnica. Qual é exatamente o problema que está enfrentando?",
      ],
    },
    software: {
      keywords: ["software", "programa", "aplicativo", "instalação", "erro", "bug", "atualização"],
      responses: [
        "Problemas de software são comuns. Vou ajudá-lo a resolver isso rapidamente.",
        "Para erros de software: 1) Reinicie o aplicativo 2) Verifique atualizações 3) Execute como administrador",
        "Se precisar de instalação de novos softwares, posso encaminhar sua solicitação para aprovação.",
      ],
    },
    network: {
      keywords: ["internet", "rede", "wifi", "conexão", "lento", "sem acesso", "vpn"],
      responses: [
        "Problemas de rede podem impactar todo o trabalho. Vamos resolver isso juntos.",
        "Para problemas de conectividade: 1) Verifique cabos de rede 2) Reinicie o roteador 3) Teste em outros dispositivos",
        "Se for um problema generalizado, vou notificar a equipe de infraestrutura imediatamente.",
      ],
    },
    database: {
      keywords: ["banco", "dados", "database", "sql", "backup", "lento", "erro"],
      responses: [
        "Problemas com banco de dados são críticos. Vou priorizar sua solicitação.",
        "Para problemas de BD: 1) Verifique conexões 2) Confirme credenciais 3) Teste consultas simples",
        "Se for um problema de performance ou corrupção, vou escalar imediatamente para o DBA.",
      ],
    },
    default: {
      keywords: [],
      responses: [
        "Entendo sua solicitação. Pode me dar mais detalhes sobre o problema?",
        "Vou fazer o possível para ajudá-lo. Qual é exatamente a dificuldade que está enfrentando?",
        "Para melhor atendimento, pode me informar: 1) Qual sistema está usando 2) Quando o problema começou 3) Mensagens de erro",
      ],
    },
  }

  const generateBotResponse = (userMessage: string): { content: string; category: string } => {
    const message = userMessage.toLowerCase()

    for (const [category, data] of Object.entries(knowledgeBase)) {
      if (category === "default") continue

      if (data.keywords.some((keyword) => message.includes(keyword))) {
        const randomResponse = data.responses[Math.floor(Math.random() * data.responses.length)]
        return { content: randomResponse, category }
      }
    }

    const defaultResponse =
      knowledgeBase.default.responses[Math.floor(Math.random() * knowledgeBase.default.responses.length)]
    return { content: defaultResponse, category: "general" }
  }

  const createNewConversation = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: "Nova Conversa",
      status: "active",
      createdAt: new Date(),
      lastActivity: new Date(),
      messages: [
        {
          id: "welcome",
          type: "bot",
          content:
            "Olá! Sou o assistente de TI da ET & WICCA. Como posso ajudá-lo hoje? Posso auxiliar com problemas de hardware, software, rede, banco de dados e muito mais!",
          timestamp: new Date(),
          category: "welcome",
        },
      ],
    }

    setConversations((prev) => [newConv, ...prev])
    setActiveConversation(newConv.id)
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeConversation) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: newMessage,
      timestamp: new Date(),
    }

    // Adicionar mensagem do usuário
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversation
          ? {
              ...conv,
              messages: [...conv.messages, userMessage],
              lastActivity: new Date(),
              title: conv.title === "Nova Conversa" ? newMessage.slice(0, 30) + "..." : conv.title,
            }
          : conv,
      ),
    )

    setNewMessage("")
    setIsTyping(true)

    // Simular delay de resposta
    setTimeout(
      () => {
        const { content, category } = generateBotResponse(newMessage)

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content,
          timestamp: new Date(),
          category,
        }

        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === activeConversation
              ? {
                  ...conv,
                  messages: [...conv.messages, botMessage],
                  lastActivity: new Date(),
                }
              : conv,
          ),
        )

        setIsTyping(false)
      },
      1000 + Math.random() * 2000,
    )
  }

  const deleteConversation = (convId: string) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== convId))
    if (activeConversation === convId) {
      setActiveConversation(null)
    }
  }

  const exportConversation = (convId: string) => {
    const conversation = conversations.find((conv) => conv.id === convId)
    if (!conversation) return

    const content = conversation.messages
      .map((msg) => `[${msg.timestamp.toLocaleString()}] ${msg.type.toUpperCase()}: ${msg.content}`)
      .join("\n")

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `conversa-${conversation.title.replace(/[^a-zA-Z0-9]/g, "-")}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const escalateToSupport = (convId: string) => {
    setConversations((prev) => prev.map((conv) => (conv.id === convId ? { ...conv, status: "escalated" } : conv)))
  }

  const activeConv = conversations.find((conv) => conv.id === activeConversation)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "escalated":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "authentication":
        return "bg-purple-100 text-purple-800"
      case "hardware":
        return "bg-blue-100 text-blue-800"
      case "software":
        return "bg-green-100 text-green-800"
      case "network":
        return "bg-orange-100 text-orange-800"
      case "database":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[800px]">
      {/* Lista de Conversas */}
      <Card className="border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-blue-800">Conversas</CardTitle>
            <Button onClick={createNewConversation} size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nova
            </Button>
          </div>
          <CardDescription>Histórico de conversas com o assistente de IA</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <div className="space-y-2 p-4">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    activeConversation === conv.id ? "border-blue-300 bg-blue-50" : "border-blue-100 hover:bg-blue-50"
                  }`}
                  onClick={() => setActiveConversation(conv.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(conv.status)}
                      <span className="font-medium text-blue-800 text-sm truncate">{conv.title}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          exportConversation(conv.id)
                        }}
                        className="h-6 w-6 p-0"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteConversation(conv.id)
                        }}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-blue-600">{conv.lastActivity.toLocaleString()}</div>
                  <div className="text-xs text-blue-500 mt-1">{conv.messages.length} mensagens</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="lg:col-span-2 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-blue-800">
                {activeConv ? activeConv.title : "Selecione uma conversa"}
              </CardTitle>
              <CardDescription>
                {activeConv ? `Status: ${activeConv.status}` : "Escolha uma conversa ou crie uma nova"}
              </CardDescription>
            </div>
            {activeConv && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => escalateToSupport(activeConv.id)}
                  className="border-blue-200 text-blue-600"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Escalar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportConversation(activeConv.id)}
                  className="border-blue-200 text-blue-600"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {activeConv ? (
            <>
              <ScrollArea className="h-[500px] p-4">
                <div className="space-y-4">
                  {activeConv.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === "user" ? "bg-blue-600 text-white" : "bg-blue-50 border border-blue-200"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {message.type === "user" ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4 text-blue-600" />
                          )}
                          <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                          {message.category && (
                            <Badge className={`text-xs ${getCategoryColor(message.category)}`}>
                              {message.category}
                            </Badge>
                          )}
                        </div>
                        <p className={message.type === "user" ? "text-white" : "text-blue-800"}>{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-blue-600" />
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              <Separator />
              <div className="p-4">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="border-blue-200 focus:border-blue-400"
                  />
                  <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 text-xs text-blue-600">
                  Pressione Enter para enviar • O assistente pode ajudar com hardware, software, rede e banco de dados
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-[600px]">
              <div className="text-center">
                <Bot className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-blue-800 mb-2">Assistente de TI ET & WICCA</h3>
                <p className="text-blue-600 mb-4">Selecione uma conversa existente ou crie uma nova para começar</p>
                <Button onClick={createNewConversation} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Iniciar Nova Conversa
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
