import fs from 'fs';
import path from 'path';
import { ProjectConfig, ExecutionLog } from '@/types/project';

let memoryProjects: ProjectConfig[] = [];

function getDbPath(): string {
  const localPath = path.join(process.cwd(), 'data', 'projects.json');
  // Se estivermos em ambiente serverless onde a raiz pode ser read-only
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    return localPath;
  } catch {
    // Fallback para /tmp (padrão de lambdas da Netlify/Vercel)
    const tmpDir = process.env.TMPDIR || '/tmp';
    return path.join(tmpDir, 'projects.json');
  }
}

function ensureDbExists(): string {
  const dbFile = getDbPath();
  try {
    if (!fs.existsSync(dbFile)) {
      // Se houver arquivo local inicial, copia
      const seedFile = path.join(process.cwd(), 'data', 'projects.json');
      let initialData = '[]';
      if (fs.existsSync(seedFile)) {
        initialData = fs.readFileSync(seedFile, 'utf-8');
      }
      fs.writeFileSync(dbFile, initialData, 'utf-8');
    }
  } catch (err) {
    console.warn('Ambiente de arquivo somente-leitura detectado, operando com cache em memória');
  }
  return dbFile;
}

export function getAllProjects(): ProjectConfig[] {
  const dbFile = ensureDbExists();
  try {
    if (fs.existsSync(dbFile)) {
      const raw = fs.readFileSync(dbFile, 'utf-8');
      const parsed = JSON.parse(raw) as ProjectConfig[];
      if (parsed && Array.isArray(parsed) && parsed.length > 0) {
        memoryProjects = parsed;
        return parsed;
      }
    }
  } catch (error) {
    // fallback
  }
  return memoryProjects;
}

export function saveAllProjects(projects: ProjectConfig[]): void {
  memoryProjects = projects;
  try {
    const dbFile = ensureDbExists();
    fs.writeFileSync(dbFile, JSON.stringify(projects, null, 2), 'utf-8');
  } catch (err) {
    // Se o disco for read-only, o cache em memória já está atualizado
  }
}

export function getProjectById(id: string): ProjectConfig | null {
  const projects = getAllProjects();
  return projects.find((p) => p.id === id) || null;
}

export function getProjectByCode(code: string): ProjectConfig | null {
  const projects = getAllProjects();
  const normalized = code.trim().toUpperCase();
  return projects.find((p) => p.code.toUpperCase() === normalized) || null;
}

export function saveProject(project: ProjectConfig): ProjectConfig {
  const projects = getAllProjects();
  const index = projects.findIndex((p) => p.id === project.id);
  project.updatedAt = new Date().toISOString();

  if (index >= 0) {
    projects[index] = project;
  } else {
    projects.unshift(project);
  }

  saveAllProjects(projects);
  return project;
}

export function deleteProject(id: string): boolean {
  const projects = getAllProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length !== projects.length) {
    saveAllProjects(filtered);
    return true;
  }
  return false;
}

export function duplicateProject(id: string): ProjectConfig | null {
  const project = getProjectById(id);
  if (!project) return null;

  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const segment1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const segment2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const newCode = `DANONE-${segment1}-${segment2}`;

  const cloned: ProjectConfig = {
    ...JSON.parse(JSON.stringify(project)),
    id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    code: newCode,
    identity: {
      ...project.identity,
      name: `${project.identity.name} (Cópia)`,
    },
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    progress: {
      stage: 'Aguardando Início',
      percent: 0,
      rolesCreated: 0,
      totalRoles: project.roles.length,
      categoriesCreated: 0,
      totalCategories: project.categories.length,
      channelsCreated: 0,
      totalChannels: project.categories.reduce((acc, cat) => acc + cat.channels.length, 0),
      logs: [],
    },
  };

  return saveProject(cloned);
}

export function updateProjectProgress(
  id: string,
  update: {
    stage?: string;
    percent?: number;
    rolesCreated?: number;
    categoriesCreated?: number;
    channelsCreated?: number;
    status?: ProjectConfig['status'];
    log?: ExecutionLog;
    guildId?: string;
    guildName?: string;
    error?: string;
  }
): ProjectConfig | null {
  const project = getProjectById(id);
  if (!project) return null;

  if (update.stage !== undefined) project.progress.stage = update.stage;
  if (update.percent !== undefined) project.progress.percent = update.percent;
  if (update.rolesCreated !== undefined) project.progress.rolesCreated = update.rolesCreated;
  if (update.categoriesCreated !== undefined) project.progress.categoriesCreated = update.categoriesCreated;
  if (update.channelsCreated !== undefined) project.progress.channelsCreated = update.channelsCreated;
  if (update.status !== undefined) project.status = update.status;
  if (update.guildId !== undefined) project.guildId = update.guildId;
  if (update.guildName !== undefined) project.guildName = update.guildName;
  if (update.error !== undefined) project.progress.error = update.error;

  if (update.log) {
    project.progress.logs.push(update.log);
  }

  if (update.status === 'running' && !project.executedAt) {
    project.executedAt = new Date().toISOString();
  }
  if (update.status === 'completed') {
    project.completedAt = new Date().toISOString();
  }

  return saveProject(project);
}
