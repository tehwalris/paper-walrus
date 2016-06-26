import React, {Component} from 'react';
import Radium from 'radium';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../actions/actionCreators';

@Radium
class Login extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
  }

  state = {
    email: '',
    password: '',
    failed: false,
  };

  render() {
    const {email, password, failed} = this.state;
    const styles = this.getStyles();
    return (
      <div style={styles.wrapper}>
        <form onSubmit={this.onFormSubmit} style={styles.form}>
          <div style={styles.header}>Login</div>
          <input
            type='text'
            placeholder='Email'
            value={email}
            onChange={this.onEmailChange}
            style={styles.input}
            autoFocus
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={this.onPasswordChange}
            style={styles.input}
          />
          {failed && <div style={styles.failMessage}>Invalid username or password</div>}
          <button
            onClick={this.onRequestLogin}
            style={styles.loginButton}
          >
            Log in
          </button>
        </form>
      </div>
    );
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.onRequestLogin();
  }

  onRequestLogin = () => {
    const {router, actions} = this.props;
    const {email, password} = this.state;
    const destination = this.getDestination();
    actions.login({email, password}, err => {
      if (err) this.setState({failed: true});
      else router.push(destination);
    });
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  getDestination() {
    const destination = _.get(this.props.location, ['state', 'destination']);
    return destination || '/';
  }

  getStyles() {
    return {
      wrapper: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
      },
      form: {
        width: '250px',
        maxWidth: '100%',
      },
      header: {
        fontSize: '20px',
        color: 'blue',
        marginBottom: '10px',
      },
      input: {
        display: 'block',
        marginBottom: '4px',
        border: '1px solid green',
        width: '100%',
      },
      failMessage: {
        marginBottom: '5px',
        backgroundColor: 'red',
        color: 'white',
      },
      loginButton: {
        display: 'block',
        margin: '10px auto 0 auto',
      },
    };
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

