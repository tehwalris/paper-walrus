import React, {Component} from 'react';
import resolveSource from '../util/resolveSource';

export default class ContentPreview extends Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    style: React.PropTypes.object,
  }

  render() {
    const {data} = this.props;
    const sourceUrl = resolveSource(data);
    if(data.type === 'image')
      return this.renderImage(sourceUrl);
  }

  renderImage(sourceUrl) {
    const {style} = this.props;
    return (
      <img src={sourceUrl} style={style}/>
    );
  }
}
