import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import DocumentContentView from '../components/DocumentContentView';
import RoughDateRange from '../components/RoughDateRange';
import {NavReservedArea, Header, Text, PaddedPage, LinkButton} from '../components/ui';

@Radium
class DocumentView extends Component {
  static propTypes = {
    document: PropTypes.object,
  }

  render() {
    const {document} = this.props;
    if (!document) return null;
    return (
      <PaddedPage defaultColorSet="contrast" style={{width: '100%' /* //HACK */}}>
        <div style={this.styles.headerZoneWrapper}>
          <NavReservedArea/>
          <div style={this.styles.headerZone}>
            <Header level={2}>{document.name || '(unnamed)'}</Header>
            <Text><RoughDateRange dateRange={document.dateRange}/></Text>
            <LinkButton to={`/documents/${document.id}/edit`}>Edit document</LinkButton>
          </div>
        </div>
        <DocumentContentView
          document={document}
        />
      </PaddedPage>
    );
  }

  get styles() {
    return {
      headerZoneWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'right',
      },
      headerZone: {
        flexGrow: 1,
      },
    };
  }
}

export default Relay.createContainer(DocumentView, {
  fragments: {
    document: () => Relay.QL`
      fragment on Document {
        id
        name
        dateRange {
          ${RoughDateRange.getFragment('dateRange')}
        }
        ${DocumentContentView.getFragment('document')}
      }
    `,
  },
});
