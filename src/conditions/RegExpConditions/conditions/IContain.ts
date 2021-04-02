import Contain from './Contain';

/**
 * The class for the condition "ignore case contain".
 *
 * NOTE: The "ignore case contain" condition class automatically converts
 *  the checkable value to a string.
 */
export default class IContain extends Contain {
  /**
   * The getter for regexp flags.
   * @protected
   */
  protected get flags(): string | undefined {
    return 'i';
  }
}
