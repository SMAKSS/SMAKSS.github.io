/**
 * Inputs used to dispatch a cancelable wheel event to the playground tab list.
 */
export type DispatchPlaygroundTabsWheelInputType = {
  /**
   * Tab list receiving the wheel event.
   */
  tabList: HTMLElement;
  /**
   * Wheel values used to construct the event.
   */
  eventInit: WheelEventInit;
};
