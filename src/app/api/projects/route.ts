import { NextResponse } from 'next/server';
import { getAllProjects, saveProject } from '@/lib/db';
import { createInitialProject } from '@/lib/templates';
import { ServerTemplateType } from '@/types/project';

export async function GET() {
  try {
    const projects = getAllProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao listar projetos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const templateType: ServerTemplateType = body.templateType || 'sales';
    const userId = body.userId || 'user-default';

    // Se o usuário passou um projeto completo
    if (body.id && body.roles && body.categories) {
      saveProject(body);
      return NextResponse.json(body, { status: 201 });
    }

    const newProject = createInitialProject(templateType, userId);
    
    // Se o usuário passou customizações imediatas
    if (body.identity) {
      newProject.identity = { ...newProject.identity, ...body.identity };
    }

    saveProject(newProject);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Erro ao criar projeto' }, { status: 500 });
  }
}
