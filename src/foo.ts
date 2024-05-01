import { logger } from './util/logger';

export const foo = (target: string | undefined) => {
  logger.debug(`fooing '${target ?? 'nothing'}'!`);

  return `foo ${target ?? 'nothing'}`;
};
