import React, {Component} from 'react';
import EntryList from '../components/EntryList';

export default class Home extends Component {
  static propTypes = {
  }

  render() {
    const testEntries = [{name: 'abc'}, {name: 'def'}];
    return (
      <div>
        Walrus!
        The home page.
        <EntryList
          entries={testEntries}
        />
      </div>
    );
  }
}
