import { renderToStaticMarkup as render } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { PlaygroundTabs } from './PlaygroundTabs';

describe('PlaygroundTabs', () => {
  it('renders tablist and tab buttons with active aria state', () => {
    const markup = render(
      <PlaygroundTabs
        activeIndex={1}
        items={[
          { id: 'a', label: 'A' },
          { id: 'b', label: 'B' },
        ]}
        onSelect={vi.fn()}
      />,
    );

    expect(markup).toContain('role="tablist"');
    expect(markup).toContain('role="tab"');
    expect(markup).toContain('aria-selected="true"');
    expect(markup).toContain('aria-selected="false"');
  });

  it('renders active indicator and base scroll container styles', () => {
    const markup = render(
      <PlaygroundTabs
        activeIndex={0}
        items={[
          { id: 'one', label: 'One' },
          { id: 'two', label: 'Two' },
        ]}
        onSelect={vi.fn()}
      />,
    );

    expect(markup).toContain('overflow-x-auto');
    expect(markup).toContain('playground-tabs-scroll');
    expect(markup).toContain('touch-pan-x');
    expect(markup).toContain('bg-(--accent)');
  });
});
