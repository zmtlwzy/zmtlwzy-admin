import type { RouterContext } from 'koa-router';
import { Result } from '../utils';
import path from 'path';
import fs from 'fs-extra';

type Files = RouterContext['request']['files'];
type File = Files['file'];
type GetFile<F> = F extends (infer T)[] ? T : never;

const uploadUrl = 'http://localhost:3300/static/upload';
const filePath = path.join(__dirname, '../static/upload/');

fs.ensureDir(filePath);
export default class UserService {
  upload(ctx: RouterContext, files: Files) {
    function fileFunc(file: GetFile<File>) {
      const fileReader = fs.createReadStream(file.filepath);
      const fileResource = filePath + `${file.originalFilename}`;

      const writeStream = fs.createWriteStream(fileResource);
      fileReader.pipe(writeStream);
    }

    function handleUrl(url: string) {
      console.log(`upload Success: \x1B[36m${url}\x1B[0m`);
      ctx.body = Result.success(url);
    }

    function returnFunc(files: Files) {
      if (files) {
        fs.ensureDir(filePath);
        let url = '';
        Object.values(files).forEach((_files) => {
          if (Array.isArray(_files)) {
            for (let i = 0; i < _files.length; i++) {
              fileFunc(_files[i]);
              url += uploadUrl + `/${_files[i].originalFilename},`;
            }
            url = url.replace(/,$/gi, '');
            handleUrl(url);
          } else {
            fileFunc(_files);
            url += uploadUrl + `/${_files.originalFilename},\n`;
          }
        });
        url = url.replace(/(,\n?)$/gi, '');
        handleUrl(url);
      }
    }

    returnFunc(files);
  }
}
