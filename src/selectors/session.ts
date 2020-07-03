import _ from 'lodash';
import { createSelector } from 'reselect';

import { State } from '../types';

export const getLoggedInUserId = (state: State) =>
  _.get(state, 'user.data.user.id', undefined);

export const getLoggedInUserEmail = (state: State) =>
  _.get(state, 'user.data.user.primaryEmail', undefined);

export const getIsAffinity = createSelector(
  [getLoggedInUserEmail],
  email => email && email.endsWith('affinity.co')
);
