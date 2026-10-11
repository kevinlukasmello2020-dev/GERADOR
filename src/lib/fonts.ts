// Mapeamentos Unicode para estilização de texto de servidores Discord

const smallCapsMap: Record<string, string> = {
  a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ', h: 'ʜ', i: 'ɪ',
  j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ',
  s: 'ꜱ', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ',
  A: 'ᴀ', B: 'ʙ', C: 'ᴄ', D: 'ᴅ', E: 'ᴇ', F: 'ꜰ', G: 'ɢ', H: 'ʜ', I: 'ɪ',
  J: 'ᴊ', K: 'ᴋ', L: 'ʟ', M: 'ᴍ', N: 'ɴ', O: 'ᴏ', P: 'ᴘ', Q: 'ǫ', R: 'ʀ',
  S: 'ꜱ', T: 'ᴛ', U: 'ᴜ', V: 'ᴠ', W: 'ᴡ', X: 'x', Y: 'ʏ', Z: 'ᴢ',
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
};

const unicodeBoldMap: Record<string, string> = {
  a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴', h: '𝗵', i: '𝗶',
  j: '𝗷', k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻', o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿',
  s: '𝘀', t: '𝘁', u: '𝘂', v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇',
  A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚', H: '𝗛', I: '𝗜',
  J: '𝗝', K: '𝗞', L: '𝗟', M: '𝗠', N: '𝗡', O: '𝗢', P: '𝗣', Q: '𝗤', R: '𝗥',
  S: '𝗦', T: '𝗧', U: '𝗨', V: '𝗩', W: '𝗪', X: '𝗫', Y: '𝗬', Z: '𝗭',
  '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
};

const unicodeScriptMap: Record<string, string> = {
  a: '𝒶', b: '𝒷', c: '𝒸', d: '𝒹', e: 'ℯ', f: '𝒻', g: 'ℊ', h: '𝒽', i: '𝒾',
  j: '𝒿', k: '𝓀', l: '𝓁', m: '𝓂', n: '𝓃', o: 'ℴ', p: '𝓅', q: '𝓆', r: '𝓇',
  s: '𝓈', t: '𝓉', u: '𝓊', v: '𝓋', w: '𝓌', x: '𝓍', y: '𝓎', z: '𝓏',
  A: '𝒜', B: 'ℬ', C: '𝒞', D: '𝒟', E: 'ℰ', F: 'ℱ', G: '𝒢', H: 'ℋ', I: 'ℐ',
  J: '𝒥', K: '𝒦', L: 'ℒ', M: 'ℳ', N: '𝒩', O: '𝒪', P: '𝒫', Q: '𝒬', R: 'ℛ',
  S: '𝒮', T: '𝒯', U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳', Y: '𝒴', Z: '𝒵'
};

export function toSmallCaps(text: string): string {
  return text.split('').map(char => smallCapsMap[char] || char).join('');
}

export function toUnicodeBold(text: string): string {
  return text.split('').map(char => unicodeBoldMap[char] || char).join('');
}

export function toUnicodeScript(text: string): string {
  return text.split('').map(char => unicodeScriptMap[char] || char).join('');
}

export function applyStyleToName(
  name: string,
  style: string,
  options?: {
    isCategory?: boolean;
    channelType?: string;
    customPrefix?: string;
    customSeparator?: string;
    emoji?: string;
  }
): string {
  if (!name) return '';
  const cleanName = name.trim();
  const emoji = options?.emoji || '';
  const sep = options?.customSeparator || '┃・';

  switch (style) {
    case 'small_caps': {
      const styled = toSmallCaps(cleanName);
      if (options?.isCategory) return `📂 ${sep}${styled}`;
      if (emoji) return `${emoji} ${sep}${styled}`;
      return styled;
    }
    case 'unicode_bold': {
      const styled = toUnicodeBold(cleanName);
      if (options?.isCategory) return `📂 ${sep}${styled}`;
      if (emoji) return `${emoji} ${sep}${styled}`;
      return styled;
    }
    case 'unicode_script': {
      const styled = toUnicodeScript(cleanName);
      if (options?.isCategory) return `📂 ${sep}${styled}`;
      if (emoji) return `${emoji} ${sep}${styled}`;
      return styled;
    }
    case 'separator_line': {
      const styled = toSmallCaps(cleanName);
      return options?.isCategory ? `📂 ┃ ${styled}` : `${emoji ? emoji + ' ' : ''}┃・${styled}`;
    }
    case 'separator_point': {
      const styled = cleanName.toLowerCase();
      return options?.isCategory ? `📁 〢 ${styled.toUpperCase()}` : `・${styled}・`;
    }
    case 'with_emoji': {
      return emoji ? `${emoji}・${cleanName}` : `✨・${cleanName}`;
    }
    case 'custom': {
      const prefix = options?.customPrefix || '';
      return `${prefix}${cleanName}`;
    }
    case 'normal':
    default:
      return cleanName;
  }
}

export const FONT_STYLE_PREVIEWS = [
  { id: 'normal', label: 'Letras Normais', example: 'anúncios / REGRAS' },
  { id: 'small_caps', label: 'Small Caps Estilizadas', example: '📢 ┃・ᴀɴᴜɴᴄɪᴏꜱ' },
  { id: 'unicode_bold', label: 'Unicode Negrito Moderno', example: '📢 ┃・𝗮𝗻𝘂𝗻𝗰𝗶𝗼𝘀' },
  { id: 'unicode_script', label: 'Unicode Cursivo Elegante', example: '✨ ┃・𝒶𝓃𝓊𝓃𝒸𝒾ℴ𝓈' },
  { id: 'separator_line', label: 'Separador de Linha (┃・)', example: '📂 ┃ ᴄᴀᴛᴇɢᴏʀɪᴀ' },
  { id: 'separator_point', label: 'Separador por Pontos (・)', example: '・anuncios・' },
  { id: 'with_emoji', label: 'Foco em Emojis', example: '📢・anuncios' },
  { id: 'custom', label: 'Personalizado', example: 'Defina seu próprio padrão' },
];
