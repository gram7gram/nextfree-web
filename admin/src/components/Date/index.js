import 'react-datepicker/dist/react-datepicker.min.css'
import './style.css'

import React from 'react'
import PropType from 'prop-types'

import Date, {registerLocale, setDefaultLocale} from 'react-datepicker'
import i18n from '../../i18n'

import moment from "moment"
import uk from "date-fns/locale/uk"

// registerLocale("ru", require("date-fns/locale/ru"));

class DateWrapper extends React.Component {

  constructor(props) {
    super(props)

    registerLocale("ua", uk);
    setDefaultLocale("ua")
  }

  onChange = date => {
    let value = null

    if (date) {
      value = moment(date, 'DD.MM.YYYY').format('YYYY-MM-DD')
    }

    this.props.onChange(value)
  }

  render() {

    const displayValue = this.props.value
      ? moment(this.props.value, 'YYYY-MM-DD').format('DD.MM.YYYY')
      : ''

    return <Date
      locale="ua"
      closeOnSelect={true}
      showYearDropdown={true}
      viewMode="days"
      autoComplete='off'
      placeholderText={i18n.t('placeholder.date')}
      className="form-control"
      {...this.props}
      value={displayValue}
      onChange={this.onChange}/>
  }
}

DateWrapper.propTypes = {
  value: PropType.any,
  onChange: PropType.func.isRequired,
}

export default DateWrapper