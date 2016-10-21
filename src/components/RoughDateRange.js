import React, {Component} from 'react';
import Relay from 'react-relay';

class RoughDateRange extends Component {
  render() {
    const {dateRange: {start, end}} = this.props;
    return <span>{start + ' - ' + end}</span>;
  }
}

export default Relay.createContainer(RoughDateRange, {
  fragments: {
    dateRange: () => Relay.QL`
      fragment on DateRange {
        start
        end
      }
    `,
  },
});
