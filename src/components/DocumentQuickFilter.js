import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Relay from 'react-relay';
import {Input, Heading, Text, Block} from 'rebass';
import CardBlock from './CardBlock';
import MenuList from './MenuList';
import MenuListItem from './MenuListItem';
import {rankObjectMatch} from '../util/search';
import HighlightedSearchMatch from './HighlightedSearchMatch';

@Radium
class DocumentQuickFilter extends Component {
  static propTypes = {
    tags: PropTypes.array.isRequired,
    actions: PropTypes.shape({
      addRequiredTag: PropTypes.func.isRequired,
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
      <CardBlock mt={0} p={0}>
        <MenuList m={0}>
          <MenuListItem py={2}>
            <Input
              m={0}
              name="quickFilterInput"
              label="Quick filter"
              placeholder="Quick filter..."
              value={input}
              onChange={this.onInputChange}
              onKeyPress={this.onInputKeyPress}
              hideLabel
              autoOff
            />
          </MenuListItem>
          <div style={{height: '228px', overflowY: 'auto', overflowX: 'hidden'}}>
            {renderedOptions}
          </div>
        </MenuList>
      </CardBlock>
    );
  }

  renderOption = ({tag, rank, matches, action}, i) => {
    return (
      <MenuListItem key={i} onClick={action}>
        <Text>
          has <b style={{fontWeight: 'bold'}}>
            <HighlightedSearchMatch content={tag.type} matches={matches.type}/>
          </b> tag
        </Text>
        <Heading level={3}>
          <HighlightedSearchMatch content={tag.text} matches={matches.text}/>
        </Heading>
      </MenuListItem>
    );
  }

  onInputChange = (e) => {
    this.updateOptions(e.target.value);
  }

  onInputKeyPress = (e) => {
    const {options} = this.state;
    if(e.key === 'Enter' && options.length) {
      options[0].action();
      this.updateOptions('');
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
