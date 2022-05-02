import type { RouterContext } from 'koa-router';
import FileService from '../service/FileService';

class FileController {
  private service: FileService = new FileService();

  upload = async (ctx: RouterContext) => {
    const files = ctx.request.files;
    this.service.upload(ctx, files);
  };
}

export default new FileController();
