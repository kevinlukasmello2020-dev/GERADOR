import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ENV_PATH = path.join(process.cwd(), '.env');

export async function GET() {
  return NextResponse.json({
    clientId: process.env.DISCORD_CLIENT_ID || '',
    isConfigured: !!(process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_ID !== '123456789012345678' && process.env.DISCORD_BOT_TOKEN),
  });
}

export async function POST(request: Request) {
  try {
    const { clientId, botToken } = await request.json();

    if (!clientId) {
      return NextResponse.json({ error: 'Client ID é obrigatório' }, { status: 400 });
    }

    // Atualiza variáveis no runtime do processo
    process.env['DISCORD_CLIENT_ID'] = clientId.trim();
    if (botToken) {
      process.env['DISCORD_BOT_TOKEN'] = botToken.trim();
    }

    // Atualiza arquivo .env
    let envContent = '';
    if (fs.existsSync(ENV_PATH)) {
      envContent = fs.readFileSync(ENV_PATH, 'utf-8');
    }

    const lines = envContent.split('\n');
    let hasClientId = false;
    let hasPublicClientId = false;
    let hasBotToken = false;

    const newLines = lines.map((line) => {
      if (line.startsWith('DISCORD_CLIENT_ID=')) {
        hasClientId = true;
        return `DISCORD_CLIENT_ID="${clientId.trim()}"`;
      }
      if (line.startsWith('NEXT_PUBLIC_DISCORD_CLIENT_ID=')) {
        hasPublicClientId = true;
        return `NEXT_PUBLIC_DISCORD_CLIENT_ID="${clientId.trim()}"`;
      }
      if (line.startsWith('DISCORD_BOT_TOKEN=') && botToken) {
        hasBotToken = true;
        return `DISCORD_BOT_TOKEN="${botToken.trim()}"`;
      }
      return line;
    });

    if (!hasClientId) newLines.push(`DISCORD_CLIENT_ID="${clientId.trim()}"`);
    if (!hasPublicClientId) newLines.push(`NEXT_PUBLIC_DISCORD_CLIENT_ID="${clientId.trim()}"`);
    if (!hasBotToken && botToken) newLines.push(`DISCORD_BOT_TOKEN="${botToken.trim()}"`);

    fs.writeFileSync(ENV_PATH, newLines.join('\n'), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Credenciais do bot salvas com sucesso!',
      clientId: clientId.trim(),
    });
  } catch (error) {
    console.error('Erro ao salvar credenciais do bot:', error);
    return NextResponse.json({ error: 'Erro ao salvar credenciais' }, { status: 500 });
  }
}
