import { NextResponse } from 'next/server';
import { duplicateProject } from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const duplicated = duplicateProject(id);
    if (!duplicated) {
      return NextResponse.json({ error: 'Projeto não encontrado para duplicação' }, { status: 404 });
    }
    return NextResponse.json(duplicated, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao duplicar projeto' }, { status: 500 });
  }
}
