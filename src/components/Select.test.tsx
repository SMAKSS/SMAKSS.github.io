import { renderToStaticMarkup as render } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Select } from './Select';

describe('Select', () => {
  it('renders label-select association with options', () => {
    const markup = render(
      <Select
        id="difficulty"
        label="Difficulty"
        options={[
          { label: 'Easy', value: 'easy' },
          { label: 'Hard', value: 'hard' },
        ]}
      />,
    );

    expect(markup).toContain('<label');
    expect(markup).toContain('for="difficulty"');
    expect(markup).toContain('<select');
    expect(markup).toContain('id="difficulty"');
    expect(markup).toContain('<option value="easy">Easy</option>');
    expect(markup).toContain('<option value="hard">Hard</option>');
  });

  it('forwards select props and custom class names', () => {
    const markup = render(
      <Select
        disabled
        id="lang"
        label="Language"
        labelClassName="label-extra"
        options={[{ label: 'English', value: 'en' }]}
        selectClassName="select-extra"
        wrapperClassName="wrapper-extra"
      />,
    );

    expect(markup).toContain('disabled=""');
    expect(markup).toContain('wrapper-extra');
    expect(markup).toContain('label-extra');
    expect(markup).toContain('select-extra');
  });
});
