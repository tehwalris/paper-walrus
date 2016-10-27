import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {Input, Heading, Text, Block} from 'rebass';
import CardBlock from './CardBlock';
import {List, ListItem} from './ui';
import {rankObjectMatch} from '../util/search';
import HighlightedSearchMatch from './HighlightedSearchMatch';

@Radium
class DocumentQuickFilter extends Component {
  static propTypes = {
    tags: PropTypes.array.isRequired,
    actions: PropTypes.shape({
      addRequiredTag: PropTypes.func.isRequired,
      removeLastRequiredTag: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {input: ''}

  componentWillMount() {
    this.updateOptions(this.state.input)
  }

  componentWillReceiveProps(newProps) {
    this.updateOptions(this.state.input, newProps)
  }

  render() {
    const {tags} = this.props;
    const {input, renderedOptions} = this.state;
    return (
      <List>
        <ListItem>
          <Input
            m={0}
            name="quickFilterInput"
            label="Quick filter"
            placeholder="Quick filter..."
            value={input}
            onChange={this.onInputChange}
            onKeyDown={this.onInputKeyDown}
            autoFocus
            hideLabel
            autoOff
          />
        </ListItem>
        <div style={{height: '228px', overflowY: 'auto', overflowX: 'hidden'}}>
          {renderedOptions}
        </div>
      </List>
    );
  }

  renderOption = ({tag, rank, matches, action}, i) => {
    return (
      <ListItem key={i} onClick={action}>
        <Text>
          has <b style={{fontWeight: 'bold'}}>
            <HighlightedSearchMatch content={tag.type} matches={matches.type}/>
          </b> tag
        </Text>
        <Heading level={3}>
          <HighlightedSearchMatch content={tag.text} matches={matches.text}/>
        </Heading>
      </ListItem>
    );
  }

  onInputChange = (e) => {
    this.updateOptions(e.target.value);
  }

  onInputKeyDown = (e) => {
    const {actions} = this.props;
    const {input, options} = this.state;
    if(e.key === 'Enter' && options.length) {
      options[0].action();
      this.updateOptions('');
    } else if(e.keyCode === 8 /*backspace*/ && !e.target.value.length) {
      actions.removeLastRequiredTag();
    }
  }

  updateOptions(input, props = this.props) {
    const options = this.getOptions(input, props);
    const renderedOptions = options.map(this.renderOption);
    this.setState({input, options, renderedOptions});
  }

  rankTag(tag, input) {
    let [type, text] = input.split(':');
    if(_.isUndefined(text))
      type = text = input;
    return rankObjectMatch(tag, {type, text});
  }

  getOptions(input, {actions, tags}) {
    let tagMatches = _.chain(tags)
      .map(tag => ({...this.rankTag(tag, input), tag, action: () => actions.addRequiredTag(tag.id)}))
      .sortBy(match => -match.rank);
    if(input) 
      tagMatches = tagMatches.take(4).filter(({rank}) => rank > 0);
    return tagMatches.value();
  }
}

export default Relay.createContainer(DocumentQuickFilter, {
  fragments: {
    tags: () => Relay.QL`
      fragment on Tag @relay(plural: true) {
        id
        type
        text
      }
    `,
  },
});
