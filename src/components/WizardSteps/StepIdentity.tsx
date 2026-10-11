'use client';

import React, { useRef } from 'react';
import { ProjectConfig, FontStyleOption } from '@/types/project';
import { FONT_STYLE_PREVIEWS, applyStyleToName } from '@/lib/fonts';
import { 
  Palette, 
  Upload, 
  Image as ImageIcon, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Type
} from 'lucide-react';

interface StepIdentityProps {
  project: ProjectConfig;
  setProject: React.Dispatch<React.SetStateAction<ProjectConfig>>;
  onNext: () => void;
  onPrev: () => void;
}

export const StepIdentity: React.FC<StepIdentityProps> = ({
  project,
  setProject,
  onNext,
  onPrev,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIdentityChange = (field: string, value: any) => {
    setProject((prev) => ({
      ...prev,
      identity: {
        ...prev.identity,
        [field]: value,
      },
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          handleIdentityChange('iconUrl', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const currentStyle = project.identity.fontStyle || 'small_caps';
  const sampleChannelName = applyStyleToName('anuncios', currentStyle, {
    emoji: '📢',
    customSeparator: project.identity.customSeparator || '┃・',
  });
  const sampleCategoryName = applyStyleToName('informacoes', currentStyle, {
    isCategory: true,
    customSeparator: project.identity.customSeparator || '┃・',
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Cabeçalho da Etapa */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#1E1F22] p-6 rounded-2xl border border-[#2B2D31]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/30">
              Etapa 2 de 5
            </span>
            <span className="text-xs text-[#949BA4]">Identidade & Tipografia</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Personalize a Identidade do Servidor</h2>
          <p className="text-sm text-[#949BA4] mt-1">
            Defina o nome, ícone visual, cores de destaque e o padrão estilístico das fontes dos canais e categorias.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onPrev}
            className="px-4 py-2.5 rounded-xl bg-[#2B2D31] hover:bg-[#35373C] text-white font-medium flex items-center gap-2 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
          <button
            onClick={onNext}
            className="px-5 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium flex items-center gap-2 transition-all shadow-md shadow-[#5865F2]/20"
          >
            <span>Avançar para Cargos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Nome e Descrição */}
          <div className="bg-[#1E1F22] p-6 rounded-2xl border border-[#2B2D31] space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#5865F2]" />
              Dados Gerais do Servidor
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#949BA4] mb-2">
                Nome do Servidor *
              </label>
              <input
                type="text"
                value={project.identity.name}
                onChange={(e) => handleIdentityChange('name', e.target.value)}
                placeholder="Ex: Minha Loja Oficial | Comunidade VIP"
                className="w-full px-4 py-3 rounded-xl bg-[#111214] border border-[#2B2D31] text-white placeholder-[#5C5E66] focus:border-[#5865F2] focus:outline-none focus:ring-1 focus:ring-[#5865F2] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#949BA4] mb-2">
                Descrição do Servidor
              </label>
              <textarea
                rows={3}
                value={project.identity.description}
                onChange={(e) => handleIdentityChange('description', e.target.value)}
                placeholder="Uma breve apresentação sobre a finalidade deste servidor..."
                className="w-full px-4 py-3 rounded-xl bg-[#111214] border border-[#2B2D31] text-white placeholder-[#5C5E66] focus:border-[#5865F2] focus:outline-none focus:ring-1 focus:ring-[#5865F2] transition-colors resize-none"
              />
            </div>

            {/* Cores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#949BA4] mb-2">
                  Cor Primária de Destaque
                </label>
                <div className="flex items-center gap-3 bg-[#111214] p-2 rounded-xl border border-[#2B2D31]">
                  <input
                    type="color"
                    value={project.identity.primaryColor}
                    onChange={(e) => handleIdentityChange('primaryColor', e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={project.identity.primaryColor}
                    onChange={(e) => handleIdentityChange('primaryColor', e.target.value)}
                    className="bg-transparent text-sm font-mono text-white focus:outline-none uppercase w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#949BA4] mb-2">
                  Cor Secundária de Fundo
                </label>
                <div className="flex items-center gap-3 bg-[#111214] p-2 rounded-xl border border-[#2B2D31]">
                  <input
                    type="color"
                    value={project.identity.secondaryColor}
                    onChange={(e) => handleIdentityChange('secondaryColor', e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={project.identity.secondaryColor}
                    onChange={(e) => handleIdentityChange('secondaryColor', e.target.value)}
                    className="bg-transparent text-sm font-mono text-white focus:outline-none uppercase w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Escolha do Estilo das Letras */}
          <div className="bg-[#1E1F22] p-6 rounded-2xl border border-[#2B2D31] space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Type className="w-5 h-5 text-[#5865F2]" />
                  Estilo de Escrita das Letras
                </h3>
                <p className="text-xs text-[#949BA4] mt-0.5">
                  Personaliza automaticamente o formato dos nomes dos canais e categorias.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FONT_STYLE_PREVIEWS.map((st) => {
                const isSelected = currentStyle === st.id;
                return (
                  <div
                    key={st.id}
                    onClick={() => handleIdentityChange('fontStyle', st.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#2B2D31] border-[#5865F2] ring-1 ring-[#5865F2]'
                        : 'bg-[#111214] border-[#2B2D31] hover:border-[#35373C]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-white">{st.label}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#5865F2]" />}
                    </div>
                    <div className="text-xs font-mono text-[#57F287] bg-[#1E1F22] px-2.5 py-1.5 rounded-lg border border-[#2B2D31]">
                      {st.example}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Separador Personalizado */}
            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#949BA4] mb-2">
                Separador Padrão (Ex: ┃・ ou 〢 ou ・)
              </label>
              <input
                type="text"
                value={project.identity.customSeparator || '┃・'}
                onChange={(e) => handleIdentityChange('customSeparator', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#111214] border border-[#2B2D31] text-white font-mono text-sm focus:border-[#5865F2] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Coluna da Direita: Upload do Logo & Preview Rápido */}
        <div className="space-y-6">
          {/* Logo / Ícone */}
          <div className="bg-[#1E1F22] p-6 rounded-2xl border border-[#2B2D31] space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#5865F2]" />
              Logo / Ícone Principal
            </h3>

            <div className="flex flex-col items-center justify-center p-6 bg-[#111214] rounded-2xl border-2 border-dashed border-[#2B2D31] text-center">
              {project.identity.iconUrl ? (
                <div className="relative group mb-3">
                  <img
                    src={project.identity.iconUrl}
                    alt="Logo do Servidor"
                    className="w-24 h-24 rounded-2xl object-cover shadow-lg border-2 border-[#5865F2]"
                  />
                  <button
                    onClick={() => handleIdentityChange('iconUrl', '')}
                    className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-red-400 font-bold transition-opacity"
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-[#1E1F22] flex items-center justify-center text-[#949BA4] mb-3 border border-[#2B2D31]">
                  <ImageIcon className="w-10 h-10 stroke-[1.5]" />
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-[#2B2D31] hover:bg-[#35373C] text-white text-xs font-semibold flex items-center gap-2 transition-all mb-2"
              >
                <Upload className="w-4 h-4" />
                Upload do Computador / Celular
              </button>

              <p className="text-[11px] text-[#949BA4]">
                PNG, JPG ou GIF. Máximo recomendado: 512x512px.
              </p>
            </div>

            {/* Ou por URL */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#949BA4] mb-1.5">
                Ou informe uma URL direta da imagem:
              </label>
              <input
                type="url"
                value={project.identity.iconUrl || ''}
                onChange={(e) => handleIdentityChange('iconUrl', e.target.value)}
                placeholder="https://exemplo.com/icone.png"
                className="w-full px-3 py-2 rounded-xl bg-[#111214] border border-[#2B2D31] text-xs text-white placeholder-[#5C5E66] focus:border-[#5865F2] focus:outline-none"
              />
            </div>
          </div>

          {/* Prévia Rápida do Estilo */}
          <div className="bg-[#1E1F22] p-6 rounded-2xl border border-[#2B2D31] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#949BA4]">
              Prévia do Estilo Selecionado
            </h4>

            <div className="bg-[#111214] p-4 rounded-xl border border-[#2B2D31] space-y-2.5">
              <div className="text-xs font-bold text-[#949BA4] flex items-center gap-1.5">
                <span>{sampleCategoryName}</span>
              </div>
              <div className="text-sm font-medium text-white flex items-center gap-2 bg-[#1E1F22] px-3 py-2 rounded-lg border border-[#2B2D31]">
                <span>{sampleChannelName}</span>
              </div>
              <div className="text-sm font-medium text-[#949BA4] flex items-center gap-2 px-3 py-1">
                <span>💬 {project.identity.customSeparator || '┃・'}bate-papo</span>
              </div>
            </div>

            <p className="text-[11px] text-[#949BA4] italic">
              Esta prévia é atualizada instantaneamente conforme você altera a tipografia e os separadores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
