import * as crypto from 'crypto';

export default function md5(str: string) {
  return crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex');
}
