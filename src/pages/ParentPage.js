import React, {Component} from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {initialize} from '../actions/actionCreators';
import media from '../util/mediaQueries';

@Radium
class ParentPage extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    tags: React.PropTypes.object.isRequired,
  };

  static childContextTypes = {
    tags: React.PropTypes.object,
  }

  getChildContext() {
    const {tags} = this.props;
    return {tags};
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(initialize());
  }

  render() {
    const {children} = this.props;
    const styles = this.getStyles();
    return (
      <div>
        <div style={styles.header}>
          <div style={styles.title}>
            PaperWalrus
          </div>
          <ul style={styles.menu}>
            <li style={styles.menuItem}><Link to={'/'}>Home</Link></li>
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
      contentContainer: {
        padding: '20px',
        [media.mobileL]: {padding: '10px'},
      },
    };
  }
}

function mapStateToProps(state) {
  return {
    tags: state.data.tags || {},
  };
}

export default connect(mapStateToProps)(ParentPage);
