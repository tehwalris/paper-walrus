import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../actions/actionCreators';
import FileDrop from '../components/FileDrop';
import TagSearchBar from '../components/TagSearchBar';
import EntryList from '../components/EntryList';
import {searchSelector} from '../selectors';

class Home extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    search: React.PropTypes.object.isRequired,
    tags: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
  }

  static childContextTypes = {
    tags: React.PropTypes.object,
  }

  state = {
    wasLoading: false,
  }

  getChildContext() {
    const {tags} = this.props;
    return {tags};
  }

  render() {
    const {tags, search, actions, router} = this.props;
    const styles = this.getStyles();
    return (
      <div>
        <TagSearchBar
          selected={_.get(search, ['query', 'tags']) || []}
          onChange={actions.search}
          tags={tags}
          style={styles.search}
        />
        <FileDrop
          onDrop={this.onFiles}
          style={styles.fileDrop}
        >
          <EntryList
            entries={this.getDisplayedEntries()}
            onEntryClick={id => router.push('/detail/' + id)}
            onFilesSelect={this.onFiles}
            style={styles.entryList}
          />
        </FileDrop>
      </div>
    );
  }

  onFiles = (files) => {
    const {actions} = this.props;
    actions.uploadAndCreateEntries(
      _.toArray(files),
      (err, entries) => {
        if(!err)
          actions.search([]);
      }
    );
  }

  getDisplayedEntries() {
    const {search} = this.props;
    return _.get(search, 'results') || [];
  }

  getStyles() {
    const {search} = this.props;
    return {
      search: {
        marginBottom: '20px',
      },
      fileDrop: {
        margin: '-10px',
      },
      entryList: {
        opacity: search.loading ? 0.5 : 1,
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
