/** See <stanPath>/system/stan.project.md for global requirements. */

import { buildLibrary, buildTypes } from './rollup.config';

const outputPath = '.stan/dist';

export default [buildLibrary(outputPath), buildTypes(outputPath)];
