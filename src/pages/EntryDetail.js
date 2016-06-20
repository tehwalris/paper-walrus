import React, {Component} from 'react';
import {connect} from 'react-redux';

class EntryDetail extends Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired,
    entries: React.PropTypes.object.isRequired,
  }

  render() {
    const {entries, params} = this.props;
    const entry = entries[params.id];
    const styles = this.getStyles();
    if (!entry) return <div/>;
    return (
      <div>
        {JSON.stringify(entry)}
      </div>
    );
  }

  getStyles() {
    return {
    };
  }
}

function mapStateToProps(state) {
  return {
    entries: state.data.entries,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
