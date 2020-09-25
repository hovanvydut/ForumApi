import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from '../service/media.service';
import { multerOptions } from 'src/config/multer.option';

@Controller('medias')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    // return this.mediaService.uploadFile(file);
  }
}
