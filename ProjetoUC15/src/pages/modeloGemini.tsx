import { useState } from "react";
import {
  Sprout,
  Tractor,
  Warehouse,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Map as MapIcon,
  ClipboardList,
  Beef,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertOctagon,
  MoreHorizontal,
  Clock,
} from "lucide-react";

// --- TIPOS DE NEGÓCIO (Business Logic) ---

type ZoneCategory = "AGRICULTURA" | "PECUARIA" | "MAQUINARIO" | "ESTOQUE";
type ImpactLevel = "CRITICO" | "ALTO" | "MEDIO" | "BAIXO";
type PerformanceStatus = "OTIMIZADO" | "ESTAVEL" | "ATENCAO" | "CRITICO";

interface Task {
  id: number;
  title: string;
  impact: ImpactLevel; // Substitui XP: Qual o tamanho do prejuízo se não fizer?
  deadline: string; // Urgência
  category: "Manutenção" | "Sanitário" | "Operacional" | "Administrativo";
}

interface ZoneData {
  id: string;
  name: string;
  category: ZoneCategory;

  // Novas Métricas de Gestão
  efficiency: number; // 0-100% (Substitui Barra de Vida)
  performanceTrend: "up" | "down" | "stable"; // Visão Geral (Histórico recente)
  statusLabel: PerformanceStatus; // O "Nível" agora é o status real do negócio

  details: {
    metric_label: string; // Ex: "Produção Estimada", "Cabeças", "Combustível"
    metric_value: string | number;
    metric_unit: string;
    last_update: string;
  };

  activeTasks: Task[];
}

// --- DADOS MOCKADOS (Cenário Realista) ---

const MOCK_ZONES: ZoneData[] = [
  {
    id: "z1",
    name: "Talhão Soja A1",
    category: "AGRICULTURA",
    efficiency: 94,
    performanceTrend: "up",
    statusLabel: "OTIMIZADO",
    details: {
      metric_label: "Produtividade Est.",
      metric_value: 72,
      metric_unit: "sc/ha",
      last_update: "Hoje, 08:00",
    },
    activeTasks: [
      {
        id: 101,
        title: "Monitoramento de Lagarta",
        impact: "ALTO",
        deadline: "Hoje",
        category: "Sanitário",
      },
    ],
  },
  {
    id: "z2",
    name: "Confinamento B",
    category: "PECUARIA",
    efficiency: 78,
    performanceTrend: "stable",
    statusLabel: "ESTAVEL",
    details: {
      metric_label: "Gado Ativo",
      metric_value: 450,
      metric_unit: "Cabeças",
      last_update: "Ontem, 18:00",
    },
    activeTasks: [
      {
        id: 201,
        title: "Vacinação Aftosa (Lote 4)",
        impact: "CRITICO",
        deadline: "2 Dias",
        category: "Sanitário",
      },
      {
        id: 202,
        title: "Reparo Cerca Setor Norte",
        impact: "MEDIO",
        deadline: "Semana que vem",
        category: "Manutenção",
      },
    ],
  },
  {
    id: "z3",
    name: "Parque de Máquinas",
    category: "MAQUINARIO",
    efficiency: 98,
    performanceTrend: "up",
    statusLabel: "OTIMIZADO",
    details: {
      metric_label: "Disponibilidade Frota",
      metric_value: 100,
      metric_unit: "%",
      last_update: "Agora",
    },
    activeTasks: [],
  },
  {
    id: "z4",
    name: "Silo Graneleiro 01",
    category: "ESTOQUE",
    efficiency: 45,
    performanceTrend: "down",
    statusLabel: "ATENCAO", // Caindo de produção
    details: {
      metric_label: "Capacidade Ocupada",
      metric_value: 92,
      metric_unit: "%",
      last_update: "Agora",
    },
    activeTasks: [
      {
        id: 401,
        title: "Termometria Alta (Foco de Calor)",
        impact: "CRITICO",
        deadline: "IMEDIATO",
        category: "Operacional",
      },
      {
        id: 402,
        title: "Expurgo Preventivo",
        impact: "ALTO",
        deadline: "Amanhã",
        category: "Sanitário",
      },
    ],
  },
];

