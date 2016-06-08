import React, {Component} from 'react';
import {connect} from 'react-redux';

class EntryDetail extends Component {
  render() {
    const styles = this.getStyles();
    return (
      <div>
        Entry details here
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

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
