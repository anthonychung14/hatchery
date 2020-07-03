// for every resource, export
// get resource, get byId
/**
export const findEntityById = (
  state: State,
  leafId: number | EntityId,
  entityType?: number
) => {
  const entities = getEntitiesByTypeKey(state);
  let entity;
  if (typeof leafId === 'number' && entityType !== undefined) {
    entity = _.get(entities, [entityType, leafId], undefined);
  } else if (hasProps(leafId, ['entityId', 'id'])) {
    entity = _.get(entities, [leafId.entityType, leafId.id]);
  }

  return inStore(entity);
};

export const getEntityId = (entity: EntityId) => ({
  entityType: entity.entityType,
  id: entity.id,
});



export const getEntityResource = (state, entityType) => {
  const entities = getEntitiesByTypeKey(state);
  return entities[entityType] || {};
};

// can be made memoized
export const getEntityFromTaggedNote = (state: State, noteId: number) => ({
  note: getNoteById(state, noteId),
  entity: findAssociatedEntity(state, getNoteById(state, noteId)),
});

export const getEntityFromReplyNote = (state: State, noteId: number) => {
  const note = getNoteById(state, noteId);
  const parentNoteId = note.parent;
  const parentNote = getNoteById(state, parentNoteId);

  return {
    note,
    entity: findAssociatedEntity(state, parentNote),
  };
};

export const findAssociatedEntity = (state: State, note: Note) => {
  const foundResource = Object.values(ENTITY_RESOURCE).reduce(
    (acc, resourceString) => {
      const assocs = note[resourceString];
      if (hasVal(assocs)) {
        acc = resourceString;
      }

      return acc;
    },
    'creator'
  );

  // might be because replies don't necessarily have a person associated
  const entityType =
    getEntityTypeFromResource(foundResource) || EntityType.Person;
  const entityId = {
    id: _.first(note[foundResource]) || note[foundResource],
    entityType: Number(entityType),
  };

  return findEntityById(state, entityId);
};

export const getResourceNameFromEntity = entity => {
  return _.get(ENTITY_RESOURCE, entity.entityType);
};

export const getEntityTypeFromResource = resource => {
  const found = Object.keys(ENTITY_RESOURCE).find(key => {
    if (ENTITY_RESOURCE[key] === resource) {
      return key;
    }
  });

  return found ? Number(found) : undefined;
};

export const findEntityListEntries = (state: State, entityId: EntityId) => {
  const entity = findEntityById(state, entityId);
  return entity.listEntries || [];
};

export const getIsEntityOneOfInternals = (state: State, entityId: EntityId) => {
  const entity = findEntityById(state, entityId);
  return (
    entityId &&
    entityId.entityType === EntityType.Person &&
    entity &&
    entity.type === PersonType.Internal
  );
};
 */
