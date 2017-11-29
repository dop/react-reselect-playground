import {createSelector, defaultMemoize} from 'reselect';

export function clockReader(state) {
  return {
    getCount() {
      return state.count;
    }
  };
}

export function tableReader(state) {
  return new class {
    getNames() {
      return state.names;
    }

    isPhoneVisible() {
      return state.showPhone;
    }

    isEmailVisible() {
      return state.showEmail;
    }

    getQuery() {
      return state.query;
    }

    isLoading() {
      return state.isLoading;
    }

    getPeople() {
      return state.names.map(({name, contact, memberSince}) => {
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

    getPeople2() {
      return memoPeople(this.isPhoneVisible(), this.isEmailVisible(), this.getNames());
    }

    getFilteredPeople2() {
      return memoFilteredPeople(this.getQuery(), this.getPeople2());
    }

    getPeople3() {
      return peopleSelector(state);
    }

    getFilteredPeople3() {
      return filteredPeopleSelector(state);
    }
  };
}

const peopleSelector = createSelector(
  (state) => state.showPhone,
  (state) => state.showEmail,
  (state) => state.names,
  (isPhoneVisible, isEmailVisible, names) => {
    return names.map(({name, contact, memberSince}) => {
      const {first, last} = name;
      const {phone, email} = contact;
      return {
        name: first + ' ' + last,
        since: memberSince,
        phone: isPhoneVisible ? phone[0] : '',
        email: isEmailVisible ? email[0] : ''
      };
    });
  }
);

const filteredPeopleSelector = createSelector(
  (state) => state.query,
  (state) => peopleSelector(state),
  (query, people) => {
    if (query) {
      return people.filter((person) => person.name.toLowerCase().includes(query.toLowerCase()));
    }
    return people;
  }
);

const memoPeople = defaultMemoize(function (isPhoneVisible, isEmailVisible, names) {
  return names.map(({name, contact, memberSince}) => {
    const {first, last} = name;
    const {phone, email} = contact;
    return {
      name: first + ' ' + last,
      since: memberSince,
      phone: isPhoneVisible ? phone[0] : '',
      email: isEmailVisible ? email[0] : ''
    };
  });
});

const memoFilteredPeople = defaultMemoize(function (query, people) {
  if (query) {
    return people.filter((person) => person.name.toLowerCase().includes(query.toLowerCase()));
  }
  return people;
});

export function stateReader(state) {
  return {
    getTableReader: () => tableReader(state.table),
    getClockReader: () => clockReader(state.clock)
  };
};
