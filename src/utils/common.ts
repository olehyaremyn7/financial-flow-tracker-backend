import _ from 'lodash';
import ms from 'ms';
import sanitizeHtml from 'sanitize-html';

import messages from '../constants/messages.js';

export const splitStrByCommas = (str: string): string[] => str.split(',').map((url: string): string => url.trim());

export const getMessage = (path: string): string => _.get(messages, path, '');

export const convertToMs = <T>(time: T): number => +ms(time as number);

export const sanitizeData = <T>(data: T): T => {
  const primaryData = JSON.stringify(data);
  const sanitizedData = sanitizeHtml(primaryData);

  return JSON.parse(sanitizedData);
};
