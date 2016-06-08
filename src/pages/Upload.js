import React, {Component} from 'react';
import {connect} from 'react-redux';
import EntryCreator from '../components/EntryCreator';

class Upload extends Component {
  render() {
    const styles = this.getStyles();
    return (
      <div>
        <EntryCreator
        />
      </div>
    );
  }

  getStyles() {
    return {
    };
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)
