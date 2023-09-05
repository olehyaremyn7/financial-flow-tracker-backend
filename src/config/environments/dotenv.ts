import dotenv from 'dotenv';
import _ from 'lodash';

import { getNodeEnv } from '../../utils/environment.js';

export const applyDotenvConfig = (): void => {
  const NODE_ENV = getNodeEnv();

  dotenv.config();

  if (NODE_ENV) {
    const { parsed } = dotenv.config({ path: `.env.${NODE_ENV}` });

    process.env = _.merge(process.env, parsed);
  }
};
