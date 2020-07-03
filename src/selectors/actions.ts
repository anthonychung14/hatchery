import _ from 'lodash';

import { Resources } from '../index';
import { Action } from '../types';

const WRITE_TYPES = ['create', 'update', 'delete', 'add'];

export const getResourceTypeFromWrite = ({
  type,
  meta = {},
}: Action): Resources => {
  const resourceType = type
    .toLowerCase()
    .split('_')
    .find((i: string) => _.get(Resources, i, meta.resource));

  return resourceType && _.get(Resources, resourceType, null);
};

export const getWriteTypeFromAction = ({ type }: Action): string | undefined =>
  WRITE_TYPES.find(w => type.toLowerCase().includes(w));

export const getAnalyticsTerms = (action: Action) => {
  const resourceType = getResourceTypeFromWrite(action);
  const writeType = getWriteTypeFromAction(action);

  // HACK: yeah some actions are described as ADD -_-
  return {
    resourceType,
    writeType: writeType === 'add' ? 'create' : writeType,
  };
};

const isSuccessType = ({ type }: Action) =>
  type.toLowerCase().includes('success');

const isBatchedAction = ({ type }: Action) =>
  type.toLowerCase().includes('batching_reducer.batch');

const hasBatchedWriteAction = (action: Action) =>
  isBatchedAction(action) &&
  action.payload.some((a: Action) => writeResourceSuccess(a));

const makesWriteRequest = ({ type }: Action) =>
  WRITE_TYPES.some(w => type.toLowerCase().includes(w));

export const wroteResourceType = (action: Action) =>
  makesWriteRequest(action) && isSuccessType(action);

export const writeResourceSuccess = (action: Action) =>
  wroteResourceType(action) || hasBatchedWriteAction(action);

export const getEntitiesFromPayload = (a: Action) =>
  _.get(a, 'entities', _.get(a, 'payload.entities', {}));
