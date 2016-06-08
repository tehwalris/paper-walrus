import React, {Component} from 'react';

export default class ParentPage extends Component {
  static propTypes = {};

  render() {
    const {children} = this.props;
    const styles = this.getStyles();
    return (
      <div>
        <div style={styles.header}>PaperWalrus</div>
        {children}
      </div>
    );
  }

  getStyles() {
    return {
      header: {
        fontSize: '120px',
        textAlign: 'center',
        marginTop: '20px',
        marginBottom: '20px',
      },
    };
  }
}
