export const DEFAULT_DISCORD_PERMISSIONS = '268487712'; // Manage Roles, Manage Channels, Send Messages, etc.
// Recomendado: Permissões de Gerenciar Cargos, Gerenciar Canais, Ver Canais e Enviar Mensagens

export function getBotInviteUrl(projectCode?: string, projectId?: string): string {
  const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || process.env.DISCORD_CLIENT_ID || '123456789012345678';
  const permissions = process.env.DISCORD_BOT_PERMISSIONS || '8'; // Permissão de Administrador ou 268487712
  
  const baseUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot%20applications.commands&permissions=${permissions}`;
  
  if (projectCode) {
    // Vinculamos o código e ID do projeto no parâmetro state/guild_id para rastreabilidade
    return `${baseUrl}&state=${encodeURIComponent(`project:${projectCode}:${projectId || ''}`)}`;
  }
  return baseUrl;
}
