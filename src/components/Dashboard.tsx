'use client';

import React from 'react';
import { ProjectConfig } from '@/types/project';
import { getBotInviteUrl } from '@/lib/discord-config';
import { 
  Plus, 
  Play, 
  Eye, 
  Edit, 
  Copy, 
  Trash2, 
  ExternalLink, 
  Calendar, 
  FolderKanban, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Sparkles,
  Bot
} from 'lucide-react';

interface DashboardProps {
  projects: ProjectConfig[];
  onSelectProject: (project: ProjectConfig, targetTab?: 'builder' | 'preview') => void;
  onDuplicateProject: (id: string) => void;
  onDeleteProject: (id: string) => void;
  onNewProject: () => void;
  onExecuteProject: (project: ProjectConfig) => void;
}

const getStatusBadge = (status: ProjectConfig['status']) => {
  switch (status) {
    case 'completed':
      return {
        label: 'Concluído',
        className: 'bg-[#57F287]/20 text-[#57F287] border-[#57F287]/30',
        icon: CheckCircle2,
      };
    case 'running':
      return {
        label: 'Em Execução',
        className: 'bg-[#5865F2]/20 text-[#5865F2] border-[#5865F2]/30 animate-pulse',
        icon: Bot,
      };
    case 'pending_activation':
      return {
        label: 'Aguardando Ativação',
        className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        icon: Clock,
      };
    case 'error':
      return {
        label: 'Erro',
        className: 'bg-red-500/20 text-red-400 border-red-500/30',
        icon: AlertCircle,
      };
    case 'draft':
    default:
      return {
        label: 'Rascunho',
        className: 'bg-[#949BA4]/20 text-[#DBDEE1] border-[#949BA4]/30',
        icon: FolderKanban,
      };
  }
};

export const Dashboard: React.FC<DashboardProps> = ({
  projects,
  onSelectProject,
  onDuplicateProject,
  onDeleteProject,
  onNewProject,
  onExecuteProject,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header do Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#1E1F22] p-6 rounded-2xl border border-[#2B2D31]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/30">
              Painel Geral
            </span>
            <span className="text-xs text-[#949BA4]">Gerenciamento de Servidores</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Meus Projetos de Servidores</h2>
          <p className="text-sm text-[#949BA4] mt-1">
            Administre suas configurações, acesse links de convite dos bots, duplique ou execute novamente.
          </p>
        </div>

        <button
          onClick={onNewProject}
          className="px-5 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium flex items-center gap-2 transition-all shadow-md shadow-[#5865F2]/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Novo Servidor</span>
        </button>
      </div>

      {/* Grid de Cards de Projetos */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => {
            const statusInfo = getStatusBadge(proj.status);
            const StatusIcon = statusInfo.icon;
            const inviteUrl = getBotInviteUrl(proj.code, proj.id);

            return (
              <div
                key={proj.id}
                className="bg-[#1E1F22] border border-[#2B2D31] hover:border-[#35373C] rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-xl space-y-5 group"
              >
                <div>
                  {/* Topo do Card: Logo + Título + Status */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 shadow-md text-white font-bold border border-white/10"
                        style={{ backgroundColor: proj.identity.primaryColor || '#5865F2' }}
                      >
                        {proj.identity.iconUrl ? (
                          <img
                            src={proj.identity.iconUrl}
                            alt="Logo"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          proj.identity.name.substring(0, 2).toUpperCase()
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="font-bold text-base text-white truncate group-hover:text-[#5865F2] transition-colors">
                          {proj.identity.name}
                        </h3>
                        <span className="text-xs text-[#949BA4] capitalize">
                          Modelo: {proj.templateType}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border flex items-center gap-1 flex-shrink-0 ${statusInfo.className}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusInfo.label}
                    </span>
                  </div>

                  {/* Detalhes do Projeto */}
                  <div className="bg-[#111214] p-3.5 rounded-xl border border-[#2B2D31] space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#949BA4]">Código Exclusivo:</span>
                      <span className="font-mono font-bold text-[#57F287]">{proj.code}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#949BA4]">Criação:</span>
                      <span className="text-[#DBDEE1]">
                        {new Date(proj.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#949BA4]">Estrutura:</span>
                      <span className="text-[#DBDEE1]">
                        {proj.roles.length} Cargos • {proj.categories.length} Categorias
                      </span>
                    </div>
                  </div>

                  {/* Link do Bot Associado */}
                  <div className="mb-4">
                    <a
                      href={inviteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#5865F2] hover:text-[#7983F5] flex items-center gap-1 font-semibold"
                    >
                      <span>Link de convite do bot associado</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Barra de Botões de Ação */}
                <div className="pt-4 border-t border-[#2B2D31] space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectProject(proj, 'preview')}
                      className="px-3 py-2 rounded-xl bg-[#2B2D31] hover:bg-[#35373C] text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors border border-[#35373C]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Prévia
                    </button>
                    <button
                      onClick={() => onSelectProject(proj, 'builder')}
                      className="px-3 py-2 rounded-xl bg-[#2B2D31] hover:bg-[#35373C] text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors border border-[#35373C]"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Editar
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onExecuteProject(proj)}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Executar
                    </button>
                    <button
                      onClick={() => onDuplicateProject(proj.id)}
                      title="Duplicar Projeto"
                      className="p-2 rounded-xl bg-[#2B2D31] hover:bg-[#35373C] text-[#949BA4] hover:text-white transition-colors border border-[#35373C]"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteProject(proj.id)}
                      title="Excluir Projeto"
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors border border-red-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#1E1F22] rounded-2xl border border-[#2B2D31] p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#2B2D31] text-[#949BA4] flex items-center justify-center mx-auto">
            <FolderKanban className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">Nenhum Projeto Criado Ainda</h3>
          <p className="text-xs text-[#949BA4] max-w-md mx-auto">
            Comece escolhendo um dos 7 modelos prontos ou crie seu servidor personalizado a partir do zero.
          </p>
          <button
            onClick={onNewProject}
            className="px-5 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium text-xs transition-colors"
          >
            Criar Primeiro Projeto
          </button>
        </div>
      )}
    </div>
  );
};
