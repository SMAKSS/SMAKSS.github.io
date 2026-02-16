/**
 * Content section payload rendered in the about page narrative.
 */
export type AboutNarrativeSectionType = {
  /**
   * Section body paragraphs.
   */
  paragraphs: string[];
  /**
   * Section heading.
   */
  title: string;
};

/**
 * Fully normalized about page translation payload.
 */
export type AboutContentType = {
  /**
   * Closing paragraph at the end of the article.
   */
  closing: string;
  /**
   * Hero headline below the name.
   */
  headline: string;
  /**
   * Introductory paragraphs.
   */
  intro: string[];
  /**
   * Display name headline.
   */
  name: string;
  /**
   * Narrative sections rendered below intro.
   */
  sections: AboutNarrativeSectionType[];
};

/**
 * Input payload for rendering rich paragraph tokens as links.
 */
export type RenderParagraphContentInputType = {
  /**
   * Localized label for email link placeholders.
   */
  emailLinkLabel: string;
  /**
   * Localized label for Ko-fi link placeholders.
   */
  kofiLinkLabel: string;
  /**
   * Raw paragraph text with optional placeholders.
   */
  value: string;
};
