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

  public intersection(array1: any[], array2: any[]) {
    let set1 = new Set(array1);
    let set2 = new Set(array2);
    let result = new Set();
    set2.forEach(item => set1.has(item) && result.add(item));
    return Array.from(result);
  }
}
