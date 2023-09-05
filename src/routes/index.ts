import { ApplicationRoutes } from './ApplicationRoutes/ApplicationRoutes.js';
import accountRouter from './router/AccountRouter.js';
import authorizationRouter from './router/AuthorizationRouter.js';
import { RoutesEntity, RoutesScope } from './router/interfaces.js';
import NotFoundRouter from './router/NotFoundRouter.js';
import transactionRouter from './router/TransactionRouter.js';

const routes = new ApplicationRoutes();

routes.add(RoutesScope.V1, RoutesEntity.AUTHORIZATION, authorizationRouter);
routes.add(RoutesScope.V1, RoutesEntity.ACCOUNT, accountRouter);
routes.add(RoutesScope.V1, RoutesEntity.TRANSACTION, transactionRouter);
routes.notFound(NotFoundRouter);

export default routes;
