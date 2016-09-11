import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMyParties } from '../../actions/parties';
import { Link } from 'react-router';
import { Translate} from 'react-redux-i18n';

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
              <h1><Translate value="myPartiesPage.header" /></h1>
              <hr />
              {parties&&parties.length ? (
                <table className="u-full-width">
                  <thead>
                    <tr>
                      <th><Translate value="myPartiesPage.tableHeader" /></th>
                      <th><Translate value="myPartiesPage.birthdayChild" /></th>
                      <th><Translate value="myPartiesPage.date" /></th>
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
              ) : <div></div> }
              <Link to={ 'parties/new' } className="button button-primary"><Translate value="myPartiesPage.create" /></Link>
            </div>
          </div>
      );
    } else {
        return (<div className="row">
                    <div className="twelve columns">
                        <h4><br/><br/><Translate value="myPartiesPage.register" /></h4>
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
