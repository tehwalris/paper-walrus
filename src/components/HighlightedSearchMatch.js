import React, {Component, PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class HighlightedSearchMatch extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    matches: PropTypes.arrayOf(PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
    }).isRequired).isRequired,
  }

  static defaultProps = {
    content: '',
    matches: [],
  }

  render() {
    return (
      <span>
        {this.getSections().map((section, i) => (
        <span key={i} style={this.styles.isMatch[section.isMatch.toString()]}>
          {section.content}
        </span>
        ))}
      </span>
    );
  }

  getSections() {
    const {content, matches} = this.props;
    let lastEnd = -1, sections = [];
    matches.forEach(match => {
      if(match.start <= lastEnd || match.start > match.end || match.end >= content.length)
        throw new Error('Invalid match for highlighting.');
      if(lastEnd + 1 < match.start)
        sections.push({start: lastEnd + 1, end: match.start - 1, isMatch: false});
      sections.push({start: match.start, end: match.end, isMatch: true});
      lastEnd = match.end;
    });
    if(lastEnd < content.length - 1)
      sections.push({start: lastEnd + 1, end: content.length - 1, isMatch: false});
    sections.forEach(section => {
      section.content = content.substring(section.start, section.end + 1);
    });
    return sections;
  }

  styles = {
    isMatch: {
      false: {opacity: '0.5'},
    },
  }
}
