import { useEffect, useReducer } from 'react';
import { REQUEST_STEPS } from './home-system.constants';
import type { FeedEvent, FeedState } from './home-system.type';

const advance = (state: FeedState, event: FeedEvent): FeedState => {
  if (event.type === 'start' && state.phase !== 'idle') return state;
  if (event.type === 'advance' && state.phase !== event.from) return state;
  if (event.type === 'finish' && (state.phase === 'idle' || state.phase === 'success'))
    return state;
  const phase =
    event.type === 'advance'
      ? REQUEST_STEPS[event.from].next
      : event.type === 'start' && !event.reduced
        ? 'dispatch'
        : 'success';
  return {
    phase,
    hasStarted: true,
    mergedOnly: phase === 'success' ? !state.mergedOnly : state.mergedOnly,
  };
};

/**
 * Plays one request at a time. Only a delivered response replaces the
 * selected view, including when motion is reduced during a request.
 */
export const useActivityFilter = () => {
  const [state, dispatch] = useReducer(advance, {
    phase: 'idle',
    mergedOnly: false,
    hasStarted: false,
  });
  const { phase } = state;
  useEffect(() => {
    if (phase === 'idle') return;
    const timer = window.setTimeout(
      () => dispatch({ type: 'advance', from: phase }),
      REQUEST_STEPS[phase].ms,
    );
    return () => window.clearTimeout(timer);
  }, [phase]);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finish = () => {
      if (media.matches) dispatch({ type: 'finish' });
    };
    media.addEventListener('change', finish);
    return () => media.removeEventListener('change', finish);
  }, []);
  return {
    ...state,
    toggleFilter: () =>
      dispatch({
        type: 'start',
        reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      }),
  };
};
