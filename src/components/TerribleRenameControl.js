import React, {Component, PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class TerribleRenameControl extends Component {
  static propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.object,
  }

  state = {
    name: null,
  };

  componentWillReceiveProps(props) {
    this.setNameInStateIfNeeded(props.name);
  }

  render() {
    const {style} = this.props;
    const styles = this.getStyles();
    return (
      <div style={[styles.wrapper, style]}>
        <input
          type='text'
          value={this.getDisplayedName()}
          placeholder='(unnamed)'
          onChange={this.onInputChange}
        />
        {this.nameHasChanged() && (
        <button onClick={this.onClickRename}>Rename</button>
        )}
      </div>
    );
  }

  getDisplayedName() {
    if(!_.isNull(this.state.name))
      return this.state.name;
    return this.props.name || '';
  }

  nameHasChanged() {
    return (this.getDisplayedName() || '') !== (this.props.name || '');
  }

  setNameInStateIfNeeded(name) {
    const matchesProps = (name || '') === (this.props.name || '');
    this.setState({
      name: matchesProps ? null : name,
    });
  }

  onClickRename = () => {
    this.props.onChange(this.getDisplayedName());
  }

  onInputChange = (event) => {
    this.setNameInStateIfNeeded(event.target.value);
  }
  
  getStyles() {
    return {
      wrapper: {
        border: '3px solid red',
        padding: '3px',
      },
    };
  }
}


