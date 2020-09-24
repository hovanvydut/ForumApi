import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from '../service/media.service';
import { multerOptions } from 'src/config/multer.option';
import { CloudinaryUtil } from 'src/shared/cloudinary.util';

@Controller('medias')
export class MediaController {
  private cloudinaryUtil: CloudinaryUtil;
  constructor(private readonly mediaService: MediaService) {
    this.cloudinaryUtil = CloudinaryUtil.getInstance();
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    return this.cloudinaryUtil.uploadFile(file);
  }
}
