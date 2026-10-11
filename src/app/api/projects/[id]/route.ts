import { NextResponse } from 'next/server';
import { getProjectById, saveProject, deleteProject } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = getProjectById(id);
    if (!project) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar projeto' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const existing = getProjectById(id);

    const projectToSave = {
      ...(existing || {}),
      ...body,
      id, // Preserve ID
      updatedAt: new Date().toISOString(),
    };

    saveProject(projectToSave);
    return NextResponse.json(projectToSave);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Erro ao atualizar projeto' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = deleteProject(id);
    if (!success) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Projeto excluído com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir projeto' }, { status: 500 });
  }
}
