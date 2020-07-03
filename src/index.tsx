import * as React from 'react';

import { EntityType, GenObj } from './types';

export enum Resources {
  companies = 'companies',
  dropdownOptions = 'dropdownOptions',
  events = 'events',
  emails = 'emails',
  listEntries = 'listEntries',
  entityValues = 'entityValues',
  lists = 'lists',
  notes = 'notes',
  notifications = 'notifications',
  opps = 'opps',
  persons = 'persons',
  reminders = 'reminders',
}

export enum States {
  search = 'search',
  session = 'session',
}

export const EntityTypeResource = {
  [EntityType.Person]: 'persons',
  [EntityType.Company]: 'companies',
  [EntityType.Opp]: 'opps',
};

export const usePylon = (
  resourceType: Resources,
  config: GenObj,
  options: GenObj
) => {};

export const useProbe = (
  getter: Resources | States,
  options: GenObj,
  fallbackValue?: GenObj
) => {};
