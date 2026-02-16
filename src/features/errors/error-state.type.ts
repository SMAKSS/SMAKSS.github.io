/**
 * Props for rendering a shared error-state surface.
 */
export type ErrorStatePropsType = {
  /**
   * Primary heading shown in the error state.
   */
  title: string;
  /**
   * Supporting description shown under the title.
   */
  description: string;
  /**
   * Optional HTTP status code shown as metadata.
   */
  statusCode?: number;
  /**
   * Action label used for the recovery link.
   */
  actionLabel: string;
  /**
   * Route target used for the recovery link.
   */
  actionTo: string;
};
