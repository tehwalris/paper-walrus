import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../actions/actionCreators';
import TagSearchBar from '../components/TagSearchBar';
import EntryList from '../components/EntryList';
import {searchSelector} from '../selectors';

class Home extends Component {
  static propTypes = {
    search: React.PropTypes.object,
    tags: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
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
    const {tags, search, actions, router} = this.props;
    const styles = this.getStyles();
    const testEntry = this.getDisplayedEntries()[0];
    return (
      <div>
        <TagSearchBar
          selected={_.get(search, ['query', 'tags']) || []}
          onChange={actions.search}
          tags={tags}
          style={styles.search}
        />
        <EntryList
          entries={this.getDisplayedEntries()}
          onEntryClick={id => router.push('/detail/' + id)}
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
      search: {
        marginBottom: '20px',
      },
    };
  }
}

function mapStateToProps(state) {
  return {
    tags: state.data.tags || {},
    search: searchSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
