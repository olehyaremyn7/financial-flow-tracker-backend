import { Mode } from '../../interfaces/application.js';
import { getEnvVars, getNodeEnv, mergeEnv } from '../../utils/environment.js';
import development from './development.js';
import { applyDotenvConfig } from './dotenv.js';
import { AppEnv } from './interface.js';
import production from './production.js';

applyDotenvConfig();

const NODE_ENV = getNodeEnv();
let environment: AppEnv = getEnvVars();

if (NODE_ENV === Mode.PRODUCTION) {
  environment = mergeEnv(environment, production);
}

if (NODE_ENV === Mode.DEVELOPMENT) {
  environment = mergeEnv(environment, development);
}

export default Object.freeze(environment);
