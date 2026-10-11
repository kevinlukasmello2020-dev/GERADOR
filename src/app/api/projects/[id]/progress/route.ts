import { NextResponse } from 'next/server';
import { updateProjectProgress, getProjectById } from '@/lib/db';

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
    return NextResponse.json({
      status: project.status,
      progress: project.progress,
      guildId: project.guildId,
      guildName: project.guildName,
      executedAt: project.executedAt,
      completedAt: project.completedAt,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao obter progresso' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = updateProjectProgress(id, {
      stage: body.stage,
      percent: body.percent,
      rolesCreated: body.rolesCreated,
      categoriesCreated: body.categoriesCreated,
      channelsCreated: body.channelsCreated,
      status: body.status,
      log: body.log,
      guildId: body.guildId,
      guildName: body.guildName,
      error: body.error,
    });

    if (!updated) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true, progress: updated.progress, status: updated.status });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json({ error: 'Erro ao registrar progresso' }, { status: 500 });
  }
}
