import React, {Component} from 'react';
import Relay from 'react-relay';
import moment from 'moment';

class RoughDateRange extends Component {
  render() {
    const startDate = moment(this.props.dateRange.start).calendar()
    const endDate = moment(this.props.dateRange.end).calendar()
    if(startDate === endDate)
      return <span>{startDate}</span>;
    return <span>{startDate} - {endDate}</span>;
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
