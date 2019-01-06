/**
 * Styling options for the [[Group]] component
 */
export interface GroupComponentStyle {
  /**
   * In which way should child components of this group be organized?
   *
   * Default: 'horizontal'
   */
  direction: 'horizontal' | 'vertical';
  /**
   * If true, when the group runs out of vertical or horizontal space, child
   * components will be wrapped, and start to be arranged on additional columns
   * or rows.
   */
  wrap?: boolean;
  /**
   * If true, this group will have the same colour background as its parent, and
   * no border. This allows you to use groups to arrange components without
   * having to have visible boundaries between them.
   */
  noBorder?: boolean;
}

/**
 * Styling options for the [[Label]] component
 */
export interface LabelComponentStyle {
  /**
   * If true, make the text of this label bold
   */
  bold?: boolean;
}
