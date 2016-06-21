import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../actions/actionCreators';
import ContentDisplay from '../components/ContentDisplay';
import AsyncEntryEditor from '../components/AsyncEntryEditor';

class EntryDetail extends Component {
  static propTypes = {
    entries: React.PropTypes.object.isRequired,
    tags: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
  }

  componentWillMount() {
    const {actions, params} = this.props;
    actions.loadEntryIfRequired(params.id);
  }

  render() {
    const {tags, entries, actions, params} = this.props;
    const entry = entries[params.id];
    const styles = this.getStyles();
    if (!entry) return <div/>;
    return (
      <div style={styles.wrapper}>
        <ContentDisplay
          data={entry.data}
          style={styles.content}
        />
        <div style={styles.sidebar}>
          <AsyncEntryEditor
            entry={entry}
            tags={tags}
            onCreateTag={this.onCreateTag}
            onChange={actions.updateEntry}
          />
          <button onClick={this.onDeleteEntry}>
            Delete entry
          </button>
        </div>
      </div>
    );
  }

  onCreateTag = (tagInfo) => {
    const {actions} = this.props;
    return new Promise((resolve, reject) => {
      actions.createTag(tagInfo, (err, createdTag) => {
        if (err) reject(err);
        else resolve(createdTag);
      });
    });
  }

  onDeleteEntry = () => {
    const {actions, params, router} = this.props;
    actions.deleteEntry(params.id);
    router.push('/');
  }

  getStyles() {
    return {
      wrapper: {
        display: 'flex',
        width: '100%',
      },
      content: {
        flexGrow: 1,
        minWidth: '300px',
        maxHeight: '800px',
      },
      sidebar: {
        width: '300px',
        borderLeft: '5px solid pink',
        marginLeft: '10px',
        paddingLeft: '10px',
      },
    };
  }
}

function mapStateToProps(state) {
  return {
    entries: state.data.entries,
    tags: state.data.tags,
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EntryDetail));
