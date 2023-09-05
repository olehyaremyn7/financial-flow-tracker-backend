import { Document, ObjectId } from 'mongoose';

import { Token } from '../../services/authorization/interfaces.js';

export interface SessionDocument extends Document {
  user: ObjectId;
  refreshToken: Token;
}
