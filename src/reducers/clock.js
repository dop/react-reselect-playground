const initialState = {
  count: 0
};

export default function (state = initialState, action) {
  if (action.type in reducers) {
    return reducers[action.type](state, action);
  }
  return state;
}

const reducers = {
  tick(state) {
    return {
      ...state,
      count: state.count + 1
    };
  }
};
