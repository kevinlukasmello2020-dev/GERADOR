'use client';

import React, { useState } from 'react';
import { ProjectConfig, CategoryConfig, ChannelConfig, ChannelType } from '@/types/project';
import { 
  ListTree, 
  FolderPlus, 
  Hash, 
  Volume2, 
  Megaphone, 
  BookOpen, 
  FileText, 
  Ticket, 
  MessageSquare,
  Lock,
  Plus, 
  Trash2, 
  Copy, 
  ChevronUp, 
  ChevronDown, 
  ArrowRight, 
  ArrowLeft,
  MoveRight,
  Settings2,
  Users
} from 'lucide-react';

interface StepChannelsProps {
  project: ProjectConfig;
  setProject: React.Dispatch<React.SetStateAction<ProjectConfig>>;
  onNext: () => void;
  onPrev: () => void;
}

const CHANNEL_TYPE_OPTIONS: { type: ChannelType; label: string; icon: any }[] = [
  { type: 'text', label: 'Texto', icon: Hash },
  { type: 'voice', label: 'Voz', icon: Volume2 },
  { type: 'announcement', label: 'Anúncios', icon: Megaphone },
  { type: 'rules', label: 'Regras', icon: BookOpen },
  { type: 'logs', label: 'Logs', icon: FileText },
  { type: 'ticket', label: 'Tickets', icon: Ticket },
  { type: 'forum', label: 'Fórum', icon: MessageSquare },
];

