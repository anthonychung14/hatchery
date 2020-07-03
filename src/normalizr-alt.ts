import {
  denormalize,
  normalize,
  NormalizedSchema,
  Schema,
  schema as schemaExport,
} from 'normalizr';

type NormalizedSchemaAlt<E, R> = { db: E; result: R };

/**
 * This is a wrapper around the original normalizr normalize() method. It simply replaces
 * the entities key in the normalized output with the db key since entities has a
 * different meaning for us (namely, person, opp or company).
 * Always use this instead of the normalize() method from normalizr.
 */
function normalizeAlt<
  T = any,
  E = { [key: string]: { [key: string]: T } },
  R = any
>(data: any, schema: Schema<T>): NormalizedSchemaAlt<E, R> {
  let normalizedData: NormalizedSchema<E, R> = normalize(data, schema);

  let normalizedDataAlt: NormalizedSchemaAlt<E, R> = {
    db: normalizedData.entities,
    result: normalizedData.result,
  };

  return normalizedDataAlt;
}

export { normalizeAlt as normalize, denormalize, schemaExport as schema };
