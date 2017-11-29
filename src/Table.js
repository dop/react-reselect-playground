import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import * as actions from './actions';
import {stateReader} from './reader';

import './Table.css';

class Table extends PureComponent {

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.togglePhone = this.togglePhone.bind(this);
    this.toggleEmail = this.toggleEmail.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(actions.loadNames());
  }

  search(event) {
    this.props.dispatch(actions.search(event.target.value));
  }

  togglePhone(event) {
    this.props.dispatch(actions.togglePhone(event.target.checked));
  }

  toggleEmail(event) {
    this.props.dispatch(actions.toggleEmail(event.target.checked));
  }

  render() {
    console.log('Table render');
    const {isLoading, people} = this.props;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="Wrapper">
        <div className="Controls">
          <label>Search: <input onChange={this.search} type="text"/></label>
          <label><input type="checkbox" onChange={this.togglePhone}/>Show Phone</label>
          <label><input type="checkbox" onChange={this.toggleEmail}/>Show Email</label>
        </div>
        <table className="MyTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Member Since</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            { people.map(this.renderRow) }
          </tbody>
        </table>
      </div>
    );
  }

  renderRow(person, i) {
    return (
      <tr key={i}>
        <td>{person.name}</td>
        <td>{person.since}</td>
        <td>{person.phone}</td>
        <td>{person.email}</td>
      </tr>
    );
  }
}

function mapStateToProps(state) {
  const reader = stateReader(state).getTableReader();
  return {
    isLoading: reader.isLoading(),
    people: reader.getFilteredPeople3()
  };
}

export default connect(mapStateToProps)(Table);
