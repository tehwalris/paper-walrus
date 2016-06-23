import React, {Component} from 'react';
import Radium from 'radium';
import resolveSources from '../util/resolveSources';

@Radium
export default class ContentDisplay extends Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    style: React.PropTypes.object,
  }

  render() {
    const {data, style} = this.props;
    const {original} = resolveSources(data);
    if (data.originalType.split('/')[0].toLowerCase() === 'image')
      return this.renderImage(original);
    if (data.originalType.toLowerCase() === 'application/pdf')
      return this.renderPdf(original);
    return <div style={style}>Unsupported content.</div>;
  }

  renderImage(url) {
    const {style} = this.props;
    const styles = this.getStyles();
    return (
      <a href={url} target='_blank' style={style}>
        <img src={url} style={styles.image}/>
      </a>
    );
  }

  renderPdf(url) {
    const {style} = this.props;
    const styles = this.getStyles();
    return (
      <object data={url} type="application/pdf" style={style}>
        <iframe src={url} style={styles.pdfIframe}>
          Preview not supported. <a href={url}>Download PDF</a>
        </iframe>
      </object>
    );
  }

  getStyles() {
    return {
      image: {
        objectFit: 'scale-down',
        width: '100%',
        height: '100%',
      },
      pdfIframe: {
        width: '100%',
        height: '100%',
      },
    };
  }
}
