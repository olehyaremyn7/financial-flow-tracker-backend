import _ from 'lodash';

import { UserDocument } from '../models/user/interfaces.js';
import { LoggedUser, RegisteredUser } from '../services/authorization/interfaces.js';

export const createRegisteredUserDto = (user: UserDocument): RegisteredUser =>
  _.pick(user, ['_id', 'email', 'username']);

export const createLoggedUserDto = (user: UserDocument): LoggedUser => _.pick(user, ['_id', 'username']);
