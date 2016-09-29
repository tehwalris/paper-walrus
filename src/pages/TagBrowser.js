import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import CreateTagMutation from '../mutations/CreateTagMutation';

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
        <ul>
          {tags.map((tag, i) => (
          <li key={i}>[{tag.type}] {tag.text}</li>
          ))}
        </ul>
      </div>
    );
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
