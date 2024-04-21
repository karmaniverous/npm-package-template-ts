import { logger } from './util/logger';

export const foo = (target: string) => {
  logger.debug(`fooing '${target}'!`);

  return `foo ${target}`;
};
