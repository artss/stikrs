import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import Input from 'react-toolbox/lib/input';

import { MONDAY } from '../../../constants/dates';
import { eventType } from '../../../proptypes/event';
import { getMonthEvents } from '../../../selectors/events';
import Calendar from '../../Calendar';
import Agenda from '../../Agenda';
import s from './EventList.css';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
  .map((label, i) => ({ label, value: i + 1 }));

export default class EventList extends PureComponent {
  static propTypes = {
    $listId: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(eventType)).isRequired,
  };

  constructor(props) {
    super(props);

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    this.state = {
      year,
      month,
    };
  }

  onYearChange = (year) => {
    this.setState({ year: Number(year) });
  }

  onMonthChange = (month) => {
    this.setState({ month: Number(month) });
  }

  onMonthDecrement = () => {
    this.setState(({ year, month }) => {
      let m = month - 1;
      let y = year;

      if (m < 1) {
        m = 12;
        y -= 1;
      }

      return { year: y, month: m };
    });
  }

  onMonthIncrement = () => {
    this.setState(({ year, month }) => {
      let m = month + 1;
      let y = year;

      if (m > 12) {
        m = 1;
        y += 1;
      }

      return { year: y, month: m };
    });
  }

  onDayClick = () => {}

  render() {
    const { $listId, items } = this.props;
    const { year, month } = this.state;

    const events = getMonthEvents(items, year, month);

    return (
      <div className={s.root}>
        <div className={s.calendarWrap}>
          <div className={s.dateSelector}>
            <IconButton
              className={s.selectorButton}
              icon="keyboard_arrow_left"
              onClick={this.onMonthDecrement}
            />

            <Dropdown
              className={s.monthSelector}
              value={month}
              source={months}
              onChange={this.onMonthChange}
            />

            <Input
              className={s.yearSelector}
              type="number"
              value={year}
              onChange={this.onYearChange}
            />

            <IconButton
              className={s.selectorButton}
              icon="keyboard_arrow_right"
              onClick={this.onMonthIncrement}
            />
          </div>

          <Calendar
            firstDayOfWeek={MONDAY}
            year={year}
            month={month}
            events={events}
            onDayClick={this.onDayClick}
          />
        </div>

        <Agenda
          $listId={$listId}
          year={year}
          month={month}
          events={events}
        />
      </div>
    );
  }
}