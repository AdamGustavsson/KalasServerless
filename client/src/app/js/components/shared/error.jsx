import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetError } from '../../actions/error';
import { Translate,I18n} from 'react-redux-i18n';

const styles = {
  backgroundColor: "#FC9D9A",
  // color: "#FE4365",
  fontWeight: 'bold',
  padding: "1em",
  borderRadius: "4px",
  marginBottom: "1em"
}

class Error extends Component {

  handleDismissClick(event) {
    event.preventDefault();
    this.props.resetError();
  }

  render() {
    const { message } = this.props;

    if (!message.length) {
      return null;
    }

    return (
      <div className="row">
        <div className="twelve columns" style={styles}>
          <Translate value="error.anErrorOccured" />: "{message}"
          <a href="#" onClick={this.handleDismissClick.bind(this)} className="u-pull-right"><Translate value="error.dismiss" /></a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({error}) => ({ message: error.message })

export default connect(mapStateToProps, { resetError })(Error);
