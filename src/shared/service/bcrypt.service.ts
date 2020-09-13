import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IBcryptConfig } from 'src/common/interfaces/bcrypt-config.interface';

@Injectable()
export class BcryptService {
  constructor(private readonly configService: ConfigService) {}
  /**
   * generate hash from password or string
   * @param {string} password
   * @returns {string}
   */
  public generateHash(password: string): string {
    const bcryptConfig = this.configService.get<IBcryptConfig>('bcrypt');
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
