import { Mode } from '../../interfaces/application.js';
import { ProductionEnv } from './interface.js';

const environment: ProductionEnv = {
  mode: Mode.PRODUCTION,
};

export default Object.freeze(environment);
