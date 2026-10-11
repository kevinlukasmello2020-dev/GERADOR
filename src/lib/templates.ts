import { ProjectConfig, ServerTemplateType, RoleConfig, CategoryConfig, DiscordPermissions } from '@/types/project';

export const defaultPermissions: DiscordPermissions = {
  administrator: false,
  manageGuild: false,
  manageRoles: false,
  manageChannels: false,
  kickMembers: false,
  banMembers: false,
  viewAuditLog: false,
  viewChannel: true,
  sendMessages: true,
  readMessageHistory: true,
  attachFiles: true,
  mentionEveryone: false,
  connect: true,
  speak: true,
  muteMembers: false,
  deafenMembers: false,
  moveMembers: false,
};

export const adminPermissions: DiscordPermissions = {
  administrator: true,
  manageGuild: true,
  manageRoles: true,
  manageChannels: true,
  kickMembers: true,
  banMembers: true,
  viewAuditLog: true,
  viewChannel: true,
  sendMessages: true,
  readMessageHistory: true,
  attachFiles: true,
  mentionEveryone: true,
  connect: true,
  speak: true,
  muteMembers: true,
  deafenMembers: true,
  moveMembers: true,
};

export const modPermissions: DiscordPermissions = {
  administrator: false,
  manageGuild: false,
  manageRoles: false,
  manageChannels: true,
  kickMembers: true,
  banMembers: true,
  viewAuditLog: true,
  viewChannel: true,
  sendMessages: true,
  readMessageHistory: true,
  attachFiles: true,
  mentionEveryone: false,
  connect: true,
  speak: true,
  muteMembers: true,
  deafenMembers: true,
  moveMembers: true,
};

export interface TemplateDefinition {
  type: ServerTemplateType;
  title: string;
  badge: string;
  description: string;
  features: string[];
  recommendedColor: string;
  defaultRoles: RoleConfig[];
  defaultCategories: CategoryConfig[];
}

