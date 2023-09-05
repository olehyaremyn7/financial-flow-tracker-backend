import { model } from 'mongoose';

import { sessionSchema } from '../../db/schema/session.js';
import { Collections } from '../common/interfaces.js';
import { SessionDocument } from './interfaces.js';

export default model<SessionDocument>(Collections.SESSION, sessionSchema);
