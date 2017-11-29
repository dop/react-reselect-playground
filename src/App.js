import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import logo from './logo.svg';
import './App.css';
import Table from './Table';
import Clock from './Clock';

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React &amp; Reselect</h1>
        </header>

        <Provider store={store}>
          <Clock/>
        </Provider>

        <Provider store={store}>
          <Table/>
        </Provider>
      </div>
    );
  }
}

export default App;
