import * as bcrypt from 'bcrypt';
import { IBcryptConfig } from 'src/common/interfaces/bcrypt-config.interface';
import { Config } from 'src/config/configuration';

export class BcryptUtil {
  private readonly config;
  private static instance;

  private constructor() {
    this.config = Config.getInstance();
  }

  public static getInstance(): BcryptUtil {
    if (!BcryptUtil.instance) {
      BcryptUtil.instance = new BcryptUtil();
    }

    return BcryptUtil.instance;
  }

  /**
   * generate hash from password or string
   * @param {string} password
   * @returns {string}
   */
  public generateHash(password: string): string {
    const bcryptConfig = this.config.getBcryptConfig();
    return bcrypt.hashSync(password, bcryptConfig.saltRound);
  }

  /**
   * compare plain text with hash
   * @param {string} plainText
   * @param {string} hash
   * @returns {boolean}
   */
  public compare(plainText: string, hash: string): boolean {
    return bcrypt.compareSync(plainText, hash);
  }

  /**
   * validate text with hash
   * @param {string} password
   * @param {string} hash
   * @returns {boolean}
   */
  public validateHash(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash || '');
  }
}
