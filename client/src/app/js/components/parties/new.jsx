import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createParty } from '../../actions/parties';
import { Link } from 'react-router';

class PartiesNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleSubmit(event) {
    event.preventDefault();

    const header = this.refs.header.value;
    const description = this.refs.description.value;
    const childName = this.refs.childName.value;
    const startDateTime = this.refs.startDateTime.value;
    const endDateTime = this.refs.endDateTime.value;
    const partyLocation = this.refs.partyLocation.value;

    if (header.length !== 0 && description.length !== 0 && childName.length !== 0 && startDateTime.length !== 0 && endDateTime.length !== 0 && partyLocation.length !== 0) {
      const party = {
        header,  
        description,
        childName,
        startDateTime,
        endDateTime,
        partyLocation
      };
      this.props.createParty(party,this.props.token);
    } else {
      alert('Please fill out all fields');
    }
  }

  render() {
    return (
      <div className="row">
        <div className="four columns offset-by-four">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h1>Create party</h1>
            <hr />
            <input type="text" placeholder="Header" className="u-full-width" ref="header" />
            <input type="text" placeholder="Description" className="u-full-width" ref="description" />
            <input type="text" placeholder="Child name" className="u-full-width" ref="childName" />
            <input type="text" placeholder="Start data and time" className="u-full-width" ref="startDateTime" />
            <input type="text" placeholder="End data and time" className="u-full-width" ref="endDateTime" />
            <input type="text" placeholder="Location" className="u-full-width" ref="partyLocation" />
            <input type="submit" className="button button-primary" />
            <Link to="/" className="u-pull-right button">Cancel</Link>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { token: state.users.currentUser.token};
}

export default connect(mapStateToProps, { createParty })(PartiesNew);
