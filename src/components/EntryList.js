import React, {Component} from 'react';
import Radium from 'radium';
import Entry from './Entry';

@Radium
export default class EntryList extends Component {
  static propTypes = {
    entries: React.PropTypes.array.isRequired,
    onEntryClick: React.PropTypes.array.isRequired,
  }

  render() {
    const {entries, onEntryClick} = this.props;
    const styles = this.getStyles();
    return (
      <div style={styles.wrapper}>
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
        backgroundColor: 'red',
        padding: '10px',
      },
      entry: {
        width: '200px',
        height: '200px',
        margin: '10px',
      },
    };
  }
}
