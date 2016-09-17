import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';

@Radium
class DocumentPartEditor extends Component {
  static propTypes = {
    document: PropTypes.object.isRequired,
    //createDocumentPart: PropTypes.func.isRequired, //TODO
    style: PropTypes.object,
  }

  render() {
    const {document: {parts}, createDocumentPart, style} = this.props;
    return (
      <div style={[this.styles.wrapper, style]}>
        Document parts: <br/>
        {JSON.stringify(parts)}
        <div>
          <a onClick={() => createDocumentPart({sourceFileId: '100'})}>
            [create test part]
          </a>
        </div>
      </div>
    );
  }

  get styles() {
    return {
      wrapper: {
        backgroundColor: 'green',
        color: 'white',
        padding: '3px',
      }
    };
  }
}

export default Relay.createContainer(DocumentPartEditor, {
  fragments: {
    document: () => Relay.QL`
      fragment on Document{
        parts {
          sourceFile {
            url
          }
        }
      }
    `,
  },
});
