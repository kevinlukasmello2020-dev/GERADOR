import { NextResponse } from 'next/server';
import { getProjectByCode } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const project = getProjectByCode(code);
    if (!project) {
      return NextResponse.json({ error: 'Código de projeto não encontrado ou inválido' }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao validar código do projeto' }, { status: 500 });
  }
}
