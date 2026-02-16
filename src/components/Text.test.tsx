import { renderToStaticMarkup as render } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Text } from './Text';

describe('Text', () => {
  it('renders heading element when requested', () => {
    const markup = render(
      <Text as="h2" size="xl" tone="default" weight="bold">
        Title
      </Text>,
    );

    expect(markup).toContain('<h2');
    expect(markup).toContain('text-xl');
    expect(markup).toContain('font-bold');
  });

  it('renders external anchor attributes when externalLink is true', () => {
    const markup = render(
      <Text as="a" externalLink href="https://example.com">
        Docs
      </Text>,
    );

    expect(markup).toContain('<a');
    expect(markup).toContain('href="https://example.com"');
    expect(markup).toContain('target="_blank"');
    expect(markup).toContain('rel="noreferrer"');
  });

  it('applies decoration and underline offset classes', () => {
    const markup = render(
      <Text decoration="underline" size="sm" tone="muted" underlineOffset>
        Label
      </Text>,
    );

    expect(markup).toContain('underline');
    expect(markup).toContain('underline-offset-[0.2em]');
    expect(markup).toContain('text-sm');
    expect(markup).toContain('text-(--muted-foreground)');
  });

  it('forwards non-anchor element props', () => {
    const markup = render(
      <Text as="p" className="lead" id="intro">
        Intro
      </Text>,
    );

    expect(markup).toContain('<p');
    expect(markup).toContain('id="intro"');
    expect(markup).toContain('lead');
  });
});