// --- COMPONENTES VISUAIS ---

// Helper para cores de Impacto
const getImpactColor = (impact: ImpactLevel) => {
  switch (impact) {
    case "CRITICO":
      return "bg-red-500 text-white border-red-700";
    case "ALTO":
      return "bg-orange-500 text-white border-orange-700";
    case "MEDIO":
      return "bg-yellow-500 text-slate-900 border-yellow-600";
    case "BAIXO":
      return "bg-blue-500 text-white border-blue-700";
  }
};

// Helper para ícone de Tendência
const TrendIcon = ({ trend }: { trend: "up" | "down" | "stable" }) => {
  if (trend === "up")
    return <TrendingUp size={16} className="text-green-500" />;
  if (trend === "down")
    return <TrendingDown size={16} className="text-red-500" />;
  return <Minus size={16} className="text-slate-500" />;
};

// 1. Card de Zona (Agora focado em KPIs)
const ZoneCard = ({
  zone,
  onClick,
}: {
  zone: ZoneData;
  onClick: () => void;
}) => {
  const getIcon = () => {
    switch (zone.category) {
      case "AGRICULTURA":
        return <Sprout size={28} className="text-green-500" />;
      case "PECUARIA":
        return <Beef size={28} className="text-orange-500" />;
      case "MAQUINARIO":
        return <Tractor size={28} className="text-blue-500" />;
      case "ESTOQUE":
        return <Warehouse size={28} className="text-purple-500" />;
    }
  };

  // Cor da borda baseada no status geral
  const borderColor =
    zone.statusLabel === "CRITICO"
      ? "border-red-500"
      : zone.statusLabel === "ATENCAO"
        ? "border-yellow-500"
        : "border-slate-700 hover:border-blue-500";

  return (
    <div
      onClick={onClick}
      className={`group relative cursor-pointer rounded-xl border-2 bg-slate-800 p-5 transition-all hover:-translate-y-1 hover:shadow-2xl ${borderColor} `}
    >
      {/* Header do Card */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-slate-700 bg-slate-900 p-2.5">
            {getIcon()}
          </div>
          <div>
            <h3 className="text-lg font-bold leading-none text-slate-100">
              {zone.name}
            </h3>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              {zone.category}
            </p>
          </div>
        </div>

        {/* Indicador de Tendência (O "Status" visual) */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 rounded-sm border border-slate-700 bg-slate-900 px-2 py-1">
            <TrendIcon trend={zone.performanceTrend} />
            <span
              className={`text-xs font-bold ${zone.performanceTrend === "up" ? "text-green-500" : zone.performanceTrend === "down" ? "text-red-500" : "text-slate-500"}`}
            >
              {zone.statusLabel}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Principal */}
      <div className="mb-4 flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-3">
        <div>
          <p className="text-xs text-slate-400">{zone.details.metric_label}</p>
          <p className="text-lg font-bold text-white">
            {zone.details.metric_value}{" "}
            <span className="text-xs font-normal text-slate-500">
              {zone.details.metric_unit}
            </span>
          </p>
        </div>
        <Activity size={20} className="text-slate-600 opacity-50" />
      </div>

      {/* Barra de Eficiência Operacional */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-slate-400">Eficiência Operacional</span>
          <span
            className={zone.efficiency < 70 ? "text-red-400" : "text-green-400"}
          >
            {zone.efficiency}%
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-900">
          <div
            className={`h-full transition-all duration-500 ${
              zone.efficiency < 60
                ? "bg-red-500"
                : zone.efficiency < 85
                  ? "bg-yellow-500"
                  : "bg-green-500"
            }`}
            style={{ width: `${zone.efficiency}%` }}
          />
        </div>
      </div>

      {/* Alertas Críticos (Impacto) */}
      {zone.activeTasks.some((t) => t.impact === "CRITICO") && (
        <div className="mt-4 flex animate-pulse items-center gap-2 rounded-sm border border-red-900/50 bg-red-950/30 p-2 text-xs font-bold text-red-400">
          <AlertOctagon size={14} />
          Ação Crítica Necessária
        </div>
      )}
    </div>
  );
};

// 2. Quadro de Gestão de Tarefas (Prioridade de Negócio)
const BusinessTaskBoard = ({ zones }: { zones: ZoneData[] }) => {
  const allTasks = zones.flatMap((z) =>
    z.activeTasks.map((t) => ({ ...t, zoneName: z.name })),
  );

  const TaskCard = ({ task }: { task: (typeof allTasks)[0] }) => (
    <div className="group cursor-pointer rounded-lg border border-slate-700 bg-slate-800 p-4 shadow-xs transition-colors hover:border-slate-500">
      <div className="mb-2 flex items-start justify-between">
        <span
          className={`rounded-sm border px-2 py-0.5 text-[10px] font-bold ${getImpactColor(task.impact)}`}
        >
          IMPACTO {task.impact}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Clock size={12} /> {task.deadline}
        </span>
      </div>

      <p className="mb-1 text-sm font-bold text-slate-200 group-hover:text-white">
        {task.title}
      </p>

      <div className="mt-3 flex items-center justify-between border-t border-slate-700/50 pt-3">
        <span className="text-xs text-slate-500">{task.zoneName}</span>
        <span className="rounded-sm bg-slate-900 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600">
          {task.category}
        </span>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Gestão de Prioridades
          </h1>
          <p className="text-slate-400">
            Matriz de Urgência e Impacto Operacional
          </p>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <div className="h-3 w-3 rounded-xs bg-red-500"></div> Crítico
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <div className="h-3 w-3 rounded-xs bg-orange-500"></div> Alto Risco
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Coluna 1: RISCO IMEDIATO (Crítico) */}
        <div className="rounded-xl border border-red-900/30 bg-slate-900/50 p-1">
          <div className="flex items-center justify-between rounded-t-lg border-b border-red-900/30 bg-red-950/20 p-3">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-red-400">
              <AlertOctagon size={16} /> Risco Imediato
            </h3>
            <span className="rounded-full bg-red-900 px-2 text-xs text-red-200">
              {allTasks.filter((t) => t.impact === "CRITICO").length}
            </span>
          </div>
          <div className="space-y-3 p-3">
            {allTasks
              .filter((t) => t.impact === "CRITICO")
              .map((t) => (
                <TaskCard key={t.id} task={t} />
              ))}
            {allTasks.filter((t) => t.impact === "CRITICO").length === 0 && (
              <div className="py-10 text-center text-sm text-slate-600">
                Nenhum risco crítico detectado.
              </div>
            )}
          </div>
        </div>

        {/* Coluna 2: ATENÇÃO NECESSÁRIA (Alto/Médio) */}
        <div className="rounded-xl border border-orange-900/30 bg-slate-900/50 p-1">
          <div className="flex items-center justify-between rounded-t-lg border-b border-orange-900/30 bg-orange-950/20 p-3">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-400">
              <AlertTriangle size={16} /> Atenção Necessária
            </h3>
            <span className="rounded-full bg-orange-900 px-2 text-xs text-orange-200">
              {
                allTasks.filter(
                  (t) => t.impact === "ALTO" || t.impact === "MEDIO",
                ).length
              }
            </span>
          </div>
          <div className="space-y-3 p-3">
            {allTasks
              .filter((t) => t.impact === "ALTO" || t.impact === "MEDIO")
              .map((t) => (
                <TaskCard key={t.id} task={t} />
              ))}
          </div>
        </div>

        {/* Coluna 3: PLANEJAMENTO (Baixo) */}
        <div className="rounded-xl border border-blue-900/30 bg-slate-900/50 p-1">
          <div className="flex items-center justify-between rounded-t-lg border-b border-blue-900/30 bg-blue-950/20 p-3">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-400">
              <ClipboardList size={16} /> Planejamento
            </h3>
            <span className="rounded-full bg-blue-900 px-2 text-xs text-blue-200">
              {allTasks.filter((t) => t.impact === "BAIXO").length}
            </span>
          </div>
          <div className="space-y-3 p-3">
            {allTasks
              .filter((t) => t.impact === "BAIXO")
              .map((t) => (
                <TaskCard key={t.id} task={t} />
              ))}
            <div className="cursor-pointer rounded-lg border border-dashed border-slate-700 bg-slate-800/50 p-4 text-center text-sm text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-300">
              + Agendar Manutenção
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- APP PRINCIPAL ---

export default function ModeloGemini() {
  const [currentView, setCurrentView] = useState<"map" | "tasks">("map");

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-950 font-sans text-slate-100">
      {/* HUD Superior (Business Intelligence Header) */}
      <header className="z-50 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6 shadow-md">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-linear-to-br from-green-600 to-green-800 p-2 shadow-lg">
            <Sprout className="text-white" size={20} />
          </div>
          <div>
            <span className="block text-xl font-bold leading-none tracking-wide">
              ROOT<span className="text-green-500">GUARD</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Enterprise Edition
            </span>
          </div>
        </div>

        {/* Menu Central Profissional */}
        <nav className="hidden rounded-lg border border-slate-700/50 bg-slate-800/50 p-1 backdrop-blur-xs md:flex">
          <button
            onClick={() => setCurrentView("map")}
            className={`flex items-center gap-2 rounded-md px-5 py-2 text-sm font-bold transition-all ${currentView === "map" ? "bg-slate-700 text-white shadow-xs ring-1 ring-slate-600" : "text-slate-400 hover:text-white"}`}
          >
            <MapIcon size={16} /> Visão Operacional
          </button>
          <button
            onClick={() => setCurrentView("tasks")}
            className={`flex items-center gap-2 rounded-md px-5 py-2 text-sm font-bold transition-all ${currentView === "tasks" ? "bg-slate-700 text-white shadow-xs ring-1 ring-slate-600" : "text-slate-400 hover:text-white"}`}
          >
            <CheckCircle2 size={16} /> Gestão de Tarefas
          </button>
        </nav>

        {/* Índice Geral da Fazenda (Substitui Nível de Jogador) */}
        <div className="flex items-center gap-6">
          <div className="hidden border-r border-slate-700 pr-6 text-right md:block">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Índice Global de Eficiência
            </p>
            <div className="flex items-center justify-end gap-2">
              <span className="text-xl font-bold text-green-400">92.4%</span>
              <TrendingUp size={16} className="text-green-500" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-white">Fazenda Santa Fé</p>
              <p className="text-xs text-slate-400">Safra 24/25</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 bg-slate-800 font-bold text-slate-300 shadow-inner">
              SF
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="relative flex-1 overflow-hidden bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
        {/* VIEW: MAPA OPERACIONAL */}
        {currentView === "map" && (
          <div className="h-full overflow-y-auto p-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8 flex items-end justify-between border-b border-slate-800 pb-4">
                <div>
                  <h1 className="mb-1 text-3xl font-bold text-white">
                    Visão Geral da Operação
                  </h1>
                  <p className="text-slate-400">
                    Monitoramento em tempo real dos setores produtivos.
                  </p>
                </div>
                <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-blue-500">
                  <MoreHorizontal size={16} /> Ações Globais
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {MOCK_ZONES.map((zone) => (
                  <ZoneCard key={zone.id} zone={zone} onClick={() => {}} />
                ))}

                {/* Card "Nova Área" discreto */}
                <button className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 p-4 text-slate-600 transition-all hover:border-slate-600 hover:bg-slate-900/50 hover:text-slate-400">
                  <span className="text-sm font-bold">+ Adicionar Setor</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: GESTÃO DE TAREFAS (Business Board) */}
        {currentView === "tasks" && (
          <div className="h-full overflow-y-auto">
            <BusinessTaskBoard zones={MOCK_ZONES} />
          </div>
        )}
      </main>
    </div>
  );
}
