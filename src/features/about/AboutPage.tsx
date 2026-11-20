import { Box } from '@components/Box';
import { ArrowIcon } from '@components/Icon';
import { Text } from '@components/Text';
import { useAppTranslation } from '@i18n/use-app-translation.hook';
import type { ReactNode } from 'react';
import type { AboutContentType, RenderParagraphContentInputType } from './about-content.type';
import {
  ABOUT_SECTIONS,
  CONTACT_EMAIL,
  EMAIL_CAPTURE_PATTERN,
  EMAIL_LINK_TOKEN,
  EMAIL_SEGMENT_PATTERN,
  KOFI_LINK_TOKEN,
  KOFI_URL,
  LINK_TOKEN_PATTERN,
} from './about.constants';

/**
 * Converts token placeholders and inline emails into clickable links.
 */
const renderParagraphContent = ({
  emailLinkLabel,
  kofiLinkLabel,
  value,
}: RenderParagraphContentInputType): ReactNode[] => {
  if (value.includes(EMAIL_LINK_TOKEN) || value.includes(KOFI_LINK_TOKEN)) {
    const segments = value.split(LINK_TOKEN_PATTERN);

    return segments.map((segment, index) => {
      if (segment === EMAIL_LINK_TOKEN) {
        return (
          <Text
            as="a"
            className="about-inline-link"
            href={`mailto:${CONTACT_EMAIL}`}
            key={`email-link-${String(index)}`}
            underlineOffset
            decoration="underline"
          >
            {emailLinkLabel}
          </Text>
        );
      }

      if (segment === KOFI_LINK_TOKEN) {
        return (
          <Text
            as="a"
            className="about-inline-link"
            externalLink
            href={KOFI_URL}
            key={`kofi-link-${String(index)}`}
            underlineOffset
            decoration="underline"
          >
            {kofiLinkLabel}
          </Text>
        );
      }

      return <Text key={`${segment}-${String(index)}`}>{segment}</Text>;
    });
  }

  const segments = value.split(EMAIL_CAPTURE_PATTERN);

  return segments.map((segment, index) => {
    if (EMAIL_SEGMENT_PATTERN.test(segment)) {
      return (
        <Text
          as="a"
          className="about-inline-link"
          decoration="underline"
          href={`mailto:${segment}`}
          key={`${segment}-${String(index)}`}
          underlineOffset
        >
          {segment}
        </Text>
      );
    }

    return <Text key={`${segment}-${String(index)}`}>{segment}</Text>;
  });
};

/**
 * Renders the localized narrative for the about route.
 */
export const AboutPage = () => {
  const { t } = useAppTranslation();
  const contentPayload = t('aboutContent', { returnObjects: true }) as AboutContentType | string;
  const content: AboutContentType =
    typeof contentPayload === 'string'
      ? { headline: '', intro: [], name: '', sections: [] }
      : {
          headline: contentPayload.headline,
          intro: Array.isArray(contentPayload.intro) ? contentPayload.intro : [],
          name: contentPayload.name,
          sections: Array.isArray(contentPayload.sections) ? contentPayload.sections : [],
        };

  return (
    <Box as="article" className="mx-auto w-full max-w-6xl px-6 pt-8 md:px-10">
      <Text as="h1" className="text-4xl tracking-tight md:text-6xl" weight="medium">
        {content.name}
      </Text>
      <Text as="p" className="mt-4 md:text-lg" tone="muted">
        {content.headline}
      </Text>

      <nav className="about-contents" aria-label={t('about.contents')}>
        <details>
          <summary className="about-contents-label">
            {t('about.contents')} <ArrowIcon direction="down" className="about-contents-arrow" />
          </summary>
          <ol>
            {content.sections.map((section, index) => (
              <li key={section.title}>
                <a href={`#${ABOUT_SECTIONS[index]?.id ?? `section-${String(index + 1)}`}`}>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </details>
      </nav>

      <Box className="mt-10 space-y-5 text-lg leading-relaxed text-(--foreground)/95">
        {content.intro.map((paragraph) => {
          return (
            <Text as="p" key={paragraph} className="leading-relaxed md:text-lg" tone="subtle">
              {renderParagraphContent({
                emailLinkLabel: t('social.email'),
                kofiLinkLabel: t('social.kofi'),
                value: paragraph,
              })}
            </Text>
          );
        })}
      </Box>

      <Box className="mt-14 space-y-14">
        {content.sections.map((section, index) => {
          const sectionConfig = ABOUT_SECTIONS[index];
          const meme =
            sectionConfig !== undefined && 'meme' in sectionConfig ? sectionConfig.meme : null;

          return (
            <Box
              as="section"
              id={sectionConfig?.id ?? `section-${String(index + 1)}`}
              key={section.title}
            >
              <Text as="h2" className="text-3xl tracking-tight" weight="medium">
                {section.title}
              </Text>
              <Box className="mt-6 space-y-4 text-base leading-relaxed text-(--foreground)/95 md:text-lg">
                {section.paragraphs.map((paragraph) => {
                  return (
                    <Text
                      as="p"
                      key={paragraph}
                      className="leading-relaxed md:text-lg"
                      tone="subtle"
                    >
                      {renderParagraphContent({
                        emailLinkLabel: t('social.email'),
                        kofiLinkLabel: t('social.kofi'),
                        value: paragraph,
                      })}
                    </Text>
                  );
                })}
              </Box>
              {meme !== null ? (
                <figure className={`about-meme about-meme--${meme.key}`}>
                  {meme.key === 'production' ? (
                    <figcaption className="about-meme-caption">
                      <Text as="p" className="about-meme-setup">
                        {t(`aboutMeme.${meme.key}.setup`)}
                      </Text>
                      <Text as="p" className="about-meme-punchline">
                        {t(`aboutMeme.${meme.key}.punchline`)}
                      </Text>
                    </figcaption>
                  ) : null}
                  <a
                    aria-label={`${t('aboutMeme.source')}: ${t(`aboutMeme.${meme.key}.alt`)}`}
                    className="about-meme-link"
                    href={meme.source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      alt={t(`aboutMeme.${meme.key}.alt`)}
                      className={`about-meme-art about-meme-art--${meme.key}`}
                      loading="lazy"
                      src={meme.image}
                    />
                    <span className="about-meme-source" aria-hidden="true">
                      {t('aboutMeme.source')}
                      <ArrowIcon direction="up-right" className="about-meme-source-icon" />
                    </span>
                  </a>
                  {meme.key === 'complexity' ? (
                    <figcaption className="about-meme-button-labels">
                      <span>{t('aboutMeme.complexity.platform')}</span>
                      <span>{t('aboutMeme.complexity.simple')}</span>
                    </figcaption>
                  ) : meme.key !== 'production' ? (
                    <figcaption className="about-meme-caption">
                      <Text as="p" className="about-meme-setup">
                        {t(`aboutMeme.${meme.key}.setup`)}
                      </Text>
                      {meme.key !== 'community' ? (
                        <Text as="p" className="about-meme-punchline">
                          {t(`aboutMeme.${meme.key}.punchline`)}
                        </Text>
                      ) : null}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
