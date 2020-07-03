import _ from 'lodash';
import { createSelector } from 'reselect';
import { listOf, inStore } from 'moonads';

import { Resources } from '../index';
import { State, EntityType } from '../types';

export const isEntityModel = (object: any) =>
  _.has(object, 'id') && _.has(object, 'entityType');

export const getResource = (resources: any, id: number) =>
  _.get(resources, id, {});

export const getClientDb = (state: any) =>
  state.db ? state.db : console.error('You must have a db object in state');

export const makeGetResource = (resource: string) =>
  createSelector([getClientDb], db => inStore(db[resource]));

export const makeFindById = (resource: string) => {
  const resourceGetter = makeGetResource(resource);
  return (id: number) =>
    createSelector([resourceGetter], r => getResource(r, id));
};

// export const makeFindSingleResource = (id: number, resource: Resources) => {
//   const getResourcesSelector = makeGetResource(resource);
//   return createSelector([getResourcesSelector], resources =>
//     getResource(resources, id)
//   );
// };

export const makeFindFromIds = (resource: string) => {
  const resourceGetter = makeGetResource(resource);
  return (ids: number[]) =>
    createSelector([resourceGetter], r =>
      listOf(ids).map(id => getResource(r, id))
    );
};

export const r = _.reduce(
  Resources,
  (acc: { [char: string]: Function }, r) => {
    const resource = _.startCase(r);

    const getSelectorKey = `get${resource}Resource`;
    const getSelector = makeGetResource(r);

    const findSelectorKey = `find${_.startCase(r)}ById`;
    const findSelector = makeFindById(r);

    const findManyKey = `find${_.startCase(r)}FromIds`;
    const findManySelector = makeFindFromIds(r);

    acc[getSelectorKey] = getSelector;
    acc[findSelectorKey] = findSelector;
    acc[findManyKey] = findManySelector;

    return acc;
  },
  {}
);

// export const findResourcesByNames = (state: State, resources: string[]) =>
//   resources.reduce(
//     (acc, curr) => ({
//       ...acc,
//       [curr]: getResourcesById(state, curr),
//     }),
//     {}
//   );

// export const findResourcesWithIds = (
//   state: State,
//   resourceKey: string,
//   ids: number[] = []
// ) => {
//   return ids.map(id => findResourceById(state, resourceKey, id));
// };

// export const findFirstThrough = (
//   state: State,
//   resource: any,
//   throughKey: Resources
// ) => {
//   const through = resource[throughKey];
//   return through.length
//     ? findResourceById(state, throughKey, _.first(through))
//     : {};
// };

export const getEntitiesByTypeKey = (state: State) => {
  return {
    [EntityType.Company]: state.db.companies,
    [EntityType.Opp]: state.db.opps,
    [EntityType.Person]: state.db.persons,
  };
};

export const makeGetPerson = (personId: number) =>
  createSelector([getEntitiesByTypeKey], entities =>
    inStore(entities[EntityType.Person][personId])
  );

// export const getNoteMentions = (note: Note) => {
//   return _.get(note, 'mentions', []);
// };

export const getUncompleteReminderOnSave = (s: State) =>
  s.workspace.drawerValues.uncompleteReminderOnSave;

// export const getResourceFromUnionType = (state, { schema, id }) => {
//   const resourceKey = simplePluralize(schema, 2);
//   return findResourceById(state, Resources[resourceKey], id);
// };
