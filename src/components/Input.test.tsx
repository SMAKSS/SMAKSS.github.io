import { renderToStaticMarkup as render } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('is a forwardRef component', () => {
    const forwardRefSymbol = Symbol.for('react.forward_ref');
    const inputType = Input as unknown as { $$typeof?: symbol };

    expect(inputType.$$typeof).toBe(forwardRefSymbol);
  });

  it('applies base input styles', () => {
    const markup = render(<Input aria-label="Answer" />);

    expect(markup).toContain('<input');
    expect(markup).toContain('border-(--card-border)');
    expect(markup).toContain('focus:border-(--accent)');
  });

  it('keeps custom classes alongside base styles', () => {
    const markup = render(<Input aria-label="Answer" className="flex-1" />);

    expect(markup).toContain('flex-1');
    expect(markup).toContain('rounded-lg');
  });

  it('forwards native input props', () => {
    const markup = render(<Input aria-label="Answer" disabled placeholder="Type here" />);

    expect(markup).toContain('disabled=""');
    expect(markup).toContain('placeholder="Type here"');
  });
});
