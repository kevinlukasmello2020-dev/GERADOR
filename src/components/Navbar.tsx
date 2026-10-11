'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Layers, 
  PlusCircle, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'builder' | 'dashboard' | 'docs';
  setCurrentTab: (tab: 'builder' | 'dashboard' | 'docs') => void;
  onNewProject?: () => void;
  activeProjectCode?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onNewProject,
  activeProjectCode,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#2B2D31] bg-[#1E1F22]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Marca */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5865F2] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#5865F2]/20">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white">AutoDiscord</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/30">
                PRO 2.0
              </span>
            </div>
            <p className="text-xs text-[#949BA4]">Criador Automático de Servidores</p>
          </div>
        </div>

        {/* Links Centrais */}
        <nav className="hidden md:flex items-center gap-1 bg-[#111214] p-1 rounded-xl border border-[#2B2D31]">
          <button
            onClick={() => setCurrentTab('builder')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              currentTab === 'builder'
                ? 'bg-[#5865F2] text-white shadow'
                : 'text-[#949BA4] hover:text-white hover:bg-[#2B2D31]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Criador de Servidor
          </button>
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              currentTab === 'dashboard'
                ? 'bg-[#5865F2] text-white shadow'
                : 'text-[#949BA4] hover:text-white hover:bg-[#2B2D31]'
            }`}
          >
            <Layers className="w-4 h-4" />
            Meus Projetos
          </button>
          <button
            onClick={() => setCurrentTab('docs')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              currentTab === 'docs'
                ? 'bg-[#5865F2] text-white shadow'
                : 'text-[#949BA4] hover:text-white hover:bg-[#2B2D31]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Guia & Bot
          </button>
        </nav>

        {/* Ações da Direita */}
        <div className="flex items-center gap-3">
          {activeProjectCode && (
            <div className="hidden lg:flex items-center gap-2 bg-[#2B2D31] px-3 py-1.5 rounded-lg border border-[#35373C]">
              <span className="text-xs text-[#949BA4]">Código Ativo:</span>
              <span className="text-xs font-mono font-bold text-[#57F287]">{activeProjectCode}</span>
            </div>
          )}

          {onNewProject && (
            <button
              onClick={onNewProject}
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium bg-[#2B2D31] hover:bg-[#35373C] text-white border border-[#35373C] transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-[#57F287]" />
              Novo Projeto
            </button>
          )}

          <div className="flex items-center gap-2 pl-2 border-l border-[#2B2D31]">
            <div className="w-8 h-8 rounded-full bg-[#5865F2]/20 border border-[#5865F2]/40 flex items-center justify-center text-xs font-bold text-white">
              AD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
