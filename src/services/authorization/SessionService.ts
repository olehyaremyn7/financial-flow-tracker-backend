import _ from 'lodash';
import { ObjectId } from 'mongoose';

import { Nullable } from '../../interfaces/common.js';
import { SessionDocument } from '../../models/session/interfaces.js';
import Session from '../../models/session/Session.js';
import { ISessionService, Token } from './interfaces.js';

export class SessionService implements ISessionService {
  public async create(user: ObjectId, refreshToken: Token): Promise<SessionDocument> {
    const session = await this.getByUser(user);

    if (session) {
      session.refreshToken = refreshToken;

      return session.save();
    }

    return Session.create({ user, refreshToken });
  }

  public async update(user: ObjectId, refreshToken: Token): Promise<Nullable<SessionDocument>> {
    return Session.findOneAndUpdate({ user }, { $set: { user, refreshToken } }, { new: true });
  }

  public async getByToken(refreshToken: Token): Promise<Nullable<SessionDocument>> {
    return Session.findOne({ refreshToken });
  }

  public async getByUser(user: ObjectId): Promise<Nullable<SessionDocument>> {
    return Session.findOne({ user });
  }

  public async verifyToken(refreshToken: Token): Promise<boolean> {
    const session = await this.getByToken(refreshToken);

    return !_.isEmpty(session);
  }

  public async delete(refreshToken: Token): Promise<void> {
    await Session.deleteOne({ refreshToken });
  }
}
