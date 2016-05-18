import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getParty } from '../../actions/parties';
import { Link } from 'react-router';

class PartiesShow extends Component {
  componentWillMount() {
    this.props.getParty(this.props.params.id);
  }

  render() {
    const { party } = this.props;

    if (!party) {
      return <div className="row"><div className="twelve columns">Loading...</div></div>
    }

    return (
      <div className="row">
        <div className="four columns offset-by-four">
          <h1>{party.header}</h1>
          <hr />
          <p>{party.description}</p>
          <p>{party.childName}</p>
          <p>{party.startDateTime}</p>
          <p>{party.endDateTime}</p>
          <p>{party.partyLocation}</p>
          <Link to='/' className="button u-full-width">Back</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { party: state.parties.party };
}

export default connect(mapStateToProps, { getParty })(PartiesShow);
