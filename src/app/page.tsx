'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ProjectConfig, ServerTemplateType } from '@/types/project';
import { createInitialProject } from '@/lib/templates';
import { Navbar } from '@/components/Navbar';
import { StepIndicator } from '@/components/WizardSteps/StepIndicator';
import { StepTemplates } from '@/components/WizardSteps/StepTemplates';
import { StepIdentity } from '@/components/WizardSteps/StepIdentity';
import { StepRoles } from '@/components/WizardSteps/StepRoles';
import { StepChannels } from '@/components/WizardSteps/StepChannels';
import { StepPreview } from '@/components/WizardSteps/StepPreview';
import { ExecuteModal } from '@/components/ExecuteModal';
import { LiveTracker } from '@/components/LiveTracker';
import { Dashboard } from '@/components/Dashboard';
import { DocsGuide } from '@/components/DocsGuide';

export default function HomePage() {
  const [currentTab, setCurrentTab] = useState<'builder' | 'dashboard' | 'docs'>('builder');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [projects, setProjects] = useState<ProjectConfig[]>([]);
  const [activeProject, setActiveProject] = useState<ProjectConfig>(() =>
    createInitialProject('sales')
  );
  const [isExecuteModalOpen, setIsExecuteModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Carregar projetos salvos da API
  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
        if (data.length > 0) {
          // Se o usuário ainda não editou nada e já existe um projeto salvo
          setActiveProject((curr) => {
            const found = data.find((p: ProjectConfig) => p.id === curr.id);
            return found || data[0];
          });
        } else {
          // Salva o projeto inicial automaticamente para já constar no banco
          fetch(`/api/projects/${activeProject.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activeProject),
          });
        }
      }
    } catch (err) {
      console.error('Erro ao buscar projetos:', err);
    }
  }, [activeProject]);

  useEffect(() => {
    fetchProjects();
  }, []);

  // Recarregar projeto ativo
  const refreshActiveProject = useCallback(async () => {
    if (!activeProject.id) return;
    try {
      const res = await fetch(`/api/projects/${activeProject.id}`);
      if (res.ok) {
        const updated = await res.json();
        setActiveProject(updated);
        setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      }
    } catch (err) {
      console.error('Erro ao recarregar projeto:', err);
    }
  }, [activeProject.id]);

  // Salvar Projeto
  const handleSaveProject = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/projects/${activeProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activeProject),
      });

      if (res.ok) {
        const saved = await res.json();
        setActiveProject(saved);
        showNotification('Configurações do servidor salvas com sucesso!');
        fetchProjects();
        return saved;
      } else {
        showNotification('Erro ao salvar projeto.', 'error');
        return null;
      }
    } catch (err) {
      showNotification('Erro de rede ao salvar projeto.', 'error');
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  // Selecionar Modelo
  const handleSelectTemplate = (type: ServerTemplateType) => {
    const newProject = createInitialProject(type, activeProject.userId);
    // Preserva ID e código se o usuário já estiver trabalhando
    newProject.id = activeProject.id;
    newProject.code = activeProject.code;
    setActiveProject(newProject);
    showNotification(`Modelo "${newProject.identity.name}" carregado com sucesso!`);
  };

  // Criar Novo Projeto Limpo
  const handleNewProject = () => {
    const newProj = createInitialProject('sales');
    setActiveProject(newProj);
    setCurrentStep(1);
    setCurrentTab('builder');
    showNotification('Novo projeto iniciado! Selecione o modelo.');
  };

  // Duplicar Projeto
  const handleDuplicateProject = async (id?: string) => {
    const targetId = id || activeProject.id;
    try {
      const res = await fetch(`/api/projects/${targetId}/duplicate`, { method: 'POST' });
      if (res.ok) {
        const cloned = await res.json();
        showNotification(`Projeto duplicado com sucesso! Novo código: ${cloned.code}`);
        fetchProjects();
        setActiveProject(cloned);
      }
    } catch (err) {
      showNotification('Erro ao duplicar projeto.', 'error');
    }
  };

  // Excluir Projeto
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Deseja realmente excluir este projeto?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showNotification('Projeto excluído com sucesso.');
        fetchProjects();
        if (activeProject.id === id) {
          handleNewProject();
        }
      }
    } catch (err) {
      showNotification('Erro ao excluir projeto.', 'error');
    }
  };

  // Selecionar Projeto do Dashboard
  const handleSelectProjectFromDashboard = (
    proj: ProjectConfig,
    targetTab: 'builder' | 'preview' = 'builder'
  ) => {
    setActiveProject(proj);
    if (targetTab === 'preview') {
      setCurrentStep(5);
    } else {
      setCurrentStep(2);
    }
    setCurrentTab('builder');
  };

  // Executar Projeto
  const handleExecuteProject = async () => {
    try {
      const res = await fetch(`/api/projects/${activeProject.id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activeProject),
      });

      if (res.ok) {
        const data = await res.json();
        setActiveProject(data.project);
        setIsExecuteModalOpen(true);
        fetchProjects();
      } else {
        const err = await res.json();
        showNotification(err.error || 'Erro ao preparar execução', 'error');
      }
    } catch (err) {
      showNotification('Erro de conexão ao executar projeto', 'error');
    }
  };

  // Disparar Teste de Execução Instantânea
  const handleStartTestRun = async () => {
    try {
      setIsExecuteModalOpen(false);
      const res = await fetch(`/api/projects/${activeProject.id}/run-test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activeProject),
      });
      if (res.ok) {
        showNotification('Execução iniciada! Acompanhe o progresso em tempo real abaixo.');
        refreshActiveProject();
      }
    } catch (err) {
      showNotification('Erro ao iniciar teste de execução.', 'error');
    }
  };

  const isLive = activeProject.status === 'running' || activeProject.status === 'completed' || activeProject.status === 'pending_activation';

  return (
    <div className="min-h-screen flex flex-col bg-[#111214] text-[#DBDEE1]">
      {/* Toast de Notificação */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl border shadow-2xl text-xs font-semibold flex items-center gap-2 animate-bounce ${
            notification.type === 'success'
              ? 'bg-[#1E1F22] border-[#57F287] text-[#57F287]'
              : 'bg-[#1E1F22] border-red-500 text-red-400'
          }`}
        >
          <span>{notification.message}</span>
        </div>
      )}

      {/* Navbar Superior */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onNewProject={handleNewProject}
        activeProjectCode={activeProject?.code}
      />

      {/* Stepper Wizard (visível apenas na aba de criação) */}
      {currentTab === 'builder' && (
        <StepIndicator
          currentStep={currentStep}
          setStep={setCurrentStep}
          canExecute={!!activeProject.identity.name}
        />
      )}

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Tracker em tempo real fixo no topo se o projeto estiver em execução ou ativo */}
        {isLive && currentTab === 'builder' && currentStep === 5 && (
          <LiveTracker
            project={activeProject}
            onRefreshProject={refreshActiveProject}
            onRunTest={handleStartTestRun}
          />
        )}

        {/* Visualização de Abas */}
        {currentTab === 'dashboard' && (
          <Dashboard
            projects={projects}
            onSelectProject={handleSelectProjectFromDashboard}
            onDuplicateProject={handleDuplicateProject}
            onDeleteProject={handleDeleteProject}
            onNewProject={handleNewProject}
            onExecuteProject={(p) => {
              setActiveProject(p);
              handleExecuteProject();
            }}
          />
        )}

        {currentTab === 'docs' && <DocsGuide />}

        {currentTab === 'builder' && (
          <>
            {/* ETAPA 1: MODELOS */}
            {currentStep === 1 && (
              <StepTemplates
                project={activeProject}
                onSelectTemplate={handleSelectTemplate}
                onNext={() => setCurrentStep(2)}
              />
            )}

            {/* ETAPA 2: IDENTIDADE & LETRAS */}
            {currentStep === 2 && (
              <StepIdentity
                project={activeProject}
                setProject={setActiveProject}
                onNext={() => setCurrentStep(3)}
                onPrev={() => setCurrentStep(1)}
              />
            )}

            {/* ETAPA 3: CARGOS */}
            {currentStep === 3 && (
              <StepRoles
                project={activeProject}
                setProject={setActiveProject}
                onNext={() => setCurrentStep(4)}
                onPrev={() => setCurrentStep(2)}
              />
            )}

            {/* ETAPA 4: CANAIS & CATEGORIAS */}
            {currentStep === 4 && (
              <StepChannels
                project={activeProject}
                setProject={setActiveProject}
                onNext={() => setCurrentStep(5)}
                onPrev={() => setCurrentStep(3)}
              />
            )}

            {/* ETAPA 5: PRÉVIA & EXECUÇÃO */}
            {currentStep === 5 && (
              <StepPreview
                project={activeProject}
                onEdit={() => setCurrentStep(2)}
                onSave={handleSaveProject}
                onDuplicate={() => handleDuplicateProject()}
                onExecute={handleExecuteProject}
                isSaving={isSaving}
              />
            )}
          </>
        )}
      </main>

      {/* Modal de Execução */}
      <ExecuteModal
        isOpen={isExecuteModalOpen}
        onClose={() => setIsExecuteModalOpen(false)}
        project={activeProject}
        onStartTestRun={handleStartTestRun}
      />
    </div>
  );
}
