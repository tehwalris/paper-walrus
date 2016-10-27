import React, {Component} from 'react';
import Radium from 'radium';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import media from '../util/mediaQueries';
import {NavOverlay, ThemedArea} from '../components/ui';

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
      <ThemedArea defaultColorSet="default" style={styles.wrapper}>
        <NavOverlay logoText="paper.walr.is"/>
        <div style={styles.contentWrapper}>{children}</div>
      </ThemedArea>
    );
  }

  getStyles() {
    return {
      wrapper: {
        position: 'relative',
      },
      contentWrapper: {
        positon: 'absolute',
        display: 'flex',
        minHeight: '100vh', //HACK
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
