// @vitest-environment jsdom

import { act, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import { PlaygroundTabs } from './PlaygroundTabs';

const items = [
  { id: 'one', label: 'One' },
  { id: 'two', label: 'Two' },
  { id: 'three', label: 'Three' },
];

const PlaygroundTabsHarness = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  if (activeItem === undefined) {
    return null;
  }

  return (
    <>
      <PlaygroundTabs
        activeIndex={activeIndex}
        baseId="playground"
        items={items}
        onSelect={({ index }) => {
          setActiveIndex(index);
        }}
      />
      <div
        aria-labelledby={`playground-tab-${activeItem.id}`}
        id={`playground-panel-${activeItem.id}`}
        role="tabpanel"
      >
        {activeItem.label}
      </div>
    </>
  );
};

describe('PlaygroundTabs', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  const renderHarness = (): HTMLDivElement => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);

    act(() => {
      root?.render(<PlaygroundTabsHarness />);
    });

    return container;
  };

  afterEach(() => {
    act(() => {
      root?.unmount();
    });

    container?.remove();
    root = null;
    container = null;
  });

  it('wires tabs and tabpanel ids with roving tabindex semantics', () => {
    const renderedContainer = renderHarness();
    const tablist = renderedContainer.querySelector('[role="tablist"]');
    const firstTab = renderedContainer.querySelector('#playground-tab-one');
    const secondTab = renderedContainer.querySelector('#playground-tab-two');
    const panel = renderedContainer.querySelector('#playground-panel-one');

    expect(tablist?.getAttribute('aria-orientation')).toBe('horizontal');
    expect(firstTab?.getAttribute('aria-controls')).toBe('playground-panel-one');
    expect(firstTab?.getAttribute('aria-selected')).toBe('true');
    expect(firstTab?.getAttribute('tabindex')).toBe('0');
    expect(secondTab?.getAttribute('aria-selected')).toBe('false');
    expect(secondTab?.getAttribute('tabindex')).toBe('-1');
    expect(panel?.getAttribute('aria-labelledby')).toBe('playground-tab-one');
  });

  it('moves focus and selection with arrow-key navigation', () => {
    const renderedContainer = renderHarness();
    const firstTab = renderedContainer.querySelector('#playground-tab-one');

    if (!(firstTab instanceof HTMLButtonElement)) {
      throw new TypeError('Expected first tab button to render.');
    }

    act(() => {
      firstTab.focus();
      firstTab.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }));
    });

    const secondTab = renderedContainer.querySelector('#playground-tab-two');
    const secondPanel = renderedContainer.querySelector('#playground-panel-two');

    expect(document.activeElement).toBe(secondTab);
    expect(secondTab?.getAttribute('aria-selected')).toBe('true');
    expect(secondPanel?.getAttribute('aria-labelledby')).toBe('playground-tab-two');
  });
});
