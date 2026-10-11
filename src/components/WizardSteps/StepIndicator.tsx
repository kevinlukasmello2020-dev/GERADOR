'use client';

import React from 'react';
import { 
  FolderKanban, 
  Palette, 
  ShieldCheck, 
  ListTree, 
  Eye, 
  CheckCircle2 
} from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  setStep: (step: number) => void;
  canExecute: boolean;
}

const steps = [
  { id: 1, title: 'Modelo', desc: 'Tipo de servidor', icon: FolderKanban },
  { id: 2, title: 'Identidade', desc: 'Nome, logo e letras', icon: Palette },
  { id: 3, title: 'Cargos', desc: 'Hierarquia e cores', icon: ShieldCheck },
  { id: 4, title: 'Canais', desc: 'Categorias e salas', icon: ListTree },
  { id: 5, title: 'Prévia & Ativação', desc: 'Visualizar e executar', icon: Eye },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  setStep,
}) => {
  return (
    <div className="w-full bg-[#1E1F22] border-b border-[#2B2D31] px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-4 no-scrollbar">
        {steps.map((s, index) => {
          const Icon = s.icon;
          const isActive = currentStep === s.id;
          const isDone = currentStep > s.id;

          return (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`flex items-center gap-3 py-2 px-3 rounded-xl transition-all flex-shrink-0 text-left ${
                isActive
                  ? 'bg-[#2B2D31] text-white border border-[#5865F2]/40 shadow-sm'
                  : isDone
                  ? 'text-[#DBDEE1] hover:bg-[#2B2D31]/50'
                  : 'text-[#949BA4] hover:bg-[#2B2D31]/30 hover:text-white'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                  isActive
                    ? 'bg-[#5865F2] text-white'
                    : isDone
                    ? 'bg-[#57F287]/20 text-[#57F287]'
                    : 'bg-[#111214] text-[#949BA4]'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#949BA4]">
                    Etapa {s.id}
                  </span>
                </div>
                <div className="text-sm font-semibold">{s.title}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