export const TEMPLATES: Record<ServerTemplateType, TemplateDefinition> = {
  sales: {
    type: 'sales',
    title: 'Servidor de Vendas',
    badge: 'E-commerce & Lojas',
    description: 'Estrutura completa para lojas, produtos digitais/físicos, checkout, suporte e avaliações de clientes.',
    features: ['Área de Vitrine e Catálogo', 'Canais de Tickets e Suporte', 'Salas de Avaliação e Entregas', 'Cargos de Clientes e VIP'],
    recommendedColor: '#10B981',
    defaultRoles: [
      { id: 'r1', name: '👑・Fundador / Dono', color: '#EF4444', hoist: true, mentionable: false, position: 10, permissions: adminPermissions },
      { id: 'r2', name: '💼・Gerente de Vendas', color: '#F59E0B', hoist: true, mentionable: true, position: 9, permissions: modPermissions },
      { id: 'r3', name: '🛒・Vendedor Oficial', color: '#10B981', hoist: true, mentionable: true, position: 8, permissions: defaultPermissions },
      { id: 'r4', name: '💎・Cliente VIP', color: '#8B5CF6', hoist: true, mentionable: false, position: 7, permissions: defaultPermissions },
      { id: 'r5', name: '🛍️・Cliente Verificado', color: '#3B82F6', hoist: true, mentionable: false, position: 6, permissions: defaultPermissions },
      { id: 'r6', name: '🤖・Sistemas & Bots', color: '#6B7280', hoist: true, mentionable: false, position: 5, permissions: defaultPermissions },
      { id: 'r7', name: '👤・Visitante', color: '#9CA3AF', hoist: false, mentionable: false, position: 1, permissions: defaultPermissions },
    ],
    defaultCategories: [
      {
        id: 'c1',
        name: '📌 ┃・INFORMAÇÕES',
        channels: [
          { id: 'ch1', name: '📢・anúncios', type: 'announcement', topic: 'Novidades e anúncios da loja' },
          { id: 'ch2', name: '📜・regras-e-termos', type: 'rules', topic: 'Termos de compra e garantia' },
          { id: 'ch3', name: '⭐・avaliações', type: 'text', topic: 'Feedback dos nossos clientes' },
          { id: 'ch4', name: '🎁・sorteios-e-brindes', type: 'text', topic: 'Promoções e sorteios' },
        ],
      },
      {
        id: 'c2',
        name: '🛒 ┃・PRODUTOS & LOJA',
        channels: [
          { id: 'ch5', name: '📦・catálogo', type: 'text', topic: 'Nossos produtos disponíveis' },
          { id: 'ch6', name: '💎・vantagens-vip', type: 'text', topic: 'Benefícios para clientes VIP' },
          { id: 'ch7', name: '💰・como-comprar', type: 'text', topic: 'Instruções de pagamento e recebimento' },
        ],
      },
      {
        id: 'c3',
        name: '🎫 ┃・ATENDIMENTO & TICKETS',
        channels: [
          { id: 'ch8', name: '🎟️・abrir-ticket', type: 'ticket', topic: 'Suporte, orçamentos e dúvidas' },
          { id: 'ch9', name: '❓・dúvidas-frequentes', type: 'text', topic: 'FAQ rápida' },
        ],
      },
      {
        id: 'c4',
        name: '💬 ┃・COMUNIDADE',
        channels: [
          { id: 'ch10', name: '💬・chat-geral', type: 'text', topic: 'Bate-papo da comunidade' },
          { id: 'ch11', name: '📸・mídias-e-prints', type: 'text', topic: 'Envie fotos e fotos de produtos' },
        ],
      },
      {
        id: 'c5',
        name: '🔊 ┃・ATENDIMENTO EM VOZ',
        channels: [
          { id: 'ch12', name: '🔊・Atendimento 01', type: 'voice', userLimit: 2 },
          { id: 'ch13', name: '🔊・Atendimento 02', type: 'voice', userLimit: 2 },
          { id: 'ch14', name: '🎙️・Reunião da Equipe', type: 'voice', isPrivate: true, allowedRoleIds: ['r1', 'r2', 'r3'], userLimit: 10 },
          { id: 'ch15', name: '☕・Lounge Livre', type: 'voice', userLimit: 0 },
        ],
      },
    ],
  },

  corp: {
    type: 'corp',
    title: 'Servidor de Corporação (CORP)',
    badge: 'Empresarial & Corporativo',
    description: 'Gestão executiva, departamentos, controle hierárquico rígido, reuniões e segurança operacional.',
    features: ['Setores Administrativos', 'Canais de Diretoria Privados', 'Salas de Reunião com Limites', 'Logs de Operações'],
    recommendedColor: '#3B82F6',
    defaultRoles: [
      { id: 'r1', name: '🏛️・Diretoria Executiva', color: '#1E3A8A', hoist: true, mentionable: true, position: 10, permissions: adminPermissions },
      { id: 'r2', name: '👔・Gerência Geral', color: '#2563EB', hoist: true, mentionable: true, position: 9, permissions: modPermissions },
      { id: 'r3', name: '📊・Coordenação de Equipe', color: '#0284C7', hoist: true, mentionable: true, position: 8, permissions: defaultPermissions },
      { id: 'r4', name: '💻・Colaborador Efetivo', color: '#38BDF8', hoist: true, mentionable: false, position: 7, permissions: defaultPermissions },
      { id: 'r5', name: '📋・Estagiário / Trainee', color: '#7DD3FC', hoist: true, mentionable: false, position: 6, permissions: defaultPermissions },
      { id: 'r6', name: '💼・Parceiro Externo', color: '#94A3B8', hoist: false, mentionable: false, position: 1, permissions: defaultPermissions },
    ],
    defaultCategories: [
      {
        id: 'c1',
        name: '📢 ┃・INSTITUCIONAL',
        channels: [
          { id: 'ch1', name: '📌・comunicados-oficiais', type: 'announcement', topic: 'Diretrizes e avisos gerais' },
          { id: 'ch2', name: '📜・código-de-conduta', type: 'rules', topic: 'Normas corporativas' },
          { id: 'ch3', name: '📅・agenda-e-eventos', type: 'text', topic: 'Calendário de reuniões' },
        ],
      },
      {
        id: 'c2',
        name: '🔒 ┃・DIRETORIA & GESTÃO',
        isPrivate: true,
        allowedRoleIds: ['r1', 'r2'],
        channels: [
          { id: 'ch4', name: '💼・planejamento-estratégico', type: 'text', topic: 'Apenas liderança' },
          { id: 'ch5', name: '📊・metas-e-relatórios', type: 'text', topic: 'Resultados mensais' },
        ],
      },
      {
        id: 'c3',
        name: '👥 ┃・OPERAÇÕES & EQUIPE',
        channels: [
          { id: 'ch6', name: '💬・comunicação-interna', type: 'text', topic: 'Alinhamento geral de tarefas' },
          { id: 'ch7', name: '📁・compartilhamento-arquivos', type: 'text', topic: 'Documentos e planilhas' },
        ],
      },
      {
        id: 'c4',
        name: '🎙️ ┃・SALAS DE REUNIÃO',
        channels: [
          { id: 'ch8', name: '🎙️・Sala Executiva', type: 'voice', isPrivate: true, allowedRoleIds: ['r1', 'r2'], userLimit: 8 },
          { id: 'ch9', name: '🔊・Reunião Operacional 01', type: 'voice', userLimit: 12 },
          { id: 'ch10', name: '🔊・Reunião Operacional 02', type: 'voice', userLimit: 12 },
          { id: 'ch11', name: '☕・Descompressão & Café', type: 'voice', userLimit: 0 },
        ],
      },
    ],
  },

  fac: {
    type: 'fac',
    title: 'Servidor de Facção (FAC)',
    badge: 'Facção & Crime RP',
    description: 'Hierarquia fechada, comunicação de ações, rádio, recrutamento e controle de armamento/estoque.',
    features: ['Canais de Rádio e Ações', 'Controle de Armamento/Carga', 'Sala de Reunião da Liderança', 'Controle de Recrutas'],
    recommendedColor: '#EF4444',
    defaultRoles: [
      { id: 'r1', name: '👑・Líder Geral', color: '#991B1B', hoist: true, mentionable: true, position: 10, permissions: adminPermissions },
      { id: 'r2', name: '⭐・Sub-Líder', color: '#DC2626', hoist: true, mentionable: true, position: 9, permissions: modPermissions },
      { id: 'r3', name: '🔫・Gerente de Armas', color: '#EA580C', hoist: true, mentionable: true, position: 8, permissions: defaultPermissions },
      { id: 'r4', name: '🛡️・Soldado de Elite', color: '#D97706', hoist: true, mentionable: false, position: 7, permissions: defaultPermissions },
      { id: 'r5', name: '💀・Membro Oficial', color: '#4B5563', hoist: true, mentionable: false, position: 6, permissions: defaultPermissions },
      { id: 'r6', name: '⏳・Recruta em Teste', color: '#9CA3AF', hoist: true, mentionable: false, position: 5, permissions: defaultPermissions },
    ],
    defaultCategories: [
      {
        id: 'c1',
        name: '📢 ┃・DIRETRIZES DA FACÇÃO',
        channels: [
          { id: 'ch1', name: '📜・regras-da-fac', type: 'rules', topic: 'Regulamento interno' },
          { id: 'ch2', name: '🚨・avisos-importantes', type: 'announcement', topic: 'Ordens da cúpula' },
        ],
      },
      {
        id: 'c2',
        name: '🎯 ┃・AÇÕES & LOGÍSTICA',
        channels: [
          { id: 'ch3', name: '📦・estoque-e-cargas', type: 'text', topic: 'Controle de suprimentos' },
          { id: 'ch4', name: '🔫・baú-de-armas', type: 'text', topic: 'Registros de armamentos' },
          { id: 'ch5', name: '💰・caixa-da-facção', type: 'text', topic: 'Controle financeiro' },
        ],
      },
      {
        id: 'c3',
        name: '📻 ┃・RÁDIOS & COMUNICAÇÃO',
        channels: [
          { id: 'ch6', name: '📻・Rádio Principal (Ação)', type: 'voice', userLimit: 15 },
          { id: 'ch7', name: '📻・Rádio Reserva 02', type: 'voice', userLimit: 10 },
          { id: 'ch8', name: '🎙️・Cúpula / Liderança', type: 'voice', isPrivate: true, allowedRoleIds: ['r1', 'r2'], userLimit: 6 },
          { id: 'ch9', name: '🔊・Resenha da Favela', type: 'voice', userLimit: 0 },
        ],
      },
    ],
  },

  city_rp: {
    type: 'city_rp',
    title: 'Servidor de Cidade RP',
    badge: 'FiveM & GTA RP',
    description: 'Ambiente completo para servidores de Roleplay: prefeitura, departamentos de polícia, SAMU, mecânica e cidadãos.',
    features: ['Estrutura da Polícia (PM)', 'SAMU & Hospital', 'Canais de Denúncias e Suporte', 'Organizações e Empregos'],
    recommendedColor: '#8B5CF6',
    defaultRoles: [
      { id: 'r1', name: '🏛️・Prefeito / Coordenação', color: '#581C87', hoist: true, mentionable: true, position: 10, permissions: adminPermissions },
      { id: 'r2', name: '⚖️・Juiz / Poder Judiciário', color: '#6D28D9', hoist: true, mentionable: true, position: 9, permissions: modPermissions },
      { id: 'r3', name: '👮・Comando da Polícia', color: '#2563EB', hoist: true, mentionable: true, position: 8, permissions: defaultPermissions },
      { id: 'r4', name: '🚑・Diretoria do SAMU', color: '#DC2626', hoist: true, mentionable: true, position: 7, permissions: defaultPermissions },
      { id: 'r5', name: '🔧・Chefe da Mecânica', color: '#D97706', hoist: true, mentionable: true, position: 6, permissions: defaultPermissions },
      { id: 'r6', name: '💼・Empresário Registrado', color: '#059669', hoist: true, mentionable: false, position: 5, permissions: defaultPermissions },
      { id: 'r7', name: '🆔・Cidadão Aprovado (Whitelist)', color: '#0284C7', hoist: true, mentionable: false, position: 4, permissions: defaultPermissions },
      { id: 'r8', name: '⏳・Aguardando Whitelist', color: '#9CA3AF', hoist: false, mentionable: false, position: 1, permissions: defaultPermissions },
    ],
    defaultCategories: [
      {
        id: 'c1',
        name: '🌐 ┃・CIDADE & INFORMAÇÕES',
        channels: [
          { id: 'ch1', name: '📢・anúncios-da-cidade', type: 'announcement', topic: 'Atualizações da cidade' },
          { id: 'ch2', name: '📜・leis-e-regras-rp', type: 'rules', topic: 'Código Penal e diretrizes' },
          { id: 'ch3', name: '📋・whitelist-inscrição', type: 'text', topic: 'Como realizar o teste' },
        ],
      },
      {
        id: 'c2',
        name: '🏛️ ┃・PREFEITURA & ÓRGÃOS',
        channels: [
          { id: 'ch4', name: '🏛️・diário-oficial', type: 'announcement', topic: 'Decretos municipais' },
          { id: 'ch5', name: '💼・concessão-empresas', type: 'text', topic: 'Abertura de comércios' },
          { id: 'ch6', name: '🗳️・eleições-e-votações', type: 'text', topic: 'Votações públicas' },
        ],
      },
      {
        id: 'c3',
        name: '🚓 ┃・DEPARTAMENTO DE POLÍCIA',
        channels: [
          { id: 'ch7', name: '🚨・boletim-de-ocorrência', type: 'text', topic: 'Registros policiais' },
          { id: 'ch8', name: '📋・recrutamento-pm', type: 'text', topic: 'Alistamento militar' },
        ],
      },
      {
        id: 'c4',
        name: '🚑 ┃・HOSPITAL & SAMU',
        channels: [
          { id: 'ch9', name: '🏥・plantão-médico', type: 'text', topic: 'Atendimento do hospital' },
          { id: 'ch10', name: '🩺・laudos-e-atestados', type: 'text', topic: 'Registros clínicos' },
        ],
      },
      {
        id: 'c5',
        name: '🔊 ┃・VOZ RP & ATENDIMENTO',
        channels: [
          { id: 'ch11', name: '🔊・Aguardando Suporte', type: 'voice', userLimit: 1 },
          { id: 'ch12', name: '🔊・Sala de Whitelist', type: 'voice', userLimit: 2 },
          { id: 'ch13', name: '🎙️・Reunião Geral da Cidade', type: 'voice', userLimit: 0 },
        ],
      },
    ],
  },

  community: {
    type: 'community',
    title: 'Servidor de Comunidade',
    badge: 'Social & Interação',
    description: 'Perfeito para criadores de conteúdo, streamers, jogos em grupo, eventos e interação dinâmica entre membros.',
    features: ['Canais de Mídia e Memes', 'Salas de Jogos e Músicas', 'Sistema de Cargos Coloridos', 'Área de Eventos'],
    recommendedColor: '#EC4899',
    defaultRoles: [
      { id: 'r1', name: '👑・Fundador', color: '#EC4899', hoist: true, mentionable: true, position: 10, permissions: adminPermissions },
      { id: 'r2', name: '🛡️・Administrador', color: '#8B5CF6', hoist: true, mentionable: true, position: 9, permissions: modPermissions },
      { id: 'r3', name: '🔨・Moderador', color: '#3B82F6', hoist: true, mentionable: true, position: 8, permissions: modPermissions },
      { id: 'r4', name: '🎨・Designer & Criador', color: '#10B981', hoist: true, mentionable: false, position: 7, permissions: defaultPermissions },
      { id: 'r5', name: '⭐・Membro VIP', color: '#F59E0B', hoist: true, mentionable: false, position: 6, permissions: defaultPermissions },
      { id: 'r6', name: '💬・Membro Ativo', color: '#6366F1', hoist: true, mentionable: false, position: 5, permissions: defaultPermissions },
      { id: 'r7', name: '👋・Novo Membro', color: '#9CA3AF', hoist: false, mentionable: false, position: 1, permissions: defaultPermissions },
    ],
    defaultCategories: [
      {
        id: 'c1',
        name: '✨ ┃・BOAS-VINDAS',
        channels: [
          { id: 'ch1', name: '👋・boas-vindas', type: 'text', topic: 'Novos membros que entraram' },
          { id: 'ch2', name: '📜・regras-da-casa', type: 'rules', topic: 'Como manter um bom convívio' },
          { id: 'ch3', name: '📢・anúncios', type: 'announcement', topic: 'Fique por dentro' },
        ],
      },
      {
        id: 'c2',
        name: '💬 ┃・CONVÍVIO & CHAT',
        channels: [
          { id: 'ch4', name: '💬・bate-papo-geral', type: 'text', topic: 'Conversas sobre qualquer assunto' },
          { id: 'ch5', name: '📸・fotos-e-memes', type: 'text', topic: 'Mídia e diversão' },
          { id: 'ch6', name: '🤖・comandos-bots', type: 'text', topic: 'Música, mini-jogos e bots' },
        ],
      },
      {
        id: 'c3',
        name: '🔊 ┃・SALAS DE BATE-PAPO',
        channels: [
          { id: 'ch7', name: '🔊・Voz Geral 01', type: 'voice', userLimit: 0 },
          { id: 'ch8', name: '🔊・Voz Geral 02', type: 'voice', userLimit: 0 },
          { id: 'ch9', name: '🎮・Duo / Casal', type: 'voice', userLimit: 2 },
          { id: 'ch10', name: '🎮・Squad Games', type: 'voice', userLimit: 4 },
        ],
      },
    ],
  },

  support: {
    type: 'support',
    title: 'Servidor de Suporte',
    badge: 'Help Desk & Atendimento',
    description: 'Focado em resolução de problemas, abertura de chamados, documentação, tickets e base de conhecimento.',
    features: ['Central de Abertura de Tickets', 'FAQ e Base de Soluções', 'Salas de Atendimento Privadas', 'Hierarquia de Níveis N1/N2'],
    recommendedColor: '#06B6D4',
    defaultRoles: [
      { id: 'r1', name: '🛡️・Head de Suporte', color: '#0891B2', hoist: true, mentionable: true, position: 10, permissions: adminPermissions },
      { id: 'r2', name: '🔧・Especialista Nível 2', color: '#06B6D4', hoist: true, mentionable: true, position: 9, permissions: modPermissions },
      { id: 'r3', name: '🎧・Atendente Nível 1', color: '#22D3EE', hoist: true, mentionable: true, position: 8, permissions: defaultPermissions },
      { id: 'r4', name: '👤・Cliente em Atendimento', color: '#94A3B8', hoist: false, mentionable: false, position: 1, permissions: defaultPermissions },
    ],
    defaultCategories: [
      {
        id: 'c1',
        name: '📌 ┃・CENTRAL DE AJUDA',
        channels: [
          { id: 'ch1', name: '📢・avisos-de-instabilidade', type: 'announcement', topic: 'Status dos nossos serviços' },
          { id: 'ch2', name: '📖・artigos-e-tutoriais', type: 'text', topic: 'Guias passo a passo' },
          { id: 'ch3', name: '❓・faq-dúvidas', type: 'text', topic: 'Respostas para dúvidas comuns' },
        ],
      },
      {
        id: 'c2',
        name: '🎫 ┃・ABRIR CHAMADOS',
        channels: [
          { id: 'ch4', name: '🎟️・abrir-chamado', type: 'ticket', topic: 'Clique no botão do bot para criar um ticket' },
          { id: 'ch5', name: '🚨・denúncias-e-relatos', type: 'text', topic: 'Envie reportes anônimos' },
        ],
      },
      {
        id: 'c3',
        name: '🔊 ┃・ATENDIMENTO EM VOZ',
        channels: [
          { id: 'ch6', name: '🔊・Sala de Suporte 01', type: 'voice', userLimit: 2 },
          { id: 'ch7', name: '🔊・Sala de Suporte 02', type: 'voice', userLimit: 2 },
          { id: 'ch8', name: '🔒・Plantão Interno', type: 'voice', isPrivate: true, allowedRoleIds: ['r1', 'r2', 'r3'], userLimit: 5 },
        ],
      },
    ],
  },

  custom: {
    type: 'custom',
    title: 'Servidor Personalizado',
    badge: 'Criar do Zero',
    description: 'Monte a arquitetura dos seus sonhos com total liberdade para configurar canais, cargos e hierarquia.',
    features: ['Comece com tela em branco', 'Liberdade total de arquitetura', 'Adicione categorias ilimitadas', 'Personalize cada detalhe'],
    recommendedColor: '#6366F1',
    defaultRoles: [
      { id: 'r1', name: '👑・Fundador', color: '#6366F1', hoist: true, mentionable: true, position: 10, permissions: adminPermissions },
      { id: 'r2', name: '🛡️・Administrador', color: '#3B82F6', hoist: true, mentionable: true, position: 9, permissions: modPermissions },
      { id: 'r3', name: '👥・Membro', color: '#9CA3AF', hoist: false, mentionable: false, position: 1, permissions: defaultPermissions },
    ],
    defaultCategories: [
      {
        id: 'c1',
        name: '📌 ┃・GERAL',
        channels: [
          { id: 'ch1', name: '📢・anúncios', type: 'announcement', topic: 'Avisos da comunidade' },
          { id: 'ch2', name: '💬・bate-papo', type: 'text', topic: 'Canal de conversa principal' },
          { id: 'ch3', name: '🔊・Voz Principal', type: 'voice', userLimit: 0 },
        ],
      },
    ],
  },
};

export function generateProjectCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const segment1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const segment2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `DANONE-${segment1}-${segment2}`;
}

export function createInitialProject(templateType: ServerTemplateType, userId: string = 'user-default'): ProjectConfig {
  const template = TEMPLATES[templateType] || TEMPLATES.sales;
  const now = new Date().toISOString();
  
  return {
    id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    userId,
    code: generateProjectCode(),
    templateType,
    identity: {
      name: `${template.title} Oficial`,
      description: template.description,
      primaryColor: template.recommendedColor,
      secondaryColor: '#1E1F22',
      fontStyle: 'small_caps',
      customSeparator: '┃・',
    },
    roles: JSON.parse(JSON.stringify(template.defaultRoles)),
    categories: JSON.parse(JSON.stringify(template.defaultCategories)),
    status: 'draft',
    createdAt: now,
    updatedAt: now,
    progress: {
      stage: 'Aguardando Início',
      percent: 0,
      rolesCreated: 0,
      totalRoles: template.defaultRoles.length,
      categoriesCreated: 0,
      totalCategories: template.defaultCategories.length,
      channelsCreated: 0,
      totalChannels: template.defaultCategories.reduce((acc, cat) => acc + cat.channels.length, 0),
      logs: [],
    },
  };
}