export const StepChannels: React.FC<StepChannelsProps> = ({
  project,
  setProject,
  onNext,
  onPrev,
}) => {
  const [editingCategoryIndex, setEditingCategoryIndex] = useState<number>(0);
  const [selectedChannel, setSelectedChannel] = useState<{
    catIndex: number;
    chIndex: number;
  } | null>(null);

  // Adicionar Categoria
  const handleAddCategory = () => {
    const newCat: CategoryConfig = {
      id: `cat_${Date.now()}`,
      name: `📂 ┃・NOVA-CATEGORIA`,
      channels: [
        {
          id: `ch_${Date.now()}`,
          name: '💬・geral',
          type: 'text',
        },
      ],
    };
    setProject((prev) => ({
      ...prev,
      categories: [...prev.categories, newCat],
    }));
    setEditingCategoryIndex(project.categories.length);
  };

  // Excluir Categoria
  const handleDeleteCategory = (catIndex: number) => {
    if (project.categories.length <= 1) {
      alert('O servidor deve conter pelo menos uma categoria!');
      return;
    }
    setProject((prev) => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== catIndex),
    }));
    if (editingCategoryIndex >= catIndex && editingCategoryIndex > 0) {
      setEditingCategoryIndex(editingCategoryIndex - 1);
    }
    setSelectedChannel(null);
  };

  // Reordenar Categorias
  const handleMoveCategory = (catIndex: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? catIndex - 1 : catIndex + 1;
    if (targetIndex < 0 || targetIndex >= project.categories.length) return;

    const newCats = [...project.categories];
    const temp = newCats[catIndex];
    newCats[catIndex] = newCats[targetIndex];
    newCats[targetIndex] = temp;

    setProject((prev) => ({
      ...prev,
      categories: newCats,
    }));
    setEditingCategoryIndex(targetIndex);
  };

  // Atualizar Categoria
  const handleUpdateCategory = (catIndex: number, field: keyof CategoryConfig, value: any) => {
    setProject((prev) => {
      const newCats = [...prev.categories];
      newCats[catIndex] = { ...newCats[catIndex], [field]: value };
      return { ...prev, categories: newCats };
    });
  };

  // Adicionar Canal em Categoria
  const handleAddChannel = (catIndex: number, type: ChannelType = 'text') => {
    const isVoice = type === 'voice';
    const newChannel: ChannelConfig = {
      id: `ch_${Date.now()}`,
      name: isVoice ? '🔊・Sala de Voz' : '💬・novo-canal',
      type,
      userLimit: isVoice ? 0 : undefined,
    };

    setProject((prev) => {
      const newCats = [...prev.categories];
      newCats[catIndex].channels.push(newChannel);
      return { ...prev, categories: newCats };
    });

    setSelectedChannel({
      catIndex,
      chIndex: project.categories[catIndex].channels.length,
    });
  };

  // Excluir Canal
  const handleDeleteChannel = (catIndex: number, chIndex: number) => {
    setProject((prev) => {
      const newCats = [...prev.categories];
      newCats[catIndex].channels = newCats[catIndex].channels.filter((_, i) => i !== chIndex);
      return { ...prev, categories: newCats };
    });
    if (selectedChannel?.catIndex === catIndex && selectedChannel?.chIndex === chIndex) {
      setSelectedChannel(null);
    }
  };

  // Reordenar canais dentro da categoria
  const handleMoveChannel = (catIndex: number, chIndex: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? chIndex - 1 : chIndex + 1;
    const cat = project.categories[catIndex];
    if (targetIndex < 0 || targetIndex >= cat.channels.length) return;

    setProject((prev) => {
      const newCats = [...prev.categories];
      const channels = [...newCats[catIndex].channels];
      const temp = channels[chIndex];
      channels[chIndex] = channels[targetIndex];
      channels[targetIndex] = temp;
      newCats[catIndex].channels = channels;
      return { ...prev, categories: newCats };
    });
  };

  // Mover canal para outra categoria
  const handleTransferChannel = (fromCatIndex: number, chIndex: number, toCatIndex: number) => {
    if (fromCatIndex === toCatIndex) return;
    setProject((prev) => {
      const newCats = [...prev.categories];
      const [channelToMove] = newCats[fromCatIndex].channels.splice(chIndex, 1);
      newCats[toCatIndex].channels.push(channelToMove);
      return { ...prev, categories: newCats };
    });
    setSelectedChannel(null);
  };

  // Atualizar canal selecionado
  const handleUpdateSelectedChannel = (field: keyof ChannelConfig, value: any) => {
    if (!selectedChannel) return;
    const { catIndex, chIndex } = selectedChannel;

    setProject((prev) => {
      const newCats = [...prev.categories];
      newCats[catIndex].channels[chIndex] = {
        ...newCats[catIndex].channels[chIndex],
        [field]: value,
      };
      return { ...prev, categories: newCats };
    });
  };

  const currentCategory = project.categories[editingCategoryIndex] || project.categories[0];
  const activeChannelConfig = selectedChannel
    ? project.categories[selectedChannel.catIndex]?.channels[selectedChannel.chIndex]
    : null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Cabeçalho da Etapa */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#1E1F22] p-6 rounded-2xl border border-[#2B2D31]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/30">
              Etapa 4 de 5
            </span>
            <span className="text-xs text-[#949BA4]">Estrutura de Canais</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Editor de Categorias e Canais</h2>
          <p className="text-sm text-[#949BA4] mt-1">
            Configure as seções do servidor, separe canais de texto e voz, defina limites de vagas e permissões.
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
            <span>Ver Prévia do Servidor</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Coluna 1: Categorias do Servidor */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#1E1F22] p-5 rounded-2xl border border-[#2B2D31]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ListTree className="w-5 h-5 text-[#5865F2]" />
                <h3 className="text-base font-bold text-white">Categorias</h3>
                <span className="text-xs bg-[#2B2D31] text-[#949BA4] px-2 py-0.5 rounded-full font-mono">
                  {project.categories.length}
                </span>
              </div>
              <button
                onClick={handleAddCategory}
                className="px-3 py-1.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <FolderPlus className="w-4 h-4" />
                Nova Categoria
              </button>
            </div>

            {/* Lista de Categorias com canais aninhados */}
            <div className="space-y-4 max-h-[620px] overflow-y-auto pr-1">
              {project.categories.map((cat, catIdx) => {
                const isCatSelected = editingCategoryIndex === catIdx;

                return (
                  <div
                    key={cat.id}
                    className={`rounded-xl border transition-all ${
                      isCatSelected
                        ? 'bg-[#2B2D31] border-[#5865F2] ring-1 ring-[#5865F2]'
                        : 'bg-[#111214] border-[#2B2D31]'
                    }`}
                  >
                    {/* Header da Categoria */}
                    <div
                      onClick={() => setEditingCategoryIndex(catIdx)}
                      className="p-3 flex items-center justify-between cursor-pointer border-b border-[#35373C]/50"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-xs font-bold text-[#DBDEE1] truncate">
                          {cat.name}
                        </span>
                        {cat.isPrivate && <Lock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          title="Subir Categoria"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveCategory(catIdx, 'up');
                          }}
                          disabled={catIdx === 0}
                          className="p-1 text-[#949BA4] hover:text-white disabled:opacity-30 rounded hover:bg-[#1E1F22]"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          title="Descer Categoria"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveCategory(catIdx, 'down');
                          }}
                          disabled={catIdx === project.categories.length - 1}
                          className="p-1 text-[#949BA4] hover:text-white disabled:opacity-30 rounded hover:bg-[#1E1F22]"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          title="Excluir Categoria"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCategory(catIdx);
                          }}
                          className="p-1 text-red-400 hover:text-red-300 rounded hover:bg-red-500/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Canais dentro da Categoria */}
                    <div className="p-2 space-y-1">
                      {cat.channels.map((ch, chIdx) => {
                        const isChannelSelected =
                          selectedChannel?.catIndex === catIdx &&
                          selectedChannel?.chIndex === chIdx;
                        const isVoice = ch.type === 'voice';

                        return (
                          <div
                            key={ch.id}
                            onClick={() => setSelectedChannel({ catIndex: catIdx, chIndex: chIdx })}
                            className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                              isChannelSelected
                                ? 'bg-[#5865F2] text-white font-medium'
                                : 'text-[#949BA4] hover:bg-[#1E1F22] hover:text-[#DBDEE1]'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {isVoice ? (
                                <Volume2 className="w-3.5 h-3.5 text-[#57F287]" />
                              ) : (
                                <Hash className="w-3.5 h-3.5 text-[#80848E]" />
                              )}
                              <span className="truncate">{ch.name}</span>
                              {isVoice && typeof ch.userLimit === 'number' && ch.userLimit > 0 && (
                                <span className="text-[10px] bg-black/30 px-1.5 py-0.2 rounded font-mono">
                                  {ch.userLimit} max
                                </span>
                              )}
                              {ch.isPrivate && <Lock className="w-3 h-3 text-amber-400" />}
                            </div>

                            <div className="flex items-center gap-1 opacity-80 hover:opacity-100">
                              <button
                                title="Subir canal"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveChannel(catIdx, chIdx, 'up');
                                }}
                                disabled={chIdx === 0}
                                className="p-0.5 hover:text-white disabled:opacity-20"
                              >
                                <ChevronUp className="w-3 h-3" />
                              </button>
                              <button
                                title="Descer canal"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveChannel(catIdx, chIdx, 'down');
                                }}
                                disabled={chIdx === cat.channels.length - 1}
                                className="p-0.5 hover:text-white disabled:opacity-20"
                              >
                                <ChevronDown className="w-3 h-3" />
                              </button>
                              <button
                                title="Excluir canal"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteChannel(catIdx, chIdx);
                                }}
                                className="p-0.5 hover:text-red-400"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      {/* Botões rápidos de adicionar canal na categoria */}
                      <div className="pt-2 flex items-center gap-2">
                        <button
                          onClick={() => handleAddChannel(catIdx, 'text')}
                          className="w-full py-1.5 rounded-lg bg-[#1E1F22] hover:bg-[#35373C] text-[11px] font-semibold text-[#DBDEE1] flex items-center justify-center gap-1 transition-colors border border-[#2B2D31]"
                        >
                          <Plus className="w-3 h-3" />
                          Canal de Texto
                        </button>
                        <button
                          onClick={() => handleAddChannel(catIdx, 'voice')}
                          className="w-full py-1.5 rounded-lg bg-[#1E1F22] hover:bg-[#35373C] text-[11px] font-semibold text-[#57F287] flex items-center justify-center gap-1 transition-colors border border-[#2B2D31]"
                        >
                          <Volume2 className="w-3 h-3" />
                          Canal de Voz
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Coluna 2: Detalhes e Configurações */}
        <div className="lg:col-span-7 space-y-6">
          {/* Editor de Categoria Ativa */}
          <div className="bg-[#1E1F22] p-6 rounded-2xl border border-[#2B2D31] space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-[#5865F2]" />
              Editar Categoria: {currentCategory.name}
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#949BA4] mb-2">
                Nome da Categoria
              </label>
              <input
                type="text"
                value={currentCategory.name}
                onChange={(e) =>
                  handleUpdateCategory(editingCategoryIndex, 'name', e.target.value)
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#111214] border border-[#2B2D31] text-white focus:border-[#5865F2] focus:outline-none"
              />
            </div>

            <div className="bg-[#111214] p-4 rounded-xl border border-[#2B2D31] space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!currentCategory.isPrivate}
                  onChange={(e) =>
                    handleUpdateCategory(editingCategoryIndex, 'isPrivate', e.target.checked)
                  }
                  className="w-4 h-4 rounded text-[#5865F2] bg-[#1E1F22] border-[#2B2D31]"
                />
                <div>
                  <span className="text-sm font-semibold text-white block">Categoria Privada</span>
                  <span className="text-[11px] text-[#949BA4]">
                    Oculta esta categoria e todos os seus canais para @everyone
                  </span>
                </div>
              </label>

              {currentCategory.isPrivate && (
                <div className="pt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#949BA4] mb-2">
                    Cargos com Acesso Autorizado
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.roles.map((r) => {
                      const isAllowed = currentCategory.allowedRoleIds?.includes(r.id);
                      return (
                        <label
                          key={r.id}
                          className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer ${
                            isAllowed
                              ? 'bg-[#5865F2]/20 border-[#5865F2] text-white'
                              : 'bg-[#1E1F22] border-[#2B2D31] text-[#949BA4]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                            <span>{r.name}</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={!!isAllowed}
                            onChange={(e) => {
                              const currentIds = currentCategory.allowedRoleIds || [];
                              const newIds = e.target.checked
                                ? [...currentIds, r.id]
                                : currentIds.filter((id) => id !== r.id);
                              handleUpdateCategory(editingCategoryIndex, 'allowedRoleIds', newIds);
                            }}
                            className="w-3.5 h-3.5 rounded text-[#5865F2]"
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Editor do Canal Selecionado */}
          {activeChannelConfig ? (
            <div className="bg-[#1E1F22] p-6 rounded-2xl border border-[#2B2D31] space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#2B2D31] pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Hash className="w-5 h-5 text-[#5865F2]" />
                  Configurar Canal: {activeChannelConfig.name}
                </h3>
                <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-[#2B2D31] text-[#57F287]">
                  {activeChannelConfig.type}
                </span>
              </div>

              {/* Nome do Canal */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#949BA4] mb-2">
                  Nome do Canal
                </label>
                <input
                  type="text"
                  value={activeChannelConfig.name}
                  onChange={(e) => handleUpdateSelectedChannel('name', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111214] border border-[#2B2D31] text-white focus:border-[#5865F2] focus:outline-none"
                />
              </div>

              {/* Tipo do Canal */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#949BA4] mb-2">
                  Tipo do Canal
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CHANNEL_TYPE_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = activeChannelConfig.type === opt.type;
                    return (
                      <button
                        key={opt.type}
                        onClick={() => handleUpdateSelectedChannel('type', opt.type)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-semibold ${
                          isSelected
                            ? 'bg-[#5865F2] text-white border-[#5865F2]'
                            : 'bg-[#111214] border-[#2B2D31] text-[#949BA4] hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Opções específicas para canal de voz */}
              {activeChannelConfig.type === 'voice' && (
                <div className="bg-[#111214] p-4 rounded-xl border border-[#2B2D31] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-white block">
                        Limite de Usuários no Canal de Voz
                      </span>
                      <span className="text-[11px] text-[#949BA4]">
                        Defina 0 para ilimitado ou escolha o limite exato (ex: 2 para Duo, 5 para Equipe)
                      </span>
                    </div>
                    <span className="text-sm font-mono font-bold text-[#57F287] bg-[#1E1F22] px-3 py-1 rounded-lg border border-[#2B2D31]">
                      {activeChannelConfig.userLimit === 0 ? 'Ilimitado' : `${activeChannelConfig.userLimit} pessoas`}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="99"
                    value={activeChannelConfig.userLimit ?? 0}
                    onChange={(e) =>
                      handleUpdateSelectedChannel('userLimit', parseInt(e.target.value, 10))
                    }
                    className="w-full accent-[#5865F2] cursor-pointer"
                  />
                </div>
              )}

              {/* Tópico do Canal (se texto) */}
              {activeChannelConfig.type !== 'voice' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#949BA4] mb-2">
                    Tópico / Descrição do Canal
                  </label>
                  <input
                    type="text"
                    value={activeChannelConfig.topic || ''}
                    onChange={(e) => handleUpdateSelectedChannel('topic', e.target.value)}
                    placeholder="Instruções visíveis no topo do canal..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#111214] border border-[#2B2D31] text-white focus:border-[#5865F2] focus:outline-none text-sm"
                  />
                </div>
              )}

              {/* Mover para outra categoria */}
              <div className="pt-2 border-t border-[#2B2D31]">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#949BA4] mb-2">
                  Mover este canal para outra categoria
                </label>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedChannel?.catIndex}
                    onChange={(e) => {
                      if (!selectedChannel) return;
                      handleTransferChannel(
                        selectedChannel.catIndex,
                        selectedChannel.chIndex,
                        parseInt(e.target.value, 10)
                      );
                    }}
                    className="bg-[#111214] border border-[#2B2D31] text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#5865F2] w-full"
                  >
                    {project.categories.map((c, i) => (
                      <option key={c.id} value={i}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#1E1F22] p-8 rounded-2xl border border-[#2B2D31] text-center text-[#949BA4] text-sm">
              Clique em qualquer canal na lista à esquerda para ajustar o nome, tipo, tópicos ou limites de voz.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
