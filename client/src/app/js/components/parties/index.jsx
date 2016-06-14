import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMyParties } from '../../actions/parties';
import { Link } from 'react-router';

class PartiesIndex extends Component {
  componentWillMount() {
    if(this.props.token) {
        this.props.getMyParties(this.props.token);
    }
  }

  render() {
    const { parties } = this.props;
    if(this.props.token){
        return (
          <div className="row">
            <div className="twelve columns">
              <h1>Parties</h1>
              <hr />
              {parties&&parties.length ? (
                <table className="u-full-width">
                  <thead>
                    <tr>
                      <th>Header</th>
                      <th>ChildName</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                  {parties.map((party) => {
                    return (
                      <tr key={'party-' + party.id}>
                        <td>
                          <Link to={ 'parties/' + party.id + '/show' }>{party.header}</Link>
                        </td>
                        <td>{party.childName}</td>
                        <td>{party.startDateTime}</td>
                      </tr>
                    )}
                  )}
                  </tbody>
                </table>
              ) : <div>There are currently no parties available to display<hr /></div> }
              <Link to={ 'parties/new' } className="button button-primary">Create New Party</Link>
            </div>
          </div>
      );
    } else {
        return (<div className="row">
                    <div className="twelve columns">
                        <h4>Please log in to see parties</h4>
                    </div>
                </div>
               );
    }
  }
}

function mapStateToProps(state) {
  if(state.users.currentUser){
      return { parties: state.parties.all, token: state.users.currentUser.token};
  } else {
      return { parties: state.parties.all, token: null};
  }
}

export default connect(mapStateToProps, { getMyParties })(PartiesIndex);
