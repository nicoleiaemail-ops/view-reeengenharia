import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, LogOut } from "lucide-react";
import type { Json } from "@/integrations/supabase/types";

type Assessment = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  segmento: string;
  respostas: Json;
  created_at: string;
};

type Lead = {
  id: string;
  nome: string;
  email: string;
  whatsapp: string;
  empresa: string;
  num_funcionarios: string;
  segmento: string;
  cidade: string;
  created_at: string;
};

function jsonToCsv(data: Record<string, unknown>[]): string {
  if (!data.length) return "";
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((h) => {
      const val = row[h];
      const str = typeof val === "object" ? JSON.stringify(val) : String(val ?? "");
      return `"${str.replace(/"/g, '""')}"`;
    }).join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

function downloadCsv(csv: string, filename: string) {
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function flattenRespostas(assessment: Assessment): Record<string, unknown> {
  const { respostas, ...rest } = assessment;
  const flat: Record<string, unknown> = { ...rest };
  if (respostas && typeof respostas === "object" && !Array.isArray(respostas)) {
    Object.entries(respostas as Record<string, unknown>).forEach(([k, v]) => {
      flat[`resp_${k}`] = v;
    });
  }
  return flat;
}

export default function Admin() {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/admin-login");
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");

      if (!roles?.length) {
        await supabase.auth.signOut();
        navigate("/admin-login");
        return;
      }

      const [aRes, lRes] = await Promise.all([
        supabase.from("maturity_assessments").select("*").order("created_at", { ascending: false }),
        supabase.from("diagnostic_leads").select("*").order("created_at", { ascending: false }),
      ]);

      setAssessments((aRes.data as Assessment[]) || []);
      setLeads((lRes.data as Lead[]) || []);
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  const exportAssessments = () => {
    const flat = assessments.map(flattenRespostas);
    const csv = jsonToCsv(flat);
    downloadCsv(csv, `avaliacoes_maturidade_${new Date().toISOString().slice(0, 10)}.csv`);
    toast.success("CSV exportado!");
  };

  const exportLeads = () => {
    const csv = jsonToCsv(leads as unknown as Record<string, unknown>[]);
    downloadCsv(csv, `leads_diagnostico_${new Date().toISOString().slice(0, 10)}.csv`);
    toast.success("CSV exportado!");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-[5%] py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-extrabold text-2xl text-foreground">Painel Administrativo</h1>
            <p className="text-muted-foreground text-sm mt-1">Visualize e exporte os dados dos formulários</p>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground gap-2">
            <LogOut className="w-4 h-4" /> Sair
          </Button>
        </div>

        <Tabs defaultValue="assessments" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="assessments">Avaliações de Maturidade ({assessments.length})</TabsTrigger>
            <TabsTrigger value="leads">Leads Diagnóstico ({leads.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="assessments" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={exportAssessments} className="bg-primary text-primary-foreground font-display font-bold gap-2">
                <Download className="w-4 h-4" /> Exportar CSV
              </Button>
            </div>
            <div className="rounded-lg border border-border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Segmento</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assessments.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Nenhuma avaliação recebida.</TableCell></TableRow>
                  ) : assessments.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-medium">{a.nome}</TableCell>
                      <TableCell>{a.email}</TableCell>
                      <TableCell>{a.telefone}</TableCell>
                      <TableCell>{a.segmento}</TableCell>
                      <TableCell>{new Date(a.created_at).toLocaleDateString("pt-BR")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="leads" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={exportLeads} className="bg-primary text-primary-foreground font-display font-bold gap-2">
                <Download className="w-4 h-4" /> Exportar CSV
              </Button>
            </div>
            <div className="rounded-lg border border-border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Segmento</TableHead>
                    <TableHead>Cidade</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.length === 0 ? (
                    <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Nenhum lead recebido.</TableCell></TableRow>
                  ) : leads.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell className="font-medium">{l.nome}</TableCell>
                      <TableCell>{l.email}</TableCell>
                      <TableCell>{l.whatsapp}</TableCell>
                      <TableCell>{l.empresa}</TableCell>
                      <TableCell>{l.segmento}</TableCell>
                      <TableCell>{l.cidade}</TableCell>
                      <TableCell>{new Date(l.created_at).toLocaleDateString("pt-BR")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
