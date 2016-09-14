import React, {Component} from 'react';
import Radium from 'radium';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actionCreators from '../actions/actionCreators';
import media from '../util/mediaQueries';

@Radium
class ParentPage extends Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
  };

  render() {
    const {user, children, actions} = this.props;
    const styles = this.getStyles();
    const loggedIn = !!user.token;
    return (
      <div>
        <div style={styles.header}>
          <div style={styles.title}>
            PaperWalrus
          </div>
          {loggedIn && <ul style={styles.menu}>
            <li key='documents' style={[styles.menuItem, styles.linkMenuItem]}>
              <Link to={'/documents'} style={styles.linkStyle}>Documents</Link>
            </li>
            <li key='sourceFiles' style={[styles.menuItem, styles.linkMenuItem]}>
              <Link to={'/sourceFiles'} style={styles.linkStyle}>Source files</Link>
            </li>
            <li key='status' style={styles.menuItem}>{user.email}</li>
            <li key='logout' style={[styles.menuItem, styles.linkMenuItem]} onClick={actions.logout}>Logout</li>
          </ul>}
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
        boxSizing: 'border-box',
        width: '100%',
        padding: '20px',
        overflow: 'hidden',
        textAlign: 'center',
        borderBottom: '5px solid black',
        [media.mobileL]: {padding: '5px'},
      },
      title: {
        fontSize: '80px',
        [media.laptop]: {fontSize: '70px'},
        [media.mobileL]: {fontSize: '50px'},
        [media.mobileS]: {fontSize: '30px'},
      },
      menu: {
        marginTop: '30px',
        [media.mobileL]: {
          marginTop: '10px',
        },
      },
      menuItem: {
        display: 'inline-block',
        padding: '0 20px',
      },
      linkMenuItem: {
        cursor: 'pointer',
        ':hover': {
          textDecoration: 'underline',
        },
      },
      linkStyle: {
        color: 'inherit',
        textDecoration: 'inherit',
      },
      contentContainer: {
        padding: '20px',
        [media.mobileL]: {padding: '10px'},
      },
    };
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentPage);
