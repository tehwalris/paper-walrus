import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import TagSearchBar from '../components/TagSearchBar';
import EntryList from '../components/EntryList';
import EntryCreator from '../components/EntryCreator';

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
    actions.initialize();
  }

  render() {
    const {tags, search, actions} = this.props;
    const styles = this.getStyles();
    const testEntry = this.getDisplayedEntries()[0];
    return (
      <div>
        <TagSearchBar
          selected={_.get(search, 'tags') || []}
          onChange={actions.search}
          tags={tags}
        />
        <EntryCreator
        />
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

  getStyles() {
    return {
    };
  }
}

function mapStateToProps(state) {
  return {
    tags: state.data.tags || {},
    search: state.data.search,
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
