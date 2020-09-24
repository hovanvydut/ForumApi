const slugify = require('slugify');

export class SlugifyUtil {
  private static instance;

  private constructor() {}

  public static getInstance(): SlugifyUtil {
    if (!this.instance) this.instance = new SlugifyUtil();
    return this.instance;
  }

  public getSlug(str: string) {
    return slugify(str);
  }
}
