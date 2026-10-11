import { NextResponse } from 'next/server';
import { getProjectById, updateProjectProgress, saveProject } from '@/lib/db';
import { getBotInviteUrl } from '@/lib/discord-config';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let project = getProjectById(id);

    // Se o cliente enviou o projeto no corpo da requisição, salva/atualiza
    try {
      const body = await request.json();
      if (body && body.identity) {
        project = saveProject({
          ...(project || {}),
          ...body,
          id,
        });
      }
    } catch {
      // Sem body JSON
    }

    if (!project) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }

    // Validações obrigatórias
    if (!project.identity.name || project.identity.name.trim().length === 0) {
      return NextResponse.json({ error: 'O nome do servidor é obrigatório para execução' }, { status: 400 });
    }
    if (!project.roles || project.roles.length === 0) {
      return NextResponse.json({ error: 'É necessário ter pelo menos um cargo configurado' }, { status: 400 });
    }
    if (!project.categories || project.categories.length === 0) {
      return NextResponse.json({ error: 'É necessário ter pelo menos uma categoria configurada' }, { status: 400 });
    }

    // Atualiza status para aguardando ativação
    const updated = updateProjectProgress(id, {
      status: 'pending_activation',
      stage: 'Aguardando comando /iniciar no Discord',
      percent: 0,
      log: {
        timestamp: new Date().toISOString(),
        stage: 'roles',
        message: `Projeto ativado na plataforma. Código de execução: ${project.code}. Aguardando o bot ser adicionado e comando /iniciar.`,
        progressPercent: 0,
      },
    });

    const inviteUrl = getBotInviteUrl(project.code, project.id);

    return NextResponse.json({
      success: true,
      project: updated,
      code: project.code,
      inviteUrl,
      slashCommand: `/iniciar codigo:${project.code}`,
    });
  } catch (error) {
    console.error('Error executing project:', error);
    return NextResponse.json({ error: 'Erro ao preparar execução do projeto' }, { status: 500 });
  }
}
