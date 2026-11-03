// @vitest-environment jsdom

import { act, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import { PlaygroundTabs } from './PlaygroundTabs';
import type { DispatchPlaygroundTabsWheelInputType } from './playground-tabs-test.type';

const items = [
  { id: 'one', label: 'One' },
  { id: 'two', label: 'Two' },
  { id: 'three', label: 'Three' },
];

const getTabList = (renderedContainer: HTMLDivElement): HTMLElement => {
  const tabList = renderedContainer.querySelector('[role="tablist"]');

  if (!(tabList instanceof HTMLElement)) {
    throw new TypeError('Expected the playground tab list to render.');
  }

  Object.defineProperties(tabList, {
    clientWidth: { configurable: true, value: 100 },
    scrollWidth: { configurable: true, value: 300 },
  });

  return tabList;
};

const dispatchWheel = ({
  eventInit,
  tabList,
}: DispatchPlaygroundTabsWheelInputType): WheelEvent => {
  const event = new WheelEvent('wheel', {
    bubbles: true,
    cancelable: true,
    ...eventInit,
  });

  act(() => {
    tabList.dispatchEvent(event);
  });

  return event;
};

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

  it('scrolls the tab strip and prevents page scrolling while it can move', () => {
    const tabList = getTabList(renderHarness());
    const event = dispatchWheel({ tabList, eventInit: { deltaY: 40 } });

    expect(tabList.scrollLeft).toBe(40);
    expect(event.defaultPrevented).toBe(true);
  });

  it.each([
    { deltaMode: WheelEvent.DOM_DELTA_LINE, deltaY: 3, expectedScrollLeft: 60 },
    { deltaMode: WheelEvent.DOM_DELTA_PAGE, deltaY: 1, expectedScrollLeft: 100 },
  ])(
    'normalizes delta mode $deltaMode before scrolling the tab strip',
    ({ deltaMode, deltaY, expectedScrollLeft }) => {
      const tabList = getTabList(renderHarness());
      tabList.style.lineHeight = '20px';

      const event = dispatchWheel({ tabList, eventInit: { deltaMode, deltaY } });

      expect(tabList.scrollLeft).toBe(expectedScrollLeft);
      expect(event.defaultPrevented).toBe(true);
    },
  );

  it('clamps LTR scrolling and lets the page scroll at either edge', () => {
    const tabList = getTabList(renderHarness());

    const startEdgeEvent = dispatchWheel({ tabList, eventInit: { deltaY: -20 } });
    expect(tabList.scrollLeft).toBe(0);
    expect(startEdgeEvent.defaultPrevented).toBe(false);

    tabList.scrollLeft = 190;
    const reachingEndEvent = dispatchWheel({ tabList, eventInit: { deltaY: 30 } });
    expect(tabList.scrollLeft).toBe(200);
    expect(reachingEndEvent.defaultPrevented).toBe(true);

    const endEdgeEvent = dispatchWheel({ tabList, eventInit: { deltaY: 30 } });
    expect(tabList.scrollLeft).toBe(200);
    expect(endEdgeEvent.defaultPrevented).toBe(false);
  });

  it('scrolls and clamps RTL offsets in the opposite direction', () => {
    const tabList = getTabList(renderHarness());
    tabList.style.direction = 'rtl';
    tabList.scrollLeft = -190;

    const reachingStartEvent = dispatchWheel({ tabList, eventInit: { deltaY: 30 } });
    expect(tabList.scrollLeft).toBe(-200);
    expect(reachingStartEvent.defaultPrevented).toBe(true);

    const startEdgeEvent = dispatchWheel({ tabList, eventInit: { deltaY: 30 } });
    expect(tabList.scrollLeft).toBe(-200);
    expect(startEdgeEvent.defaultPrevented).toBe(false);
  });

  it('preserves the page default for Ctrl+wheel, horizontal gestures, and non-overflowing strips', () => {
    const tabList = getTabList(renderHarness());

    for (const eventInit of [
      { ctrlKey: true, deltaY: 40 },
      { deltaX: 40, deltaY: 20 },
    ]) {
      const event = dispatchWheel({ tabList, eventInit });

      expect(tabList.scrollLeft).toBe(0);
      expect(event.defaultPrevented).toBe(false);
    }

    Object.defineProperty(tabList, 'scrollWidth', { configurable: true, value: 100 });
    const nonOverflowingEvent = dispatchWheel({ tabList, eventInit: { deltaY: 40 } });

    expect(tabList.scrollLeft).toBe(0);
    expect(nonOverflowingEvent.defaultPrevented).toBe(false);
  });
});
