"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Filter, Edit, Trash2, Ticket } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Chamado {
  id: string;
  title: string;
  description: string;
  status: "Aberto" | "Em Andamento" | "Resolvido";
  priority: "Baixa" | "Média" | "Alta";
  category: string;
  createdBy: string;
  createdAt: string;
}

export function ChamadosTab() {
  const [tickets, setTickets] = useState<Chamado[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Chamado | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', priority: 'Média', category: 'Hardware' });
  const [filterStatus, setFilterStatus] = useState('Todos');

  // Carregar tickets do localStorage ao iniciar
  useEffect(() => {
    try {
      const savedTickets = localStorage.getItem("et-wicca-tickets");
      if (savedTickets) {
        setTickets(JSON.parse(savedTickets));
      }
    } catch (error) {
      console.error("Failed to load tickets from localStorage", error);
    }
  }, []);

  // Salvar tickets no localStorage sempre que houver uma alteração
  useEffect(() => {
    try {
        localStorage.setItem("et-wicca-tickets", JSON.stringify(tickets));
    } catch (error) {
        console.error("Failed to save tickets to localStorage", error);
    }
  }, [tickets]);

  const handleOpenDialog = (ticket: Chamado | null = null) => {
    setEditingTicket(ticket);
    if (ticket) {
      setFormData({ title: ticket.title, description: ticket.description, priority: ticket.priority, category: ticket.category });
    } else {
      setFormData({ title: '', description: '', priority: 'Média', category: 'Hardware' });
    }
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.description) {
        toast({ title: "Erro", description: "Título e descrição são obrigatórios.", variant: "destructive" });
        return;
    }

    const currentUserData = localStorage.getItem("et-wicca-user");
    const currentUser = currentUserData ? JSON.parse(currentUserData) : { name: "Usuário Desconhecido" };

    if (editingTicket) {
      // Editar
      setTickets(tickets.map(t => t.id === editingTicket.id ? { ...editingTicket, ...formData } : t));
      toast({ title: "Chamado Atualizado", description: "Sua solicitação foi atualizada." });
    } else {
      // Criar novo
      const newTicket: Chamado = {
        id: Date.now().toString(),
        ...formData,
        status: "Aberto",
        createdBy: currentUser.name,
        createdAt: new Date().toLocaleString('pt-BR'),
      };
      setTickets([...tickets, newTicket]);
      toast({ title: "Chamado Criado", description: "Sua solicitação foi enviada para a equipe de TI." });
    }
    setOpenDialog(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este chamado?")) {
        setTickets(tickets.filter(t => t.id !== id));
        toast({ title: "Chamado Excluído", description: "A solicitação foi removida." });
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aberto": return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Aberto</Badge>
      case "Em Andamento": return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Em Andamento</Badge>
      case "Resolvido": return <Badge className="bg-green-100 text-green-800 border-green-200">Resolvido</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Alta": return <Badge variant="destructive">Alta</Badge>
      case "Média": return <Badge variant="secondary" className="bg-amber-500 hover:bg-amber-600">Média</Badge>
      case "Baixa": return <Badge variant="outline">Baixa</Badge>
      default: return <Badge variant="outline">{priority}</Badge>
    }
  };

  const filteredTickets = tickets.filter(ticket => filterStatus === 'Todos' || ticket.status === filterStatus);

  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-800">Sistema de Chamados</CardTitle>
        <CardDescription>Abra e acompanhe suas solicitações para a equipe de TI.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Aberto">Aberto</SelectItem>
                <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                <SelectItem value="Resolvido">Resolvido</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => handleOpenDialog()} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Abrir Chamado
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Criado por</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.title}</TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell>{ticket.createdBy}</TableCell>
                  <TableCell>{ticket.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(ticket)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(ticket.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Mostrando {filteredTickets.length} de {tickets.length} chamados.
        </div>
      </CardFooter>

      {/* Dialog para Criar/Editar Chamado */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingTicket ? "Editar Chamado" : "Novo Chamado"}</DialogTitle>
            <DialogDescription>
              {editingTicket ? "Atualize as informações do seu chamado." : "Descreva seu problema ou solicitação."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição Detalhada</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={5} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Hardware">Hardware</SelectItem>
                            <SelectItem value="Software">Software</SelectItem>
                            <SelectItem value="Rede">Rede</SelectItem>
                            <SelectItem value="Acesso">Acesso/Senha</SelectItem>
                            <SelectItem value="Outro">Outro</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="priority">Prioridade</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value as "Baixa" | "Média" | "Alta"})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Baixa">Baixa</SelectItem>
                            <SelectItem value="Média">Média</SelectItem>
                            <SelectItem value="Alta">Alta</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">Salvar Chamado</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
