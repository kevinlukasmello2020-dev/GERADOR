import { NextResponse } from 'next/server';
import { getProjectById, updateProjectProgress } from '@/lib/db';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let project = getProjectById(id);

    try {
      const body = await request.json();
      if (body && body.identity) {
        const { saveProject } = await import('@/lib/db');
        project = saveProject({
          ...(project || {}),
          ...body,
          id,
        });
      }
    } catch {
      // Sem body
    }

    if (!project) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }

    // Inicia execução de teste/demonstração
    updateProjectProgress(id, {
      status: 'running',
      stage: 'Iniciando validação e conexão com Discord',
      percent: 5,
      guildName: 'Servidor de Demonstração / Teste',
      guildId: '123456789012345678',
      log: {
        timestamp: new Date().toISOString(),
        stage: 'roles',
        message: `Execução iniciada para o código ${project.code}`,
        progressPercent: 5,
      },
    });

    // Executa em segundo plano assincronamente atualizando o estado real do DB
    (async () => {
      try {
        const totalRoles = project.roles.length;
        let rolesCount = 0;

        for (const role of project.roles) {
          await delay(600);
          rolesCount++;
          const percent = Math.round(5 + (rolesCount / Math.max(totalRoles, 1)) * 30);
          updateProjectProgress(id, {
            stage: `Criando Cargos (${rolesCount}/${totalRoles})`,
            percent,
            rolesCreated: rolesCount,
            log: {
              timestamp: new Date().toISOString(),
              stage: 'roles',
              message: `Cargo criado: ${role.name} com cor ${role.color}`,
              progressPercent: percent,
            },
          });
        }

        const totalCategories = project.categories.length;
        let totalChannels = 0;
        project.categories.forEach((cat) => (totalChannels += cat.channels.length));
        let categoriesCount = 0;
        let channelsCount = 0;

        for (const cat of project.categories) {
          await delay(700);
          categoriesCount++;
          const percentCat = Math.round(35 + (categoriesCount / Math.max(totalCategories, 1)) * 15);
          updateProjectProgress(id, {
            stage: `Criando Categorias (${categoriesCount}/${totalCategories})`,
            percent: percentCat,
            categoriesCreated: categoriesCount,
            log: {
              timestamp: new Date().toISOString(),
              stage: 'categories',
              message: `Categoria criada: ${cat.name}`,
              progressPercent: percentCat,
            },
          });

          for (const ch of cat.channels) {
            await delay(500);
            channelsCount++;
            const percentCh = Math.round(50 + (channelsCount / Math.max(totalChannels, 1)) * 45);
            updateProjectProgress(id, {
              stage: `Criando Canais (${channelsCount}/${totalChannels})`,
              percent: percentCh,
              channelsCreated: channelsCount,
              log: {
                timestamp: new Date().toISOString(),
                stage: 'channels',
                message: `Canal criado: ${ch.name} (${ch.type})`,
                progressPercent: percentCh,
              },
            });
          }
        }

        await delay(500);
        updateProjectProgress(id, {
          status: 'completed',
          stage: 'Servidor criado com sucesso!',
          percent: 100,
          rolesCreated: rolesCount,
          categoriesCreated: categoriesCount,
          channelsCreated: channelsCount,
          log: {
            timestamp: new Date().toISOString(),
            stage: 'finalizing',
            message: `Automação finalizada com 100% de sucesso. ${rolesCount} cargos, ${categoriesCount} categorias e ${channelsCount} canais configurados!`,
            progressPercent: 100,
          },
        });
      } catch (err: any) {
        updateProjectProgress(id, {
          status: 'error',
          stage: 'Erro durante execução',
          error: err.message,
        });
      }
    })();

    return NextResponse.json({
      success: true,
      message: 'Execução iniciada com sucesso!',
      code: project.code,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao executar teste' }, { status: 500 });
  }
}
