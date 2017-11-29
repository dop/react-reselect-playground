const initialState = {
  isLoading: true,
  names: [],
  query: ''
};

export default function (state = initialState, action) {
  if (action.type in reducers) {
    return reducers[action.type](state, action);
  }
  return state;
}

const reducers = {
  search(state, {query}) {
    return {
      ...state,
      query
    };
  },
  startLoading(state) {
    return {
      ...state,
      isLoading: true
    };
  },
  finishLoading(state, {names}) {
    return {
      ...state,
      isLoading: false,
      names
    };
  },
  togglePhone(state, {show}) {
    return {
      ...state,
      showPhone: show
    };
  },
  toggleEmail(state, {show}) {
    return {
      ...state,
      showEmail: show
    };
  }
};
