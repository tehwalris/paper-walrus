import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {initialize} from '../actions/actionCreators';

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
          <div style={styles.title}>PaperWalrus</div>
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

function mapStateToProps(state) {
  return {
    tags: state.data.tags || {},
  };
}

export default connect(mapStateToProps)(ParentPage);
