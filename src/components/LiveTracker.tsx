'use client';

import React, { useEffect, useState } from 'react';
import { ProjectConfig, ExecutionLog } from '@/types/project';
import { 
  Bot, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Layers, 
  Hash, 
  ShieldCheck, 
  RotateCw,
  Sparkles,
  Terminal,
  Activity
} from 'lucide-react';

interface LiveTrackerProps {
  project: ProjectConfig;
  onRefreshProject: () => void;
  onRunTest: () => void;
}

export const LiveTracker: React.FC<LiveTrackerProps> = ({
  project,
  onRefreshProject,
  onRunTest,
}) => {
  const [autoPoll, setAutoPoll] = useState(true);

  // Polling automático enquanto o projeto estiver 'pending_activation' ou 'running'
  useEffect(() => {
    if (!autoPoll) return;
    if (project.status !== 'running' && project.status !== 'pending_activation') return;

    const interval = setInterval(() => {
      onRefreshProject();
    }, 2000);

    return () => clearInterval(interval);
  }, [autoPoll, project.status, onRefreshProject]);

  const percent = project.progress?.percent || 0;
  const isCompleted = project.status === 'completed';
  const isRunning = project.status === 'running';
  const isPending = project.status === 'pending_activation';
  const isError = project.status === 'error';

  // Sub-etapas
  const rolesDone = (project.progress?.rolesCreated || 0) >= (project.progress?.totalRoles || 1) && percent >= 35;
  const categoriesDone = (project.progress?.categoriesCreated || 0) >= (project.progress?.totalCategories || 1) && percent >= 50;
  const channelsDone = (project.progress?.channelsCreated || 0) >= (project.progress?.totalChannels || 1) && percent >= 95;

  return (
    <div className="bg-[#1E1F22] border border-[#2B2D31] rounded-2xl p-6 space-y-6 shadow-xl animate-fadeIn">
      {/* Header do Tracker */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#2B2D31] pb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md ${
              isCompleted
                ? 'bg-[#57F287]/20 text-[#57F287] border border-[#57F287]/30'
                : isRunning
                ? 'bg-[#5865F2] animate-pulse'
                : isError
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-[#2B2D31] text-[#949BA4]'
            }`}
          >
            {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">Configurando seu Servidor</h2>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  isCompleted
                    ? 'bg-[#57F287]/20 text-[#57F287] border-[#57F287]/30'
                    : isRunning
                    ? 'bg-[#5865F2]/20 text-[#5865F2] border-[#5865F2]/30 animate-pulse'
                    : isError
                    ? 'bg-red-500/20 text-red-400 border-red-500/30'
                    : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                }`}
              >
                {project.status === 'draft' && 'Rascunho'}
                {project.status === 'pending_activation' && 'Aguardando Ativação'}
                {project.status === 'running' && 'Em Execução'}
                {project.status === 'completed' && 'Concluído'}
                {project.status === 'error' && 'Erro'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#949BA4] mt-0.5">
              <span>Projeto: <strong className="font-mono text-white">{project.code}</strong></span>
              {project.guildName && <span>• Servidor: <strong className="text-white">{project.guildName}</strong></span>}
            </div>
          </div>
        </div>

        {/* Botão de atualizar status manual */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRefreshProject}
            className="p-2 rounded-xl bg-[#2B2D31] hover:bg-[#35373C] text-[#949BA4] hover:text-white transition-colors"
            title="Atualizar Status"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Barra de Progresso Geral */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#5865F2]" />
            {project.progress?.stage || 'Aguardando Início'}
          </span>
          <span className="font-mono font-extrabold text-lg text-[#5865F2]">{percent}%</span>
        </div>

        <div className="w-full h-3.5 bg-[#111214] rounded-full overflow-hidden p-0.5 border border-[#2B2D31]">
          <div
            className={`h-full rounded-full transition-all duration-500 shadow-lg ${
              isCompleted
                ? 'bg-gradient-to-r from-[#57F287] to-[#10B981]'
                : isError
                ? 'bg-red-500'
                : 'bg-gradient-to-r from-[#5865F2] to-[#8B5CF6]'
            }`}
            style={{ width: `${Math.max(percent, 3)}%` }}
          />
        </div>
      </div>

      {/* 4 Cards de Etapas Clássicas do Prompt */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cargos */}
        <div className="p-4 rounded-xl bg-[#111214] border border-[#2B2D31] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#949BA4] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#5865F2]" />
              Cargos
            </span>
            <span className="text-xs font-mono font-bold text-white">
              {project.progress?.rolesCreated || 0}/{project.progress?.totalRoles || project.roles.length}
            </span>
          </div>
          <p className="text-xs text-[#DBDEE1]">
            {rolesDone || isCompleted
              ? 'Cargos criados com sucesso.'
              : isRunning
              ? 'Criando cargos e cores...'
              : 'Aguardando início.'}
          </p>
        </div>

        {/* Categorias */}
        <div className="p-4 rounded-xl bg-[#111214] border border-[#2B2D31] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#949BA4] flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#5865F2]" />
              Categorias
            </span>
            <span className="text-xs font-mono font-bold text-white">
              {project.progress?.categoriesCreated || 0}/{project.progress?.totalCategories || project.categories.length}
            </span>
          </div>
          <p className="text-xs text-[#DBDEE1]">
            {categoriesDone || isCompleted
              ? 'Categorias criadas com sucesso.'
              : isRunning && rolesDone
              ? 'Criando categorias organizadas...'
              : 'Aguardando etapa anterior.'}
          </p>
        </div>

        {/* Canais */}
        <div className="p-4 rounded-xl bg-[#111214] border border-[#2B2D31] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#949BA4] flex items-center gap-1.5">
              <Hash className="w-4 h-4 text-[#5865F2]" />
              Canais
            </span>
            <span className="text-xs font-mono font-bold text-white">
              {project.progress?.channelsCreated || 0}/{project.progress?.totalChannels || 0}
            </span>
          </div>
          <p className="text-xs text-[#DBDEE1]">
            {channelsDone || isCompleted
              ? 'Canais de texto e voz criados.'
              : isRunning && categoriesDone
              ? 'Criando canais de texto e voz...'
              : 'Aguardando etapa anterior.'}
          </p>
        </div>

        {/* Permissões */}
        <div className="p-4 rounded-xl bg-[#111214] border border-[#2B2D31] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#949BA4] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#5865F2]" />
              Permissões
            </span>
            <span className="text-xs font-mono font-bold text-white">
              {isCompleted ? '100%' : 'Seguras'}
            </span>
          </div>
          <p className="text-xs text-[#DBDEE1]">
            {isCompleted
              ? 'Permissões aplicadas com sucesso.'
              : isRunning
              ? 'Sincronizando permissões por cargo...'
              : 'Aguardando a conclusão da etapa anterior.'}
          </p>
        </div>
      </div>

      {/* Terminal de Logs em Tempo Real */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#949BA4] flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#57F287]" />
            Logs de Execução em Tempo Real
          </span>
          <span className="text-[11px] text-[#949BA4]">
            {project.progress?.logs?.length || 0} eventos registrados
          </span>
        </div>

        <div className="bg-[#111214] p-4 rounded-xl border border-[#2B2D31] max-h-48 overflow-y-auto space-y-2 font-mono text-xs">
          {project.progress?.logs && project.progress.logs.length > 0 ? (
            project.progress.logs.map((log: ExecutionLog, idx: number) => (
              <div key={idx} className="flex items-start gap-2 text-[#949BA4]">
                <span className="text-[#5C5E66] select-none flex-shrink-0">
                  [{new Date(log.timestamp).toLocaleTimeString()}]
                </span>
                <span className={log.isError ? 'text-red-400 font-bold' : 'text-[#DBDEE1]'}>
                  {log.message}
                </span>
              </div>
            ))
          ) : (
            <div className="text-[#5C5E66] italic py-2 text-center">
              Nenhum evento registrado ainda. Execute o comando `/iniciar` no Discord ou clique em testar.
            </div>
          )}
        </div>
      </div>

      {/* Rodapé com Informações de Horário e Ações */}
      <div className="pt-2 border-t border-[#2B2D31] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#949BA4]">
        <div className="flex items-center gap-4">
          {project.executedAt && (
            <span>Início: <strong>{new Date(project.executedAt).toLocaleTimeString()}</strong></span>
          )}
          {project.completedAt && (
            <span>Conclusão: <strong>{new Date(project.completedAt).toLocaleTimeString()}</strong></span>
          )}
        </div>

        {/* Retomar ou reexecutar */}
        <button
          onClick={onRunTest}
          className="px-4 py-2 rounded-xl bg-[#2B2D31] hover:bg-[#35373C] text-white font-semibold transition-colors flex items-center gap-2"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>{isCompleted ? 'Executar Novamente' : 'Disparar Execução de Teste'}</span>
        </button>
      </div>
    </div>
  );
};
