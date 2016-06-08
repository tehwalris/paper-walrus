import React, {Component} from 'react';
import {connect} from 'react-redux';

class EntryDetail extends Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired,
  }

  render() {
    const {id} = this.props.params;
    const styles = this.getStyles();
    return (
      <div>
        Entry details here for id {id}.
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
