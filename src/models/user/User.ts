import { model } from 'mongoose';

import { userSchema } from '../../db/schema/user.js';
import { Collections } from '../common/interfaces.js';
import { UserDocument } from './interfaces.js';

export default model<UserDocument>(Collections.USER, userSchema);
