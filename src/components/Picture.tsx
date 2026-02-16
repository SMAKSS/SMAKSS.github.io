import type { PicturePropsType, PictureSourceType } from './picture.type';

/**
 * Renders a responsive image with optional format sources.
 */
export const Picture = ({ className, image, imageClassName, sources = [] }: PicturePropsType) => {
  const { alt, draggable, ...restImageAttributes } = image;
  const imageAttributes = {
    draggable: draggable ?? false,
    ...restImageAttributes,
    className: imageClassName,
  };

  return (
    <picture className={className}>
      {sources.map((source: PictureSourceType) => (
        <source
          key={`${source.type ?? 'any'}-${source.srcSet}`}
          media={source.media}
          sizes={source.sizes}
          srcSet={source.srcSet}
          type={source.type}
        />
      ))}
      <img alt={alt} {...imageAttributes} />
    </picture>
  );
};
