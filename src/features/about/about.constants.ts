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
