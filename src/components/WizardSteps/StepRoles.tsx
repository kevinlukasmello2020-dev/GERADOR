'use client';

import React, { useState } from 'react';
import { ProjectConfig, RoleConfig, DiscordPermissions } from '@/types/project';
import { defaultPermissions } from '@/lib/templates';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Copy, 
  ChevronUp, 
  ChevronDown, 
  ArrowRight, 
  ArrowLeft,
  AlertTriangle,
  Sliders,
  Check,
  Palette
} from 'lucide-react';

interface StepRolesProps {
  project: ProjectConfig;
  setProject: React.Dispatch<React.SetStateAction<ProjectConfig>>;
  onNext: () => void;
  onPrev: () => void;
}

const DISCORD_COLOR_PRESETS = [
  '#5865F2', '#57F287', '#FEE75C', '#EB459E', '#ED4245',
  '#1ABC9C', '#2ECC71', '#3498DB', '#9B59B6', '#E91E63',
  '#F1C40F', '#E67E22', '#E74C3C', '#95A5A6', '#607D8B',
];

export const StepRoles: React.FC<StepRolesProps> = ({
  project,
  setProject,
  onNext,
  onPrev,
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(
    project.roles[0]?.id || ''
  );

  const selectedRole = project.roles.find((r) => r.id === selectedRoleId) || project.roles[0];

  const handleAddRole = () => {
    const newId = `role_${Date.now()}`;
    const newRole: RoleConfig = {
      id: newId,
      name: 'Novo Cargo',
      color: '#5865F2',
      hoist: true,
      mentionable: false,
      position: project.roles.length + 1,
      permissions: { ...defaultPermissions },
    };

    setProject((prev) => ({
      ...prev,
      roles: [newRole, ...prev.roles],
    }));
    setSelectedRoleId(newId);
  };

  const handleDeleteRole = (id: string) => {
    if (project.roles.length <= 1) {
      alert('O servidor precisa de pelo menos 1 cargo!');
      return;
    }
    setProject((prev) => {
      const filtered = prev.roles.filter((r) => r.id !== id);
      return { ...prev, roles: filtered };
    });
    if (selectedRoleId === id) {
      const remaining = project.roles.filter((r) => r.id !== id);
      setSelectedRoleId(remaining[0]?.id || '');
    }
  };

  const handleDuplicateRole = (role: RoleConfig) => {
    const newId = `role_${Date.now()}`;
    const cloned: RoleConfig = {
      ...JSON.parse(JSON.stringify(role)),
      id: newId,
      name: `${role.name} (Cópia)`,
    };
    setProject((prev) => ({
      ...prev,
      roles: [cloned, ...prev.roles],
    }));
    setSelectedRoleId(newId);
  };

  const handleMoveRole = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= project.roles.length) return;

    const newRoles = [...project.roles];
    const temp = newRoles[index];
    newRoles[index] = newRoles[targetIndex];
    newRoles[targetIndex] = temp;

    setProject((prev) => ({
      ...prev,
      roles: newRoles,
    }));
  };

  const updateSelectedRole = (field: keyof RoleConfig, value: any) => {
    if (!selectedRole) return;
    setProject((prev) => ({
      ...prev,
      roles: prev.roles.map((r) =>
        r.id === selectedRole.id ? { ...r, [field]: value } : r
      ),
    }));
  };

  const updatePermission = (permKey: keyof DiscordPermissions, value: boolean) => {
    if (!selectedRole) return;
    setProject((prev) => ({
      ...prev,
      roles: prev.roles.map((r) =>
        r.id === selectedRole.id
          ? {
              ...r,
              permissions: {
                ...r.permissions,
                [permKey]: value,
              },
            }
          : r
      ),
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Cabeçalho da Etapa */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#1E1F22] p-6 rounded-2xl border border-[#2B2D31]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/30">
              Etapa 3 de 5
            </span>
            <span className="text-xs text-[#949BA4]">Hierarquia & Permissões</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Editor de Cargos e Hierarquia</h2>
          <p className="text-sm text-[#949BA4] mt-1">
            Adicione, ordene, customize as cores e configure as permissões de acesso com total segurança.
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
            <span>Avançar para Canais</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Coluna da Esquerda: Lista de Cargos Ordenável */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#1E1F22] p-5 rounded-2xl border border-[#2B2D31]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#5865F2]" />
                <h3 className="text-base font-bold text-white">Hierarquia de Cargos</h3>
                <span className="text-xs bg-[#2B2D31] text-[#949BA4] px-2 py-0.5 rounded-full font-mono">
                  {project.roles.length}
                </span>
              </div>
              <button
                onClick={handleAddRole}
                className="px-3 py-1.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Adicionar Cargo
              </button>
            </div>

            <p className="text-xs text-[#949BA4] mb-4">
              O cargo no topo tem maior hierarquia no servidor. Use as setas para ajustar a posição.
            </p>

            {/* Lista com botões de reordenar */}
            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {project.roles.map((role, index) => {
                const isSelected = selectedRole?.id === role.id;
                const isAdmin = role.permissions?.administrator;

                return (
                  <div
                    key={role.id}
                    onClick={() => setSelectedRoleId(role.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#2B2D31] border-[#5865F2] ring-1 ring-[#5865F2]'
                        : 'bg-[#111214] border-[#2B2D31] hover:border-[#35373C]'
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div
                        className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: role.color }}
                      />
                      <div className="truncate">
                        <div className="text-sm font-semibold text-white truncate flex items-center gap-2">
                          <span>{role.name}</span>
                          {isAdmin && (
                            <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.2 rounded font-bold">
                              ADMIN
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        title="Subir na hierarquia"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveRole(index, 'up');
                        }}
                        disabled={index === 0}
                        className="p-1 text-[#949BA4] hover:text-white disabled:opacity-30 rounded hover:bg-[#1E1F22]"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        title="Descer na hierarquia"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveRole(index, 'down');
                        }}
                        disabled={index === project.roles.length - 1}
                        className="p-1 text-[#949BA4] hover:text-white disabled:opacity-30 rounded hover:bg-[#1E1F22]"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        title="Duplicar cargo"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateRole(role);
                        }}
                        className="p-1 text-[#949BA4] hover:text-white rounded hover:bg-[#1E1F22]"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="Excluir cargo"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRole(role.id);
                        }}
                        className="p-1 text-red-400 hover:text-red-300 rounded hover:bg-red-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Coluna da Direita: Editor do Cargo Selecionado */}
        <div className="lg:col-span-7 space-y-6">
          {selectedRole ? (
            <div className="bg-[#1E1F22] p-6 rounded-2xl border border-[#2B2D31] space-y-6">
              <div className="flex items-center justify-between border-b border-[#2B2D31] pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: selectedRole.color }}
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">Editar: {selectedRole.name}</h3>
                    <span className="text-xs text-[#949BA4]">ID Interno: {selectedRole.id}</span>
                  </div>
                </div>
              </div>

              {/* Nome do Cargo */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#949BA4] mb-2">
                  Nome do Cargo
                </label>
                <input
                  type="text"
                  value={selectedRole.name}
                  onChange={(e) => updateSelectedRole('name', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111214] border border-[#2B2D31] text-white focus:border-[#5865F2] focus:outline-none"
                />
              </div>

              {/* Cor do Cargo e Presets */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#949BA4] mb-2">
                  Cor do Cargo
                </label>
                <div className="flex items-center gap-3 mb-3">
                  <input
                    type="color"
                    value={selectedRole.color}
                    onChange={(e) => updateSelectedRole('color', e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={selectedRole.color}
                    onChange={(e) => updateSelectedRole('color', e.target.value)}
                    className="w-28 px-3 py-2 rounded-xl bg-[#111214] border border-[#2B2D31] text-white font-mono uppercase text-sm"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {DISCORD_COLOR_PRESETS.map((color) => (
                    <button
                      key={color}
                      onClick={() => updateSelectedRole('color', color)}
                      className={`w-6 h-6 rounded-lg transition-transform hover:scale-110 border ${
                        selectedRole.color.toUpperCase() === color.toUpperCase()
                          ? 'border-white ring-2 ring-[#5865F2]'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Opções de Exibição */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#111214] p-4 rounded-xl border border-[#2B2D31]">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedRole.hoist}
                    onChange={(e) => updateSelectedRole('hoist', e.target.checked)}
                    className="w-4 h-4 rounded text-[#5865F2] focus:ring-0 bg-[#1E1F22] border-[#2B2D31]"
                  />
                  <div>
                    <span className="text-sm font-semibold text-white block">Destacar na Lista de Membros</span>
                    <span className="text-[11px] text-[#949BA4]">Exibe membros deste cargo separadamente</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedRole.mentionable}
                    onChange={(e) => updateSelectedRole('mentionable', e.target.checked)}
                    className="w-4 h-4 rounded text-[#5865F2] focus:ring-0 bg-[#1E1F22] border-[#2B2D31]"
                  />
                  <div>
                    <span className="text-sm font-semibold text-white block">Permitir Mencionar Cargo</span>
                    <span className="text-[11px] text-[#949BA4]">Qualquer membro poderá usar @cargo</span>
                  </div>
                </label>
              </div>

              {/* Permissões Específicas com Segurança */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#949BA4]">
                    Permissões do Cargo
                  </label>
                </div>

                {/* Alerta de Segurança se Administrador estiver ativado */}
                {selectedRole.permissions?.administrator && (
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-red-400 block">
                        Alerta de Segurança Crítico: Privilégio de Administrador Ativado!
                      </span>
                      <p className="text-[11px] text-[#DBDEE1] mt-0.5">
                        Membros com este cargo ignoram todas as restrições de canais e podem alterar o servidor por completo. Atribua apenas a cargos de dono/fundador.
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
                  {[
                    { key: 'administrator', label: '👑 Administrador Total', isDanger: true },
                    { key: 'manageGuild', label: 'Gerenciar Servidor', isDanger: true },
                    { key: 'manageRoles', label: 'Gerenciar Cargos', isDanger: true },
                    { key: 'manageChannels', label: 'Gerenciar Canais', isDanger: true },
                    { key: 'kickMembers', label: 'Expulsar Membros', isDanger: true },
                    { key: 'banMembers', label: 'Banir Membros', isDanger: true },
                    { key: 'viewAuditLog', label: 'Ver Registro de Auditoria' },
                    { key: 'viewChannel', label: 'Visualizar Canais' },
                    { key: 'sendMessages', label: 'Enviar Mensagens' },
                    { key: 'readMessageHistory', label: 'Ver Histórico de Mensagens' },
                    { key: 'attachFiles', label: 'Anexar Arquivos & Mídias' },
                    { key: 'mentionEveryone', label: 'Mencionar @everyone e @here' },
                    { key: 'connect', label: 'Conectar em Canais de Voz' },
                    { key: 'speak', label: 'Falar em Canais de Voz' },
                    { key: 'muteMembers', label: 'Silenciar Membros em Voz' },
                    { key: 'deafenMembers', label: 'Ensurdecer Membros em Voz' },
                    { key: 'moveMembers', label: 'Mover Membros entre Salas' },
                  ].map((perm) => {
                    const isChecked = !!(selectedRole.permissions as any)?.[perm.key];
                    return (
                      <label
                        key={perm.key}
                        className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${
                          isChecked
                            ? perm.isDanger
                              ? 'bg-red-500/10 border-red-500/40 text-red-300'
                              : 'bg-[#5865F2]/10 border-[#5865F2]/40 text-white'
                            : 'bg-[#111214] border-[#2B2D31] text-[#949BA4] hover:border-[#35373C]'
                        }`}
                      >
                        <span className="text-xs font-medium">{perm.label}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            updatePermission(perm.key as keyof DiscordPermissions, e.target.checked)
                          }
                          className="w-4 h-4 rounded text-[#5865F2] focus:ring-0 bg-[#1E1F22] border-[#2B2D31]"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#1E1F22] p-12 rounded-2xl border border-[#2B2D31] text-center text-[#949BA4]">
              Selecione um cargo à esquerda para editar suas propriedades.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
