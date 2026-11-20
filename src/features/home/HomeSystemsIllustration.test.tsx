// @vitest-environment jsdom
import en from '@i18n/locales/en.json';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, expect, it, vi } from 'vitest';
import { REQUEST_STEPS } from './home-system.constants';
import { HomeSystemsIllustration } from './HomeSystemsIllustration';

vi.mock('@i18n/use-app-translation.hook', () => ({
  useAppTranslation: () => ({
    t: (key: string, values?: Record<string, number>) => {
      if (key.startsWith('hero.system.events.')) {
        const kind = key.split('.').pop() as keyof typeof en.hero.system.events;
        return en.hero.system.events[kind].replace('{{id}}', String(values?.id));
      }
      return values?.count === undefined ? key : key + ' ' + String(values.count);
    },
  }),
}));

const mount = (reduced = false) => {
  vi.useFakeTimers();
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  const media = Object.assign(new EventTarget(), { matches: reduced });
  vi.stubGlobal('matchMedia', () => media);
  const host = document.createElement('div');
  const root = createRoot(host);
  act(() => root.render(<HomeSystemsIllustration />));
  const button = host.querySelector('button');
  if (!button) throw new Error('Missing sync button');
  return {
    content: () => host.querySelector('.system-feed-content')?.getAttribute('data-view'),
    entries: () =>
      Array.from(host.querySelectorAll('.system-event-title'), (title) => title.textContent),
    invitation: () => host.querySelector('.system-invitation'),
    window: () => host.querySelector('[data-layer="interface"]'),
    payloads: () =>
      Array.from(host.querySelectorAll('.system-moving-reply [data-payload]'), (element) =>
        element.getAttribute('data-payload'),
      ),
    joinedCount: () => host.querySelector('.system-joined-reply text')?.textContent,
    readout: () => host.querySelector('.system-http-readout')?.textContent,
    phase: () => host.querySelector('figure')?.dataset.phase,
    currentLayer: () => host.querySelector('[aria-current="step"]')?.textContent,
    focusedPlanes: () => host.querySelectorAll('.system-layer[data-position="active"]').length,
    status: () => host.querySelector('[role="status"]')?.textContent,
    click: () => act(() => button.click()),
    unmount: () => act(() => root.unmount()),
    media,
  };
};

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

it('waits for input, traces one request, shows success and accepts a replay', () => {
  const demo = mount();
  try {
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(demo.invitation()).not.toBeNull();
    const initialWindow = demo.window();
    const allEntries = demo.entries();
    expect(demo.content()).toBe('all');
    expect(demo.status()).toBe('hero.system.views.all 4');
    expect(demo.phase()).toBe('idle');
    expect(demo.currentLayer()).toBeUndefined();
    expect(demo.focusedPlanes()).toBe(0);
    demo.click();
    expect(demo.invitation()).toBeNull();
    const visited = [];
    for (const [phase, { layer, ms, next }] of Object.entries(REQUEST_STEPS)) {
      visited.push(demo.currentLayer());
      if (phase === 'merge') {
        expect(demo.payloads()).toEqual(['items', 'count']);
        expect(demo.joinedCount()).toBe('2');
      }
      if (phase === 'respond') {
        expect(demo.payloads()).toEqual(['combined', 'combined', 'combined']);
      }
      expect(demo.window()).toBe(initialWindow);
      expect(demo.content()).toBe(phase === 'success' ? 'merged' : 'all');
      expect(demo.phase()).toBe(phase);
      expect(demo.readout()).toBe(phase === 'apply' || phase === 'success' ? '200' : 'GET');
      expect(demo.currentLayer()).toBe(`hero.system.${layer}`);
      expect(demo.focusedPlanes()).toBe(1);
      act(() => {
        vi.advanceTimersByTime(ms / 2);
      });
      demo.click();
      act(() => {
        vi.advanceTimersByTime(ms / 2);
      });
      expect(demo.phase()).toBe(next);
    }
    expect(visited).toEqual(
      [
        'interface',
        'logic',
        'services',
        'services',
        'infrastructure',
        'infrastructure',
        'services',
        'services',
        'logic',
        'interface',
      ].map((layer) => 'hero.system.' + layer),
    );
    expect(demo.focusedPlanes()).toBe(0);
    expect(demo.status()).toBe('hero.system.views.merged 2');
    expect(demo.entries()).toEqual(['Merged #46', 'Merged #42']);
    expect(demo.entries()[0]).toBe(allEntries[1]);
    demo.click();
    expect(demo.phase()).toBe('dispatch');
    expect(demo.readout()).toBe('GET');
    expect(demo.content()).toBe('merged');
    for (const [phase, { ms }] of Object.entries(REQUEST_STEPS)) {
      if (phase === 'merge') expect(demo.joinedCount()).toBe('4');
      act(() => {
        vi.advanceTimersByTime(ms);
      });
    }
    expect(demo.invitation()).toBeNull();
    expect(demo.entries()).toEqual(allEntries);
    expect(demo.status()).toBe('hero.system.views.all 4');
  } finally {
    demo.unmount();
  }
  expect(vi.getTimerCount()).toBe(0);
});

it.each([true, false])('respects reduced motion including mid-request changes (%s)', (reduced) => {
  const demo = mount(reduced);
  try {
    demo.click();
    if (!reduced) {
      expect(demo.phase()).toBe('dispatch');
      act(() => {
        demo.media.matches = true;
        demo.media.dispatchEvent(new Event('change'));
      });
    }
    expect(demo.phase()).toBe('success');
    expect(demo.status()).toBe('hero.system.views.merged 2');
    act(() => {
      vi.advanceTimersByTime(REQUEST_STEPS.success.ms);
    });
    expect(demo.phase()).toBe('idle');
    expect(demo.content()).toBe('merged');
    demo.click();
    expect(demo.content()).toBe('all');
  } finally {
    demo.unmount();
  }
});
