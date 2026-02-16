import type { ReactNode } from 'react';

import { Box } from '../../components/Box';
import { Text } from '../../components/Text';
import { useAppTranslation } from '../../i18n/use-app-translation.hook';
import type { AboutContentType, RenderParagraphContentInputType } from './about-content.type';
import {
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
      ? { closing: '', headline: '', intro: [], name: '', sections: [] }
      : {
          closing: contentPayload.closing,
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
        {content.sections.map((section) => {
          return (
            <Box as="section" key={section.title}>
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
            </Box>
          );
        })}
      </Box>

      <Text
        as="p"
        className="mt-16 border-t border-(--card-border) pt-10 text-2xl leading-relaxed tracking-tight"
      >
        {content.closing}
      </Text>
    </Box>
  );
};
