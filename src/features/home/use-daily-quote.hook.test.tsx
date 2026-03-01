// @vitest-environment jsdom
import { act, useEffect } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { QUOTE_STORAGE_KEY } from './quote.constants';
import type { DailyQuoteStateType, DailyQuoteType } from './quote.type';
import { useDailyQuote } from './use-daily-quote.hook';

const todayKey = '2026-03-01';

const QuoteHarness = ({
  activeLanguage,
  initialValue,
  onState,
}: {
  activeLanguage: string;
  initialValue?: DailyQuoteType | null;
  onState: (state: DailyQuoteStateType) => void;
}) => {
  const state = useDailyQuote({ initialValue });

  useEffect(() => {
    onState(state);
  }, [onState, state]);

  return <div data-language={activeLanguage}>{state.value?.content ?? 'empty'}</div>;
};

describe('useDailyQuote', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  const renderHarness = ({
    activeLanguage,
    initialValue,
    onState,
  }: {
    activeLanguage: string;
    initialValue?: DailyQuoteType | null;
    onState: (state: DailyQuoteStateType) => void;
  }): void => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;

    if (container === null) {
      container = document.createElement('div');
      document.body.appendChild(container);
      root = createRoot(container);
    }

    act(() => {
      root?.render(
        <QuoteHarness
          activeLanguage={activeLanguage}
          initialValue={initialValue}
          onState={onState}
        />,
      );
    });
  };

  afterEach(() => {
    act(() => {
      root?.unmount();
    });

    window.localStorage.clear();
    vi.useRealTimers();
    vi.restoreAllMocks();
    container?.remove();
    root = null;
    container = null;
  });

  it('hydrates from cached quote data and keeps it stable across language-only rerenders', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(`${todayKey}T12:00:00.000Z`));
    window.localStorage.setItem(
      QUOTE_STORAGE_KEY,
      JSON.stringify({
        dateKey: todayKey,
        value: { author: 'Author', content: 'Cached quote', source: 'api' },
      }),
    );
    const onState = vi.fn<(state: DailyQuoteStateType) => void>();

    renderHarness({ activeLanguage: 'en', initialValue: null, onState });
    renderHarness({ activeLanguage: 'fa', initialValue: null, onState });

    const latestState = onState.mock.calls.at(-1)?.[0];

    expect(latestState).toEqual({
      hasError: false,
      isLoading: false,
      value: {
        author: 'Author',
        content: 'Cached quote',
        source: 'api',
      },
    });
    expect(window.localStorage.getItem(QUOTE_STORAGE_KEY)).toContain('Cached quote');
  });

  it('writes server-provided quote data once and does not rewrite it on language-only rerenders', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(`${todayKey}T12:00:00.000Z`));
    const initialValue = {
      author: 'Author',
      content: 'Server quote',
      source: 'api',
    } satisfies DailyQuoteType;
    const onState = vi.fn<(state: DailyQuoteStateType) => void>();

    renderHarness({ activeLanguage: 'en', initialValue, onState });
    const storedAfterFirstRender = window.localStorage.getItem(QUOTE_STORAGE_KEY);

    renderHarness({ activeLanguage: 'fa', initialValue, onState });

    expect(window.localStorage.getItem(QUOTE_STORAGE_KEY)).toBe(storedAfterFirstRender);
    expect(onState.mock.calls.at(-1)?.[0]).toEqual({
      hasError: false,
      isLoading: false,
      value: initialValue,
    });
  });
});
