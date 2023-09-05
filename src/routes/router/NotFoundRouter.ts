import { Router } from 'express';

import notFoundController from '../../controllers/404/NotFoundController.js';

const { index } = notFoundController;

const notFoundRouter = Router();

notFoundRouter.get('/', index);

export default notFoundRouter;
