export class HelperUtil {
  private static instance;

  private constructor() {}

  public static getInstance(): HelperUtil {
    if (!HelperUtil.instance) {
      HelperUtil.instance = new HelperUtil();
    }

    return HelperUtil.instance;
  }

  /**
   * Convert value's enum to array
   * @param {enumme} enumme
   * @returns {any[]}
   */
  public enumToArray(enumme): any[] {
    return Object.values(enumme);
  }
}
