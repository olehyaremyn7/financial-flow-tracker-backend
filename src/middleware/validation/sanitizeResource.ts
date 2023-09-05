import _ from 'lodash';

import { Middleware } from '../../interfaces/common.js';
import { ErrorService } from '../../services/common/ErrorService.js';
import { sanitizeData } from '../../utils/common.js';

export const sanitizeResource: Middleware = (req, _res, next) => {
  try {
    const { body, query, params, cookies } = req;

    if (_.isObject(body)) {
      req.body = sanitizeData(body);
    }

    if (_.isObject(query)) {
      req.query = sanitizeData(query);
    }

    if (_.isObject(params)) {
      req.params = sanitizeData(params);
    }

    if (_.isObject(cookies)) {
      req.cookies = sanitizeData(cookies);
    }

    next();
  } catch (error) {
    next(ErrorService.handleValidationError(error));
  }
};
