// REDUX
export type State = any;

export type Action = {
  type: string;
  payload: any;
  meta?: any;
  // TODO: type these and/or put them under payloads
  entities?: any;
  items?: any;
};

export type GenObj = { [char: string]: any };
export type Entity = any;
export type Note = any;

// Entities
export enum UnionValue {
  Person = 'person',
  Company = 'company',
  DropdownOption = 'dropdownOption',
}

export enum EntityType {
  Person = 0,
  Company = 1,
  Opp = 8,
}

export enum PersonType {
  External = 0,
  Internal = 1,
}

export type EntityId = {
  id: number;
  entityType: EntityType;
};
