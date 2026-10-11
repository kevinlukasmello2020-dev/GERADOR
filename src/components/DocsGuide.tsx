'use client';

import React from 'react';
import { 
  Bot, 
  Terminal, 
  ShieldCheck, 
  Key, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle,
  Code
} from 'lucide-react';

export const DocsGuide: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-[#1E1F22] p-6 rounded-2xl border border-[#2B2D31]">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/30">
            Documentação Técnica
          </span>
          <span className="text-xs text-[#949BA4]">Guia do Usuário e Desenvolvedor</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Como Funciona a Criação Automática de Servidores
        </h2>
        <p className="text-sm text-[#949BA4] mt-1">
          Instruções completas para configurar o bot Discord, executar projetos e entender a arquitetura de segurança.
        </p>
      </div>

      {/* Seção 1: Fluxo de Execução */}
      <div className="bg-[#1E1F22] p-6 rounded-2xl border border-[#2B2D31] space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#5865F2]" />
          1. Fluxo de Execução Passo a Passo
        </h3>

        <div className="space-y-3 text-sm text-[#DBDEE1]">
          <div className="flex items-start gap-3 p-3 bg-[#111214] rounded-xl border border-[#2B2D31]">
            <span className="w-6 h-6 rounded-full bg-[#5865F2] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
              1
            </span>
            <div>
              <strong className="text-white block">Criação do Projeto no Painel</strong>
              Escolha um dos 7 modelos ou crie do zero. Personalize cargos, cores, hierarquia, categorias, canais e salas de voz.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-[#111214] rounded-xl border border-[#2B2D31]">
            <span className="w-6 h-6 rounded-full bg-[#5865F2] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
              2
            </span>
            <div>
              <strong className="text-white block">Geração do Código Exclusivo</strong>
              Ao clicar em <em>Executar Projeto</em>, o sistema gera um código com formato único (ex: <code className="text-[#57F287] font-mono">DANONE-8X29-KP51</code>) e disponibiliza o link de convite do bot associado.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-[#111214] rounded-xl border border-[#2B2D31]">
            <span className="w-6 h-6 rounded-full bg-[#5865F2] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
              3
            </span>
            <div>
              <strong className="text-white block">Adição do Bot ao Servidor Discord</strong>
              Adicione o bot ao servidor desejado. É necessário que o bot tenha permissões para gerenciar cargos e canais.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-[#111214] rounded-xl border border-[#2B2D31]">
            <span className="w-6 h-6 rounded-full bg-[#5865F2] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
              4
            </span>
            <div>
              <strong className="text-white block">Disparo do Comando Slash</strong>
              Digite <code className="text-[#5865F2] font-mono font-bold">/iniciar codigo:DANONE-XXXX-XXXX</code>. O bot valida se o usuário possui permissão de Administrador ou Gerenciar Servidor, busca as configurações validadas e inicia a criação.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-[#111214] rounded-xl border border-[#2B2D31]">
            <span className="w-6 h-6 rounded-full bg-[#5865F2] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
              5
            </span>
            <div>
              <strong className="text-white block">Acompanhamento em Tempo Real</strong>
              O bot atualiza o progresso no Discord e envia eventos para o painel web, exibindo contadores de cargos, categorias, canais e logs instantâneos.
            </div>
          </div>
        </div>
      </div>

      {/* Seção 2: Configuração de Variáveis de Ambiente */}
      <div className="bg-[#1E1F22] p-6 rounded-2xl border border-[#2B2D31] space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Key className="w-5 h-5 text-[#5865F2]" />
          2. Variáveis de Ambiente (.env)
        </h3>
        <p className="text-xs text-[#949BA4]">
          Para conectar o seu próprio bot do Discord Developer Portal, crie um arquivo <code className="text-white">.env</code> na raiz do projeto com as chaves:
        </p>

        <pre className="p-4 rounded-xl bg-[#111214] border border-[#2B2D31] text-xs font-mono text-[#57F287] overflow-x-auto">
{`# Discord Developer Portal
DISCORD_BOT_TOKEN="seu_token_do_bot_aqui"
DISCORD_CLIENT_ID="seu_application_id_aqui"

# URL da API
NEXT_PUBLIC_API_URL="http://localhost:3000"
API_BASE_URL="http://localhost:3000"

# Permissões do Bot (8 = Administrador, ou 268487712 para permissões personalizadas)
DISCORD_BOT_PERMISSIONS="8"`}
        </pre>
      </div>

      {/* Seção 3: Comandos do Terminal */}
      <div className="bg-[#1E1F22] p-6 rounded-2xl border border-[#2B2D31] space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Code className="w-5 h-5 text-[#5865F2]" />
          3. Como Iniciar os Processos
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-[#111214] rounded-xl border border-[#2B2D31] space-y-2">
            <span className="text-xs font-bold text-white block">1. Iniciar o Painel Web (Next.js)</span>
            <code className="text-xs font-mono text-[#5865F2] block bg-[#1E1F22] p-2 rounded">
              npm run dev
            </code>
            <p className="text-[11px] text-[#949BA4]">
              Acesse em <a href="http://localhost:3000" target="_blank" className="underline text-white">http://localhost:3000</a>
            </p>
          </div>

          <div className="p-4 bg-[#111214] rounded-xl border border-[#2B2D31] space-y-2">
            <span className="text-xs font-bold text-white block">2. Iniciar o Bot Discord</span>
            <code className="text-xs font-mono text-[#57F287] block bg-[#1E1F22] p-2 rounded">
              npm run bot
            </code>
            <p className="text-[11px] text-[#949BA4]">
              Conecta ao Discord Gateway e escuta o comando <code className="text-white">/iniciar</code>
            </p>
          </div>
        </div>
      </div>

      {/* Seção 4: Segurança */}
      <div className="bg-[#1E1F22] p-6 rounded-2xl border border-[#2B2D31] space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#5865F2]" />
          4. Diretrizes de Segurança Implementadas
        </h3>

        <ul className="space-y-2 text-xs text-[#DBDEE1]">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#57F287] flex-shrink-0" />
            <span><strong>Nenhum Token no Navegador:</strong> Todos os segredos do bot ficam estritamente no backend.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#57F287] flex-shrink-0" />
            <span><strong>Proteção contra Administrador Indevido:</strong> Cargos comuns não recebem permissão de administrador por padrão.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#57F287] flex-shrink-0" />
            <span><strong>Respeito a Rate Limits:</strong> Delays e retentativas protegem contra bloqueios 429 da API do Discord.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#57F287] flex-shrink-0" />
            <span><strong>Validação de Permissão do Executor:</strong> Somente quem tem <em>Gerenciar Servidor</em> no Discord pode invocar o bot.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
