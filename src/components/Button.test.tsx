import { renderToStaticMarkup as render } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders a native button with default type and base classes', () => {
    const markup = render(<Button>Press</Button>);

    expect(markup).toContain('<button');
    expect(markup).toContain('type="button"');
    expect(markup).toContain('disabled:opacity-60');
  });

  it('renders an anchor when href is provided', () => {
    const markup = render(
      <Button href="https://example.com" rel="noreferrer" target="_blank">
        Docs
      </Button>,
    );

    expect(markup).toContain('<a');
    expect(markup).toContain('href="https://example.com"');
    expect(markup).toContain('target="_blank"');
  });

  it('applies variant and size classes', () => {
    const markup = render(
      <Button size="sm" variant="icon">
        Icon
      </Button>,
    );

    expect(markup).toContain('px-3');
    expect(markup).toContain('rounded-full');
    expect(markup).toContain('text-(--muted-foreground)');
  });

  it('forwards disabled and aria props in native mode', () => {
    const markup = render(
      <Button aria-label="save" disabled>
        Save
      </Button>,
    );

    expect(markup).toContain('disabled=""');
    expect(markup).toContain('aria-label="save"');
  });
});
