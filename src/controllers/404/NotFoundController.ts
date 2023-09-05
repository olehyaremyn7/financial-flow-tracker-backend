import 'reflect-metadata';

import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { autoInjectable, container } from 'tsyringe';

import { ApplicationController } from '../ApplicationController/ApplicationController.js';

@autoInjectable()
class NotFoundController extends ApplicationController {
  public override async index(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(404).sendFile('src/views/404/index.html', { root: path.resolve(path.dirname('')) });
    } catch (error) {
      next(error);
    }
  }
}

export default container.resolve(NotFoundController);
