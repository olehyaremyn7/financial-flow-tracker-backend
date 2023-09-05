import { Express, Router } from 'express';
import _ from 'lodash';

import { Nullable } from '../../interfaces/common.js';
import { getMessage } from '../../utils/common.js';
import { logMessage } from '../../utils/logger.js';
import { IApplicationRoutes, Route, Routes } from './interfaces.js';

export class ApplicationRoutes implements IApplicationRoutes {
  private app: Nullable<Express> = null;

  private routes: Routes = [];

  public initialize(app: Express): this {
    this.app = app;

    return this;
  }

  public apply(): void {
    if (!this.isAppExist()) {
      logMessage(getMessage('server.errors.express'), 'error');

      return;
    }

    const { routes } = this;

    for (const { path, router } of routes) {
      (this.app as Express).use(path, router);
    }
  }

  public add<S, E>(scope: S, entity: E, router: Router): void {
    this.routes.push(this.createRoute(scope, entity, router));
  }

  public notFound(router: Router): void {
    this.routes.push({
      path: '*',
      router,
    });
  }

  private createRoute<S, E>(scope: S, entity: E, router: Router): Route {
    return {
      path: `${scope}/${entity}`,
      router,
    };
  }

  private isAppExist(): boolean {
    return !_.isNil(this.app);
  }
}
