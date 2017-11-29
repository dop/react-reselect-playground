import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import * as actions from './actions';
import {stateReader} from './reader';

import './Clock.css';

class Clock extends PureComponent {

  componentWillMount() {
    setInterval(() => this.props.dispatch(actions.tick()), 100);
  }

  render() {
    console.log('Clock render');
    const {count} = this.props;
    return <div className="Clock">{this.renderTime(count)}</div>;
  }

  renderTime(count) {
    return (count / 10).toFixed(1);
  }
}

function mapStateToProps(state) {
  const reader = stateReader(state).getClockReader();
  return {
    count: reader.getCount()
  };
}

export default connect(mapStateToProps)(Clock);
