import { renderToStaticMarkup as render } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Picture } from './Picture';

describe('Picture', () => {
  it('renders picture with sources and fallback image', () => {
    const markup = render(
      <Picture
        image={{ alt: 'Preview', src: '/preview.jpg' }}
        sources={[
          { srcSet: '/preview.avif', type: 'image/avif' },
          { srcSet: '/preview.webp', type: 'image/webp' },
        ]}
      />,
    );

    expect(markup).toContain('<picture');
    expect(markup).toContain('type="image/avif"');
    expect(markup).toContain('type="image/webp"');
    expect(markup).toContain('<img');
    expect(markup).toContain('alt="Preview"');
    expect(markup).toContain('src="/preview.jpg"');
  });

  it('defaults image dragging to false', () => {
    const markup = render(<Picture image={{ alt: 'Preview', src: '/preview.jpg' }} />);

    expect(markup).toContain('draggable="false"');
  });

  it('forwards picture and image class names', () => {
    const markup = render(
      <Picture
        className="picture-wrapper"
        image={{ alt: 'Preview', src: '/preview.jpg' }}
        imageClassName="image-style"
      />,
    );

    expect(markup).toContain('class="picture-wrapper"');
    expect(markup).toContain('class="image-style"');
  });
});
