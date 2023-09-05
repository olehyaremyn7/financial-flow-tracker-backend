import { NextFunction, Request, Response } from 'express';

import { IApplicationController } from './interfaces.js';

export abstract class ApplicationController implements IApplicationController {
  public constructor() {
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  public async index(_req: Request, _res: Response, _next: NextFunction): Promise<void> {}

  public async show(_req: Request, _res: Response, _next: NextFunction): Promise<void> {}

  public async create(_req: Request, _res: Response, _next: NextFunction): Promise<void> {}

  public async update(_req: Request, _res: Response, _next: NextFunction): Promise<void> {}

  public async destroy(_req: Request, _res: Response, _next: NextFunction): Promise<void> {}
}
