import { randomBytes } from 'crypto';

console.log(
  `${randomBytes(32).toString('hex')}:${randomBytes(32).toString('hex')}`,
);
