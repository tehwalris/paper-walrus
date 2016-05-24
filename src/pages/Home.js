import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import EntryList from '../components/EntryList';

class Home extends Component {
  static propTypes = {
    search: React.PropTypes.object,
    tags: React.PropTypes.object.isRequired,
  }

  static childContextTypes = {
    tags: React.PropTypes.object,
  }

  getChildContext() {
    const {tags} = this.props;
    return {tags};
  }

  componentDidMount() {
    const {actions} = this.props;
    actions.loadTags();
    actions.loadTestData();
  }

  render() {
    const {search} = this.props;
    return (
      <div>
        Walrus!
        The home page.
        <EntryList
          entries={this.getDisplayedEntries()}
        />
      </div>
    );
  }

  getDisplayedEntries() {
    const {search} = this.props;
    return _.get(search, 'results') || [];
  }
}

function mapStateToProps(state) {
  return {
    tags: state.data.tags || {},
    search: state.data.search,
  };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
