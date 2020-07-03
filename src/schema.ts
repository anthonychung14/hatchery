import { UnionValue } from './types';
import { schema } from './normalizr-alt';

const notification = new schema.Entity('notifications');
const person = new schema.Entity('persons');
const calendar = new schema.Entity('calendars');
const company = new schema.Entity('companies');
const opp = new schema.Entity('opps');

const email = new schema.Entity('email');
const dropdownOption = new schema.Entity('dropdownOptions');
const entityValue = new schema.Entity('entityValues');
const entityValueChange = new schema.Entity('entityValueChanges');
const listEntry = new schema.Entity('listEntries');
const lists = new schema.Entity('lists');
const event = new schema.Entity('events');
const note = new schema.Entity('notes');
const reminder = new schema.Entity('reminders');
const inboxMessageGroup = new schema.Entity('inboxMessageGroups');
const inboxMessage = new schema.Entity('inboxMessages');
const recentSearchInsight = new schema.Entity('recentSearchInsights');
const savedView = new schema.Entity('savedViews');

const entityValueUnion = new schema.Union(
  {
    [UnionValue.Person]: person,
    [UnionValue.Company]: company,
    [UnionValue.DropdownOption]: dropdownOption,
  },
  'UnionValue'
);

entityValue.define({
  value: entityValueUnion,
});

email.define({
  sender: person,
});

entityValueChange.define({
  changer: person,
  value: entityValueUnion,
  listEntry: listEntry,
});

event.define({
  notes: [note],
  persons: [person],
  organizer: person,
});

lists.define({
  owner: person,
});

listEntry.define({
  creator: person,
  entityPerson: person,
  entityCompany: company,
  entityOpp: opp,
  entity: entityValueUnion,
});

note.define({
  creator: person,
  persons: [person],
  companies: [company],
  opps: [opp],
  meeting: event,
  mentions: [person],
  replies: [note],
  parent: note,
  notification: notification,
});

reminder.define({
  creator: person,
  owner: person,
  completer: person,
  personTagged: person,
  companyTagged: company,
  oppTagged: opp,
});

inboxMessageGroup.define({
  messages: [inboxMessage],
  person: person,
  company: company,
  opp: opp,
});

inboxMessage.define({
  note: note,
  reminder: reminder,
  listEntry: listEntry,
  debouncedEntityValueChange: entityValueChange,
  recentSearchInsight: recentSearchInsight,
});

recentSearchInsight.define({
  savedView: savedView,
});

person.define({
  entityValues: [entityValue],
  entityValueChanges: [entityValueChange],
  listEntries: [listEntry],
  primaryCompany: company,
  companies: [company],
  opps: [opp],
  latestNote: note,
});

company.define({
  persons: [person],
  entityValues: [entityValue],
  entityValueChanges: [entityValueChange],
  listEntries: [listEntry],
  latestNote: note,
});

opp.define({
  persons: [person],
  companies: [company],
  entityValues: [entityValue],
  entityValueChanges: [entityValueChange],
  listEntries: [listEntry],
  latestNote: note,
});

notification.define({
  note: note,
  reminder: reminder,
});

calendar.define({});

const Schemas = {
  calendars: calendar,
  companies: company,
  emails: email,
  entityValues: entityValue,
  events: event,
  listEntries: listEntry,
  lists: lists,
  notes: note,
  notifications: notification,
  opps: opp,
  persons: person,
  reminders: reminder,
};

export default Schemas;
