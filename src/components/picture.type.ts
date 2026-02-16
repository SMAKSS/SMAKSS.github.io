import type { ImgHTMLAttributes } from 'react';

/**
 * Source descriptor for a responsive picture source.
 */
export type PictureSourceType = {
  /**
   * Optional media query for source selection.
   */
  media?: string;
  /**
   * Optional sizes attribute for responsive source selection.
   */
  sizes?: string;
  /**
   * Source set URL for this variant.
   */
  srcSet: string;
  /**
   * Mime type of the source.
   */
  type?: string;
};

/**
 * Props consumed by the shared Picture component.
 */
export type PicturePropsType = {
  /**
   * Optional class name applied on the picture element.
   */
  className?: string;
  /**
   * Main image attributes for the fallback img.
   */
  image: Omit<ImgHTMLAttributes<HTMLImageElement>, 'children'> & { alt: string };
  /**
   * Optional class name applied on the fallback img.
   */
  imageClassName?: string;
  /**
   * Optional list of source descriptors.
   */
  sources?: PictureSourceType[];
};
