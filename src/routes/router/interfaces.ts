export enum RoutesScope {
  V1 = '/api/v1',
}

export enum RoutesEntity {
  AUTHORIZATION = 'authorization',
  ACCOUNT = 'account',
  TRANSACTION = 'transaction',
}

export enum AccountRoutes {
  INDEX = '/',
  SHOW = '/:id',
  TRANSACTIONS = '/:id/transactions',
  CREATE = '/',
  UPDATE = '/:id',
  DESTROY = '/:id',
}

export enum AuthorizationRoutes {
  LOGIN = '/login',
  REGISTRATION = '/registration',
  LOGOUT = '/logout',
  REFRESH = '/refresh',
}

export enum TransactionRoutes {
  SHOW = '/:id',
  CREATE = '/',
  UPDATE = '/:id',
  DESTROY = '/:id',
}
