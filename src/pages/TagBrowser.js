import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import CleanupTagsMutation from '../mutations/CleanupTagsMutation';
import {NavReservedArea} from '../components/ui';

@Radium
class TagBrowser extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
  }

  render() {
    const {viewer: {tags}} = this.props;
    if (_.isNil(tags)) return null;
    return (
      <div>
        <NavReservedArea/>
        <ul>
          {tags.map((tag, i) => (
          <li key={i}>[{tag.type}] {tag.text}</li>
          ))}
        </ul>
        <br/>
        <a onClick={() => this.cleanupTags()}>
          [clean up unused]
        </a>
      </div>
    );
  }

  cleanupTags = () => {
    const {relay} = this.props;
    relay.commitUpdate(new CleanupTagsMutation());
  }
}

export default Relay.createContainer(TagBrowser, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        tags {
          type
          text
        }
      }
    `,
  },
});
