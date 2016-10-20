import React, {Component} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import CardWrapper from './CardGrid/CardWrapper';
import ContentPreview from './ContentPreview';

@Radium
class SourceFileCard extends Component {
  static propTypes = {
    sourceFile: React.PropTypes.object.isRequired,
    style: React.PropTypes.object,
  }

  render() {
    const {children, style, ...otherProps} = this.props;
    return (
      <CardWrapper style={style} {...otherProps}>
        {this.renderPreview()}
        <div>{children}</div>
      </CardWrapper>
    );
  }

  renderPreview() {
    const {sourceFile: {mimeType, previewUrl}} = this.props;
    const styles = this.getStyles();
    if(previewUrl)
      return <ContentPreview imageUrl={previewUrl} style={styles.preview}/>
    return <div style={styles.preview}>{mimeType}</div>
  }

  getStyles() {
    return {
      preview: {
        width: '100%',
        height: '1px',
        flexGrow: 1,
        flexShrink: 1,
      },
    };
  }
}

export default Relay.createContainer(SourceFileCard, {
  fragments: {
    sourceFile: () => Relay.QL`
      fragment on SourceFile {
        mimeType
        previewUrl
      }
    `,
  },
});
