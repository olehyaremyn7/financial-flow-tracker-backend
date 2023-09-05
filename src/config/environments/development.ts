import { Mode } from '../../interfaces/application.js';
import { DevelopmentEnv } from './interface.js';

const environment: DevelopmentEnv = {
  mode: Mode.DEVELOPMENT,
};

export default Object.freeze(environment);
