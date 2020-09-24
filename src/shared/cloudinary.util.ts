import * as cloudinary from 'cloudinary';
import { Config } from './../config/configuration';
const path = require('path');
const DatauriParser = require('datauri/parser');
const dataUriParser = new DatauriParser();
const v2 = cloudinary.v2;

export class CloudinaryUtil {
  private static instance;

  private constructor() {
    const myConfig = Config.getInstance();
    v2.config(myConfig.getCloudinaryConfig());
  }

  public static getInstance(): CloudinaryUtil {
    if (!CloudinaryUtil.instance)
      CloudinaryUtil.instance = new CloudinaryUtil();
    return CloudinaryUtil.instance;
  }

  async uploadFile(file) {
    const url = dataUriParser.format(
      '.' + path.extname(file.originalname).toString(),
      file.buffer,
    ).content;
    const result = await v2.uploader.upload(url, { folder: 'forum' });
    return result.url;
  }
}
