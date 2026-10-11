'use client';

import React, { useState } from 'react';
import { ProjectConfig, ChannelConfig } from '@/types/project';
import { applyStyleToName } from '@/lib/fonts';
import { 
  Hash, 
  Volume2, 
  Megaphone, 
  BookOpen, 
  FileText, 
  Ticket, 
  MessageSquare,
  Lock,
  ChevronDown, 
  ChevronRight, 
  Settings, 
  Users, 
  Bell, 
  Pin, 
  Inbox, 
  HelpCircle,
  Plus,
  Play,
  Save,
  Copy,
  Edit,
  Shield,
  Send,
  Sparkles,
  Bot
} from 'lucide-react';

interface StepPreviewProps {
  project: ProjectConfig;
  onEdit: () => void;
  onSave: () => void;
  onDuplicate: () => void;
  onExecute: () => void;
  isSaving?: boolean;
}

const getChannelIcon = (type: string) => {
  switch (type) {
    case 'voice':
      return Volume2;
    case 'announcement':
      return Megaphone;
    case 'rules':
      return BookOpen;
    case 'logs':
      return FileText;
    case 'ticket':
      return Ticket;
    case 'forum':
      return MessageSquare;
    case 'text':
    default:
      return Hash;
  }
};

export const StepPreview: React.FC<StepPreviewProps> = ({
  project,
  onEdit,
  onSave,
  onDuplicate,
  onExecute,
  isSaving,
}) => {
  // Encontrar primeiro canal
  const firstChannel = project.categories[0]?.channels[0] || null;
  const [selectedChannel, setSelectedChannel] = useState<ChannelConfig | null>(firstChannel);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [mockMessage, setMockMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ user: string; text: string; roleColor: string; time: string }>>([
    {
      user: 'AutoDiscord Bot',
      text: `Bem-vindo(a) à prévia do seu servidor "${project.identity.name}"! Este canal é um exemplo de como a estrutura ficará no Discord.`,
      roleColor: '#5865F2',
      time: 'Hoje às 12:00',
    },
  ]);

  const toggleCategory = (catId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mockMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        user: 'Você (Fundador)',
        text: mockMessage,
        roleColor: project.roles[0]?.color || '#5865F2',
        time: 'Hoje às ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setMockMessage('');
  };

  // Validação para habilitar botão de execução
  const canExecute = 
    project.identity.name.trim().length > 0 &&
    project.roles.length > 0 &&
    project.categories.length > 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Barra de Ações Superior */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#1E1F22] p-5 rounded-2xl border border-[#2B2D31]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#57F287]/20 text-[#57F287] border border-[#57F287]/30">
              Etapa 5 de 5
            </span>
            <span className="text-xs text-[#949BA4]">Simulador Hiper-Realista</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Prévia Interativa do Servidor</h2>
          <p className="text-xs text-[#949BA4]">
            Veja exatamente como os canais, categorias, cores e hierarquia de cargos aparecerão no aplicativo do Discord.
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onEdit}
            className="px-3.5 py-2 rounded-xl bg-[#2B2D31] hover:bg-[#35373C] text-xs font-semibold text-white flex items-center gap-1.5 transition-all border border-[#35373C]"
          >
            <Edit className="w-3.5 h-3.5" />
            Editar
          </button>

          <button
            onClick={onSave}
            disabled={isSaving}
            className="px-3.5 py-2 rounded-xl bg-[#2B2D31] hover:bg-[#35373C] text-xs font-semibold text-[#57F287] flex items-center gap-1.5 transition-all border border-[#35373C]"
          >
            <Save className="w-3.5 h-3.5" />
            {isSaving ? 'Salvando...' : 'Salvar'}
          </button>

          <button
            onClick={onDuplicate}
            className="px-3.5 py-2 rounded-xl bg-[#2B2D31] hover:bg-[#35373C] text-xs font-semibold text-white flex items-center gap-1.5 transition-all border border-[#35373C]"
          >
            <Copy className="w-3.5 h-3.5" />
            Duplicar
          </button>

          <button
            onClick={onExecute}
            disabled={!canExecute}
            className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg ${
              canExecute
                ? 'bg-gradient-to-r from-[#5865F2] to-[#8B5CF6] hover:from-[#4752C4] hover:to-[#7C3AED] text-white shadow-[#5865F2]/25 ring-2 ring-[#5865F2]/30'
                : 'bg-[#2B2D31] text-[#949BA4] cursor-not-allowed opacity-50'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Executar Projeto</span>
          </button>
        </div>
      </div>

      {/* MOCKUP DO DISCORD */}
      <div className="w-full bg-[#1E1F22] rounded-2xl border border-[#2B2D31] overflow-hidden shadow-2xl flex flex-col min-h-[640px]">
        {/* Barra de Janela Superior Estilo Discord */}
        <div className="h-7 bg-[#1E1F22] border-b border-[#111214] px-4 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ED4245]" />
            <div className="w-3 h-3 rounded-full bg-[#FEE75C]" />
            <div className="w-3 h-3 rounded-full bg-[#57F287]" />
            <span className="text-[11px] font-medium text-[#949BA4] ml-2">
              Discord • {project.identity.name}
            </span>
          </div>
          <span className="text-[10px] text-[#5C5E66] font-mono">Simulador 2026</span>
        </div>

        {/* Corpo Principal da Interface Discord */}
        <div className="flex-1 flex overflow-hidden">
          {/* 1. Barra de Servidores (Esquerda estreita) */}
          <div className="w-[72px] bg-[#1E1F22] flex flex-col items-center py-3 gap-3 border-r border-[#111214] flex-shrink-0">
            {/* Ícone Direct Messages */}
            <div className="w-12 h-12 rounded-3xl bg-[#313338] hover:rounded-2xl hover:bg-[#5865F2] text-white flex items-center justify-center cursor-pointer transition-all duration-200 shadow">
              <Bot className="w-6 h-6" />
            </div>

            <div className="w-8 h-[2px] bg-[#35373C] rounded" />

            {/* Ícone do Servidor Ativo */}
            <div className="relative group">
              <div className="absolute -left-3 top-2 w-1.5 h-8 bg-white rounded-r-full" />
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer shadow-lg border-2 border-white/20 transition-all transform hover:scale-105"
                style={{ backgroundColor: project.identity.primaryColor || '#5865F2' }}
              >
                {project.identity.iconUrl ? (
                  <img
                    src={project.identity.iconUrl}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-extrabold text-white text-base">
                    {project.identity.name.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {/* Ícone de Adicionar Servidor */}
            <div className="w-12 h-12 rounded-3xl bg-[#313338] hover:rounded-2xl hover:bg-[#57F287] hover:text-[#111214] text-[#57F287] flex items-center justify-center cursor-pointer transition-all duration-200">
              <Plus className="w-6 h-6" />
            </div>
          </div>

          {/* 2. Coluna de Canais e Categorias */}
          <div className="w-60 bg-[#2B2D31] flex flex-col flex-shrink-0 border-r border-[#1E1F22]">
            {/* Header do Servidor */}
            <div className="h-12 px-4 border-b border-[#1E1F22] flex items-center justify-between shadow-sm hover:bg-[#35373C]/40 cursor-pointer transition-colors">
              <h3 className="font-bold text-sm text-white truncate">
                {project.identity.name}
              </h3>
              <ChevronDown className="w-4 h-4 text-[#949BA4]" />
            </div>

            {/* Lista de Categorias e Canais com Scroll */}
            <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
              {project.categories.map((cat) => {
                const isCollapsed = !!collapsedCategories[cat.id];
                const catNameStyled = applyStyleToName(cat.name, project.identity.fontStyle, {
                  isCategory: true,
                  customSeparator: project.identity.customSeparator,
                });

                return (
                  <div key={cat.id} className="space-y-0.5">
                    {/* Header Categoria */}
                    <div
                      onClick={() => toggleCategory(cat.id)}
                      className="flex items-center gap-1 px-1 py-1 text-[#949BA4] hover:text-[#DBDEE1] cursor-pointer text-[11px] font-bold uppercase tracking-wider select-none group"
                    >
                      {isCollapsed ? (
                        <ChevronRight className="w-3 h-3 transition-transform" />
                      ) : (
                        <ChevronDown className="w-3 h-3 transition-transform" />
                      )}
                      <span className="truncate flex-1">{cat.name}</span>
                      {cat.isPrivate && <Lock className="w-3 h-3 text-[#949BA4]" />}
                    </div>

                    {/* Canais */}
                    {!isCollapsed && (
                      <div className="space-y-[1px]">
                        {cat.channels.map((ch) => {
                          const Icon = getChannelIcon(ch.type);
                          const isVoice = ch.type === 'voice';
                          const isSelected = selectedChannel?.id === ch.id;

                          return (
                            <div
                              key={ch.id}
                              onClick={() => setSelectedChannel(ch)}
                              className={`flex items-center justify-between px-2 py-1.5 rounded-md text-xs cursor-pointer select-none transition-colors group ${
                                isSelected
                                  ? 'bg-[#35373C] text-white font-medium'
                                  : 'text-[#949BA4] hover:bg-[#35373C]/60 hover:text-[#DBDEE1]'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <Icon
                                  className={`w-4 h-4 flex-shrink-0 ${
                                    isVoice ? 'text-[#57F287]' : 'text-[#80848E]'
                                  }`}
                                />
                                <span className="truncate">{ch.name}</span>
                              </div>

                              <div className="flex items-center gap-1">
                                {isVoice && typeof ch.userLimit === 'number' && ch.userLimit > 0 && (
                                  <span className="text-[10px] bg-[#1E1F22] text-[#949BA4] px-1 rounded font-mono">
                                    0/{ch.userLimit}
                                  </span>
                                )}
                                {ch.isPrivate && <Lock className="w-3 h-3 text-[#949BA4]" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Painel de Usuário Conectado */}
            <div className="h-14 bg-[#232428] px-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center font-bold text-white text-xs">
                    U
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#57F287] border-2 border-[#232428]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-white">Você</div>
                  <div className="text-[10px] text-[#949BA4]">#0001</div>
                </div>
              </div>
              <Settings className="w-4 h-4 text-[#949BA4] hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* 3. Área Central de Chat */}
          <div className="flex-1 bg-[#313338] flex flex-col overflow-hidden">
            {/* Header do Canal Atual */}
            <div className="h-12 px-4 border-b border-[#1F2023] flex items-center justify-between bg-[#313338]">
              <div className="flex items-center gap-2 overflow-hidden">
                {selectedChannel ? (
                  <>
                    {selectedChannel.type === 'voice' ? (
                      <Volume2 className="w-5 h-5 text-[#57F287]" />
                    ) : (
                      <Hash className="w-5 h-5 text-[#80848E]" />
                    )}
                    <span className="font-bold text-sm text-white truncate">
                      {selectedChannel.name}
                    </span>
                    {selectedChannel.topic && (
                      <>
                        <div className="w-[1px] h-4 bg-[#4E5058] mx-2" />
                        <span className="text-xs text-[#949BA4] truncate max-w-md hidden sm:inline">
                          {selectedChannel.topic}
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <span className="text-sm font-semibold text-white">Selecione um Canal</span>
                )}
              </div>

              <div className="flex items-center gap-4 text-[#B5BAC1]">
                <Bell className="w-4 h-4 hover:text-white cursor-pointer" />
                <Pin className="w-4 h-4 hover:text-white cursor-pointer" />
                <Users className="w-4 h-4 hover:text-white cursor-pointer" />
                <Inbox className="w-4 h-4 hover:text-white cursor-pointer" />
                <HelpCircle className="w-4 h-4 hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* Mensagens do Canal */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Banner de Boas-Vindas do Canal */}
              <div className="pt-6 pb-4 border-b border-[#3F4147]">
                <div className="w-16 h-16 rounded-full bg-[#35373C] flex items-center justify-center text-white mb-2">
                  <Hash className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Bem-vindo ao canal {selectedChannel?.name || 'do Servidor'}!
                </h2>
                <p className="text-xs text-[#949BA4] mt-1">
                  Este é o início do canal {selectedChannel?.name}.
                </p>
              </div>

              {/* Lista de Mensagens */}
              {messages.map((m, i) => (
                <div key={i} className="flex items-start gap-3 hover:bg-[#2E3035] -mx-4 px-4 py-1.5 rounded">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: m.roleColor }}
                  >
                    {m.user.substring(0, 1)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold" style={{ color: m.roleColor }}>
                        {m.user}
                      </span>
                      <span className="text-[10px] text-[#949BA4]">{m.time}</span>
                    </div>
                    <p className="text-xs text-[#DBDEE1] mt-0.5 leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Campo de Enviar Mensagem Interativo */}
            <div className="p-4 bg-[#313338]">
              <form
                onSubmit={handleSendMessage}
                className="bg-[#383A40] rounded-lg px-4 py-2.5 flex items-center gap-3"
              >
                <input
                  type="text"
                  value={mockMessage}
                  onChange={(e) => setMockMessage(e.target.value)}
                  placeholder={`Conversar em #${selectedChannel?.name || 'geral'}...`}
                  className="bg-transparent text-xs text-white placeholder-[#80848E] focus:outline-none flex-1"
                />
                <button
                  type="submit"
                  className="text-[#949BA4] hover:text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* 4. Coluna da Direita: Lista de Cargos e Membros */}
          <div className="w-56 bg-[#2B2D31] flex-col hidden lg:flex border-l border-[#1E1F22] overflow-y-auto p-3 space-y-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#949BA4] px-1">
              Hierarquia de Cargos ({project.roles.length})
            </div>

            {project.roles.map((role) => (
              <div key={role.id} className="space-y-1">
                {/* Nome do Cargo com Contagem */}
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#949BA4] px-1">
                  <span className="truncate" style={{ color: role.color }}>
                    {role.name}
                  </span>
                  <span className="font-mono text-[10px]">1</span>
                </div>

                {/* Membro simulado pertencente ao cargo */}
                <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-[#35373C] cursor-pointer">
                  <div className="relative">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm"
                      style={{ backgroundColor: role.color }}
                    >
                      {role.name.substring(0, 1)}
                    </div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#57F287] border border-[#2B2D31]" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-semibold truncate" style={{ color: role.color }}>
                      {role.name.replace(/[^a-zA-Z0-9\s]/g, '').trim() || 'Membro'}
                    </div>
                    <div className="text-[9px] text-[#949BA4]">Online</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
