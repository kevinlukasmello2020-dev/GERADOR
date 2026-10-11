'use client';

import React from 'react';
import { TEMPLATES } from '@/lib/templates';
import { ServerTemplateType, ProjectConfig } from '@/types/project';
import { 
  ShoppingCart, 
  Building2, 
  Flame, 
  Car, 
  Users2, 
  Headphones, 
  Wrench, 
  Check, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface StepTemplatesProps {
  project: ProjectConfig;
  onSelectTemplate: (type: ServerTemplateType) => void;
  onNext: () => void;
}

const TEMPLATE_ICONS: Record<ServerTemplateType, any> = {
  sales: ShoppingCart,
  corp: Building2,
  fac: Flame,
  city_rp: Car,
  community: Users2,
  support: Headphones,
  custom: Wrench,
};

export const StepTemplates: React.FC<StepTemplatesProps> = ({
  project,
  onSelectTemplate,
  onNext,
}) => {
  const templateList = Object.values(TEMPLATES);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Cabeçalho da Etapa */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#1E1F22] p-6 rounded-2xl border border-[#2B2D31]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/30">
              Etapa 1 de 5
            </span>
            <span className="text-xs text-[#949BA4]">Modelos Arquiteturais</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Escolha o Modelo do Servidor</h2>
          <p className="text-sm text-[#949BA4] mt-1">
            Selecione uma base pronta e totalmente configurada ou comece do zero. Você poderá editar cada canal, cargo e permissão a seguir.
          </p>
        </div>

        <button
          onClick={onNext}
          className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium flex items-center gap-2 transition-all shadow-md shadow-[#5865F2]/20"
        >
          <span>Continuar</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid de Cards dos Modelos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {templateList.map((tpl) => {
          const Icon = TEMPLATE_ICONS[tpl.type] || Sparkles;
          const isSelected = project.templateType === tpl.type;

          return (
            <div
              key={tpl.type}
              onClick={() => onSelectTemplate(tpl.type)}
              className={`group relative flex flex-col justify-between p-6 rounded-2xl transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-[#2B2D31] border-[#5865F2] shadow-xl shadow-[#5865F2]/10 ring-2 ring-[#5865F2]/40'
                  : 'bg-[#1E1F22] border-[#2B2D31] hover:border-[#35373C] hover:bg-[#232529]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 bg-[#5865F2] text-white p-1 rounded-full shadow-md">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}

              <div>
                {/* Ícone e Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105"
                    style={{ backgroundColor: tpl.recommendedColor }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#949BA4]">
                      {tpl.badge}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#5865F2] transition-colors">
                      {tpl.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-[#949BA4] mb-5 leading-relaxed">
                  {tpl.description}
                </p>

                {/* Features inclusas */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#80848E] block">
                    Recursos Inclusos:
                  </span>
                  <ul className="space-y-1.5">
                    {tpl.features.map((feat, i) => (
                      <li key={i} className="text-xs text-[#DBDEE1] flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#57F287]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Botão Selecionar */}
              <div className="pt-4 border-t border-[#35373C]/60 flex items-center justify-between">
                <span className="text-xs font-medium text-[#949BA4]">
                  {tpl.defaultRoles.length} Cargos • {tpl.defaultCategories.length} Categorias
                </span>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-[#5865F2] text-white'
                      : 'bg-[#111214] text-[#949BA4] group-hover:text-white'
                  }`}
                >
                  {isSelected ? 'Modelo Selecionado' : 'Carregar Modelo'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
