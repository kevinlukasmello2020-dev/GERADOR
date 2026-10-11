import { NextResponse } from 'next/server';
import { spawn, ChildProcess } from 'child_process';
import path from 'path';

let botProcess: ChildProcess | null = null;
let botStatus: 'offline' | 'online' | 'error' = 'offline';
let lastError = '';

export async function GET() {
  const isOnline = botProcess !== null && botProcess.exitCode === null;
  return NextResponse.json({
    status: isOnline ? 'online' : botStatus,
    lastError,
    tokenConfigured: !!(process.env.DISCORD_BOT_TOKEN && process.env.DISCORD_BOT_TOKEN.trim().length > 10),
  });
}

export async function POST(request: Request) {
  try {
    const { action } = await request.json();

    if (action === 'start') {
      const token = process.env.DISCORD_BOT_TOKEN;
      if (!token || token.trim().length < 10) {
        return NextResponse.json(
          { error: 'O DISCORD_BOT_TOKEN precisa estar preenchido antes de ligar o bot!' },
          { status: 400 }
        );
      }

      // Se já estiver rodando, não duplica
      if (botProcess && botProcess.exitCode === null) {
        return NextResponse.json({ message: 'O bot já está online!', status: 'online' });
      }

      const botPath = path.join(process.cwd(), 'bot', 'index.ts');
      
      // Inicia o processo do bot com tsx
      botProcess = spawn('npx', ['tsx', botPath], {
        shell: true,
        cwd: process.cwd(),
        env: { ...process.env },
      });

      botStatus = 'online';
      lastError = '';

      botProcess.stdout?.on('data', (data) => {
        console.log(`[Bot Discord]: ${data}`);
      });

      botProcess.stderr?.on('data', (data) => {
        const str = data.toString();
        console.error(`[Bot Error]: ${str}`);
        lastError = str;
        if (str.includes('An invalid token was provided') || str.includes('TOKEN_INVALID')) {
          botStatus = 'error';
        }
      });

      botProcess.on('close', (code) => {
        console.log(`Processo do bot encerrado com código: ${code}`);
        botProcess = null;
        if (code !== 0) botStatus = 'error';
        else botStatus = 'offline';
      });

      return NextResponse.json({ message: 'Bot iniciado com sucesso!', status: 'online' });
    }

    if (action === 'stop') {
      if (botProcess) {
        botProcess.kill();
        botProcess = null;
        botStatus = 'offline';
      }
      return NextResponse.json({ message: 'Bot desligado.', status: 'offline' });
    }

    return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
