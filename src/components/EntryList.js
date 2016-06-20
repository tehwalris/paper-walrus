import React, {Component} from 'react';
import Radium from 'radium';
import Entry from './Entry';
import UploadEntry from './UploadEntry';
import media from '../util/mediaQueries';

@Radium
export default class EntryList extends Component {
  static propTypes = {
    entries: React.PropTypes.array.isRequired,
    onEntryClick: React.PropTypes.func.isRequired,
    onFilesSelect: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
  }

  static contextTypes = {
    tags: React.PropTypes.object.isRequired,
  }

  render() {
    const {entries, onFilesSelect, onEntryClick, style} = this.props;
    const styles = this.getStyles();
    return (
      <div style={[styles.wrapper, style]}>
        <UploadEntry
          onFilesSelect={onFilesSelect}
          style={[styles.entry, styles.uploadEntry]}
        />
        {entries.map((entry, i) => (
        <Entry
          key={i}
          entry={entry}
          onClick={() => onEntryClick(entry.id)}
          style={styles.entry}
        />
        ))}
      </div>
    );
  }

  getStyles() {
    return {
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        [media.mobileL]: {
          justifyContent: 'space-around',
        },
      },
      entry: {
        boxSizing: 'border-box',
        width: '200px',
        height: '200px',
        margin: '10px',
        border: '1px solid blue',
        [media.tablet]: {
          width: '180px',
          height: '180px',
          margin: '5px',
        },
        [media.mobileL]: {
          width: '45vw',
          margin: '5px 0',
        },
        [media.mobileS]: {
          width: '95vw',
        },
      },
      uploadEntry: {
        [media.mobileS]: {
          height: '50px',
        },
      },
    };
  }
}
