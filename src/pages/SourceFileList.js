import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import SourceFileUploadGrid from '../components/SourceFileUploadGrid';
import {NavReservedArea} from '../components/ui';

@Radium
class SourceFileList extends Component {
  static propTypes = {
    viewer: PropTypes.shape({
      sourceFiles: PropTypes.array,
    }).isRequired,
  }

  render() {
    const {viewer: {sourceFiles}} = this.props;
    if (_.isNil(sourceFiles)) return null;
    return (
      <div>
        <NavReservedArea/>
        <SourceFileUploadGrid
          sourceFiles={sourceFiles}
        />
      </div>
    );
  }
}

export default Relay.createContainer(SourceFileList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        sourceFiles (onlyUnassigned: true) {
          ${SourceFileUploadGrid.getFragment('sourceFiles')}
        }
      }
    `,
  },
});
