import {createSelector, defaultMemoize} from 'reselect';

class ClockReader {
  constructor(state) {
    this.state = state;
  }

  getCount() {
    return this.state.count;
  }
}

class TableReader {
  constructor(state) {
    this.state = state;
  }

  getNames() {
    return this.state.names;
  }

  isPhoneVisible() {
    return this.state.showPhone;
  }

  isEmailVisible() {
    return this.state.showEmail;
  }

  getQuery() {
    return this.state.query;
  }

  isLoading() {
    return this.state.isLoading;
  }

  getPeople() {
    return this.state.names.map(({name, contact, memberSince}) => {
      const {first, last} = name;
      const {phone, email} = contact;
      return {
        name: first + ' ' + last,
        since: memberSince,
        phone: this.isPhoneVisible() ? phone[0] : '',
        email: this.isEmailVisible() ? email[0] : ''
      };
    });
  }

  getFilteredPeople() {
    const query = this.getQuery();
    const people = this.getPeople();
    if (query) {
      return people.filter((person) => person.name.toLowerCase().includes(query.toLowerCase()));
    }
    return people;
  }
}

export function stateReader(state) {
  return {
    getTableReader: () => new TableReader(state.table),
    getClockReader: () => new ClockReader(state.clock)
  };
};
