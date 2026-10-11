export type ChannelType = 'text' | 'voice' | 'announcement' | 'rules' | 'logs' | 'ticket' | 'forum';

export interface ChannelConfig {
  id: string;
  name: string;
  type: ChannelType;
  topic?: string;
  isPrivate?: boolean;
  allowedRoleIds?: string[];
  userLimit?: number; // Para canais de voz (0 = ilimitado)
  bitrate?: number;
}

export interface CategoryConfig {
  id: string;
  name: string;
  isPrivate?: boolean;
  allowedRoleIds?: string[];
  channels: ChannelConfig[];
}

export interface DiscordPermissions {
  administrator: boolean;
  manageGuild: boolean;
  manageRoles: boolean;
  manageChannels: boolean;
  kickMembers: boolean;
  banMembers: boolean;
  viewAuditLog: boolean;
  viewChannel: boolean;
  sendMessages: boolean;
  readMessageHistory: boolean;
  attachFiles: boolean;
  mentionEveryone: boolean;
  connect: boolean;
  speak: boolean;
  muteMembers: boolean;
  deafenMembers: boolean;
  moveMembers: boolean;
}

export interface RoleConfig {
  id: string;
  name: string;
  color: string; // Hex color like #5865F2
  hoist: boolean; // Display role members separately
  mentionable: boolean;
  position: number; // Hierarchical order (higher = above)
  permissions: DiscordPermissions;
}

export type FontStyleOption = 
  | 'normal' 
  | 'small_caps' 
  | 'unicode_bold' 
  | 'unicode_script' 
  | 'with_emoji' 
  | 'separator_line' 
  | 'separator_point'
  | 'custom';

export type ServerTemplateType = 
  | 'sales' 
  | 'corp' 
  | 'fac' 
  | 'city_rp' 
  | 'community' 
  | 'support' 
  | 'custom';

export interface ServerIdentity {
  name: string;
  description: string;
  iconUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  fontStyle: FontStyleOption;
  customPrefix?: string;
  customSeparator?: string;
}

export type ExecutionStatus = 'draft' | 'pending_activation' | 'running' | 'completed' | 'error';

export interface ExecutionLog {
  timestamp: string;
  stage: 'roles' | 'categories' | 'channels' | 'permissions' | 'finalizing';
  message: string;
  progressPercent: number;
  rolesCreated?: number;
  categoriesCreated?: number;
  channelsCreated?: number;
  isError?: boolean;
}

export interface ProjectConfig {
  id: string;
  userId: string;
  code: string; // Ex: DANONE-8X29-KP51
  templateType: ServerTemplateType;
  identity: ServerIdentity;
  roles: RoleConfig[];
  categories: CategoryConfig[];
  status: ExecutionStatus;
  createdAt: string;
  updatedAt: string;
  executedAt?: string;
  completedAt?: string;
  guildId?: string;
  guildName?: string;
  progress: {
    stage: string;
    percent: number;
    rolesCreated: number;
    totalRoles: number;
    categoriesCreated: number;
    totalCategories: number;
    channelsCreated: number;
    totalChannels: number;
    logs: ExecutionLog[];
    error?: string;
  };
}
