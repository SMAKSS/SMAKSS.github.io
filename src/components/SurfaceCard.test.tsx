import { renderToStaticMarkup as render } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SurfaceCard } from './SurfaceCard';

describe('SurfaceCard', () => {
  it('renders section by default with surface styles', () => {
    const markup = render(<SurfaceCard>Body</SurfaceCard>);

    expect(markup).toContain('<section');
    expect(markup).toContain('bg-(--card-bg)');
    expect(markup).toContain('border-(--card-border)');
    expect(markup).toContain('rounded-2xl');
  });

  it('renders custom semantic element via as prop', () => {
    const markup = render(<SurfaceCard as="article">Body</SurfaceCard>);

    expect(markup).toContain('<article');
  });

  it('appends custom class names', () => {
    const markup = render(<SurfaceCard className="custom-surface">Body</SurfaceCard>);

    expect(markup).toContain('custom-surface');
  });
});
