import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  /**
   * Convert value's enum to array
   * @param {enumme} enumme
   * @returns {any[]}
   */
  public enumToArray(enumme): any[] {
    return Object.values(enumme);
  }
}
