/**
 * Regex used to capture email fragments inside paragraph text.
 */
export const EMAIL_CAPTURE_PATTERN = /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;

/**
 * Regex used to validate if a segment is an email.
 */
export const EMAIL_SEGMENT_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/**
 * Placeholder token replaced with the contact email link.
 */
export const EMAIL_LINK_TOKEN = '{EMAIL_LINK}';

/**
 * Placeholder token replaced with the Ko-fi link.
 */
export const KOFI_LINK_TOKEN = '{KOFI_LINK}';

/**
 * Regex used to split paragraph text by known placeholder tokens.
 */
export const LINK_TOKEN_PATTERN = /(\{EMAIL_LINK\}|\{KOFI_LINK\})/g;

/**
 * Public contact email used for mailto links.
 */
export const CONTACT_EMAIL = 'kazemi914@live.com';

/**
 * Ko-fi URL used for support links.
 */
export const KOFI_URL = 'https://ko-fi.com/smakss/';

/**
 * Stable section anchors and the meme illustrations used in the narrative.
 */
export const ABOUT_SECTIONS = [
  {
    id: 'interface-to-system',
    meme: {
      key: 'interface',
      image: 'https://i.imgflip.com/30b1gx.jpg',
      source: 'https://imgflip.com/memetemplate/Drake-Hotline-Bling',
    },
  },
  {
    id: 'building-products',
    meme: {
      key: 'production',
      image: 'https://i.imgflip.com/1buxli.jpg',
      source: 'https://imgflip.com/memetemplate/80385174/This-is-fine',
    },
  },
  {
    id: 'frontend-at-scale',
    meme: {
      key: 'observability',
      image: 'https://i.imgflip.com/2kbn1e.jpg',
      source: 'https://imgflip.com/memetemplate/Surprised-Pikachu',
    },
  },
  {
    id: 'thinking-in-systems',
    meme: {
      key: 'complexity',
      image: 'https://i.imgflip.com/1g8my4.jpg',
      source: 'https://imgflip.com/memetemplate/Two-Buttons',
    },
  },
  {
    id: 'beyond-employment',
    meme: {
      key: 'community',
      image: 'https://i.imgflip.com/24y43o.jpg',
      source: 'https://imgflip.com/memetemplate/Change-My-Mind',
    },
  },
] as const;
