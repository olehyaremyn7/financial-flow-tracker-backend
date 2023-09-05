import { Express, Router } from 'express';

import { ApplicationRoutes } from './ApplicationRoutes.js';

export interface IApplicationRoutes {
  initialize(app: Express): ApplicationRoutes;
  add<S, E>(scope: S, entity: E, router: Router): void;
  apply(): void;
  notFound(router: Router): void;
}

export interface Route {
  path: string;
  router: Router;
}

export type Routes = Route[];
