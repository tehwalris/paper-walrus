import React, {Component} from 'react';
import {Link} from 'react-router';

export default class ParentPage extends Component {
  static propTypes = {};

  render() {
    const {children} = this.props;
    const styles = this.getStyles();
    return (
      <div>
        <div style={styles.header}>
          <div style={styles.title}>PaperWalrus</div>
          <ul style={styles.menu}>
            <li style={styles.menuItem}><Link to={'/'}>Home</Link></li>
            <li style={styles.menuItem}><Link to={'/upload'}>Upload</Link></li>
          </ul>
        </div>
        <div style={styles.contentContainer}>
          {children}
        </div>
      </div>
    );
  }

  getStyles() {
    return {
      header: {
        textAlign: 'center',
        borderBottom: '5px solid black',
        padding: '20px',
      },
      title: {
        fontSize: '120px',
      },
      menu: {
        marginTop: '30px',
      },
      menuItem: {
        display: 'inline-block',
        padding: '0 20px',
      },
      contentContainer: {
        padding: '20px',
      },
    };
  }
}
