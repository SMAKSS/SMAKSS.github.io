import type {
  MobileMenuIconPropsType,
  SocialIconPropsType,
  ThemeToggleIconPropsType,
} from './icon.type';

/**
 * Renders the icon used by the theme toggle based on active mode.
 */
export const ThemeToggleIcon = ({ theme }: ThemeToggleIconPropsType) => {
  if (theme === 'dark') {
    return (
      <svg aria-hidden className="size-4" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 4V2M12 22v-2M4 12H2M22 12h-2M6.34 6.34 4.93 4.93M19.07 19.07l-1.41-1.41M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden className="size-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3c-.1.65-.16 1.31-.16 2a9 9 0 0 0 9 9c.69 0 1.35-.06 2-.21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
};

/**
 * Renders the mobile navigation toggle icon for open and closed states.
 */
export const MobileMenuIcon = ({ isOpen }: MobileMenuIconPropsType) => {
  return (
    <svg aria-hidden className="size-4" fill="none" viewBox="0 0 24 24">
      {isOpen ? (
        <path
          d="M6 6l12 12M18 6 6 18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
        />
      ) : (
        <>
          <path d="M4 7h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
          <path d="M4 12h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
          <path d="M4 17h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
        </>
      )}
    </svg>
  );
};

/**
 * Resolves the social icon associated with a social link identifier.
 */
export const SocialIcon = ({ id }: SocialIconPropsType) => {
  if (id === 'github') {
    return (
      <svg aria-hidden className="size-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.49v-1.91c-2.78.61-3.37-1.34-3.37-1.34a2.65 2.65 0 0 0-1.11-1.46c-.91-.62.07-.61.07-.61a2.1 2.1 0 0 1 1.53 1.03 2.13 2.13 0 0 0 2.91.83 2.13 2.13 0 0 1 .64-1.34c-2.22-.25-4.55-1.11-4.55-4.95a3.88 3.88 0 0 1 1.03-2.69 3.61 3.61 0 0 1 .1-2.65s.84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02a3.61 3.61 0 0 1 .1 2.65 3.88 3.88 0 0 1 1.03 2.69c0 3.85-2.34 4.7-4.57 4.95a2.4 2.4 0 0 1 .68 1.86V21c0 .27.18.58.69.49A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }

  if (id === 'linkedin') {
    return (
      <svg aria-hidden className="size-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5A2.5 2.5 0 0 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.84-2.06 3.8-2.06 4.06 0 4.82 2.67 4.82 6.14V21h-4v-5.48c0-1.31-.02-3-1.83-3-1.84 0-2.12 1.43-2.12 2.9V21h-4V9Z" />
      </svg>
    );
  }

  if (id === 'stackoverflow') {
    return (
      <svg aria-hidden className="size-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.57 20.2v-5.75h1.92V22H4.26v-7.55h1.92v5.75h11.4Zm-9.47-1.91h7.53v-1.91H8.1v1.9Zm.1-4.34 7.38 1.55.4-1.88-7.4-1.56-.38 1.9Zm.97-3.52 6.85 3.2.82-1.74L9.99 8.7l-.82 1.73Zm1.9-3.35 5.8 4.83 1.23-1.48-5.8-4.84-1.23 1.5Zm3.74-3.82-1.56 1.12 4.43 6.14 1.56-1.12-4.43-6.14Z" />
      </svg>
    );
  }

  if (id === 'npm') {
    return (
      <svg aria-hidden className="size-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M2 8v8h10v2h10V8H2Zm2 2h6v4H4v-4Zm8 0h4v6h-4v-6Zm6 0h2v6h-2v-6Z" />
      </svg>
    );
  }

  if (id === 'hackernoon') {
    return (
      <svg aria-hidden className="size-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 4h3.3l4.4 7.3V4H15v16h-3.2L7.2 12.4V20H4V4Zm12.6 0H20c0 5-3.1 8-7.8 8V8.8c2.5-.2 4.4-1.8 4.4-4.8Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden className="size-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M4 7.5 12 13l8-5.5M5 18h14a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
