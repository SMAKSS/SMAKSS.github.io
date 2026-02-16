import { renderToStaticMarkup as render } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Box } from './Box';

describe('Box', () => {
  it('is a forwardRef component', () => {
    const forwardRefSymbol = Symbol.for('react.forward_ref');
    const boxType = Box as unknown as { $$typeof?: symbol };

    expect(boxType.$$typeof).toBe(forwardRefSymbol);
  });

  it('does not inject reset variant classes by default', () => {
    const markup = render(<Box>Content</Box>);

    expect(markup).toContain('<div');
    expect(markup).not.toContain('border-0');
    expect(markup).not.toContain('p-0');
    expect(markup).not.toContain('rounded-none');
  });

  it('applies explicit variant props', () => {
    const markup = render(
      <Box background="surface" border="default" padding="md" radius="xl">
        Content
      </Box>,
    );

    expect(markup).toContain('bg-(--card-bg)');
    expect(markup).toContain('border-(--card-border)');
    expect(markup).toContain('p-4');
    expect(markup).toContain('rounded-xl');
  });

  it('renders semantic element and custom attributes', () => {
    const markup = render(
      <Box as="section" aria-label="wrapper" className="custom-box">
        Content
      </Box>,
    );

    expect(markup).toContain('<section');
    expect(markup).toContain('aria-label="wrapper"');
    expect(markup).toContain('custom-box');
  });
});
