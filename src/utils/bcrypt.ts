import bcrypt from 'bcrypt';

import environment from '../config/environments/environment.js';

export const hash = async (key: string): Promise<string> => {
  const { saltWorkFactor } = environment;
  const salt = await bcrypt.genSalt(+saltWorkFactor);

  return bcrypt.hashSync(key, salt);
};

export const compareHashes = (key: string, hashed: string): boolean => bcrypt.compareSync(key, hashed);
