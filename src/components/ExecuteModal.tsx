'use client';

import React, { useState } from 'react';
import { ProjectConfig } from '@/types/project';
import { getBotInviteUrl } from '@/lib/discord-config';
import { 
  Bot, 
  Copy, 
  Check, 
  ExternalLink, 
  Terminal, 
  X, 
  Play, 
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ExecuteModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectConfig;
  onStartTestRun: () => void;
}

export const ExecuteModal: React.FC<ExecuteModalProps> = ({
  isOpen,
  onClose,
  project,
  onStartTestRun,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);

  if (!isOpen) return null;

  const activeClientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || '1558931518083174564';
  const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${activeClientId}&scope=bot%20applications.commands&permissions=8&state=${encodeURIComponent(`project:${project.code}:${project.id}`)}`;
  const slashCommand = `/iniciar codigo:${project.code}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(slashCommand);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#1E1F22] border border-[#2B2D31] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-5 p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2B2D31] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5865F2] to-[#8B5CF6] flex items-center justify-center text-white shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Executar Projeto no Discord</h2>
              <p className="text-xs text-[#949BA4]">Instruções de Conexão e Ativação Automática</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#949BA4] hover:text-white hover:bg-[#2B2D31] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Código Exclusivo em Destaque */}
        <div className="bg-[#111214] p-4 rounded-2xl border border-[#2B2D31] text-center space-y-2">
          <span className="text-[11px] uppercase tracking-wider font-bold text-[#949BA4] block">
            Código de Ativação Exclusivo do Projeto
          </span>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#57F287] tracking-wider">
              {project.code}
            </span>
            <button
              onClick={handleCopyCode}
              title="Copiar Código"
              className="p-2 rounded-xl bg-[#1E1F22] hover:bg-[#2B2D31] text-[#949BA4] hover:text-white border border-[#2B2D31] transition-colors"
            >
              {copiedCode ? <Check className="w-4 h-4 text-[#57F287]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-[#949BA4]">
            Este código é exclusivo para este projeto e protege contra execuções não autorizadas.
          </p>
        </div>

        {/* Passo a Passo de Execução */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Como Iniciar a Automação:
          </h3>

          <div className="space-y-3">
            {/* Passo 1 */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#2B2D31] border border-[#35373C]">
              <div className="w-6 h-6 rounded-full bg-[#5865F2] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Adicione o Bot ao Servidor</span>
                  <a
                    href={inviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold px-3 py-1 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Convidar Bot Oficial</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-xs text-[#949BA4] mt-1">
                  Autorize o bot oficial com permissão para gerenciar cargos e canais no servidor desejado.
                </p>
              </div>
            </div>

            {/* Passo 2 */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#2B2D31] border border-[#35373C]">
              <div className="w-6 h-6 rounded-full bg-[#5865F2] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                2
              </div>
              <div className="flex-1">
                <span className="text-sm font-bold text-white block mb-1">
                  Execute o Comando no Chat do Discord
                </span>
                <div className="flex items-center justify-between bg-[#111214] px-3 py-2 rounded-xl border border-[#1E1F22] mt-1.5">
                  <code className="text-xs font-mono text-[#5865F2] font-bold">
                    {slashCommand}
                  </code>
                  <button
                    onClick={handleCopyCommand}
                    className="p-1 text-[#949BA4] hover:text-white rounded transition-colors"
                    title="Copiar Comando"
                  >
                    {copiedCommand ? (
                      <Check className="w-4 h-4 text-[#57F287]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-[#949BA4] mt-1.5">
                  Digite o comando em qualquer canal do servidor. O bot iniciará a criação sequencial imediata.
                </p>
              </div>
            </div>

            {/* Passo 3 */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#2B2D31] border border-[#35373C]">
              <div className="w-6 h-6 rounded-full bg-[#5865F2] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                3
              </div>
              <div className="flex-1">
                <span className="text-sm font-bold text-white block">
                  Acompanhe a Criação em Tempo Real
                </span>
                <p className="text-xs text-[#949BA4] mt-1">
                  A barra de progresso no painel web e as mensagens do bot serão atualizadas conforme cada cargo e canal forem criados.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé com Botão de Teste Direto */}
        <div className="pt-2 border-t border-[#2B2D31] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onStartTestRun}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#111214] hover:bg-[#2B2D31] text-xs font-semibold text-[#57F287] border border-[#2B2D31] hover:border-[#57F287]/40 flex items-center justify-center gap-2 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Testar Execução Instantânea (Simular Bot)</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold transition-all shadow-md"
          >
            Entendido, Ir para Acompanhamento
          </button>
        </div>
      </div>
    </div>
  );
};
