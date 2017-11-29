function startLoading() {
  return {type: 'startLoading'};
}

function finishLoading(names) {
  return {type: 'finishLoading', names};
}

export function search(query) {
  return {type: 'search', query};
}

export function togglePhone(show) {
  return {type: 'togglePhone', show};
}

export function toggleEmail(show) {
  return {type: 'toggleEmail', show};
}

export function loadNames() {
  return async (dispatch) => {
    dispatch(startLoading());

    const response = await fetch('/names_1000.json');
    const names = await response.json();

    dispatch(finishLoading(names));
  };
}

export function tick() {
  return {type: 'tick'};
}
