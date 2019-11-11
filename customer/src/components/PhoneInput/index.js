import 'react-intl-tel-input/dist/main.js'
import 'react-intl-tel-input/dist/main.css'
import './style.css'

import React from 'react'
import PropType from 'prop-types'

import Input from 'react-intl-tel-input'

class PhoneInput extends React.Component {

  onChange = (isValid, shortNumber, event, fullNumber) => {
    this.props.onChange(fullNumber, event.dialCode, isValid)
  }

  render() {

    let value = this.props.value

    return <Input
      containerClassName="intl-tel-input"
      inputClassName="form-control"
      formatOnInit={false}
      preferredCountries={['cy', 'us', 'gb']}
      {...this.props}
      value={value}
      onPhoneNumberChange={this.onChange}/>
  }
}

PhoneInput.propTypes = {
  value: PropType.any,
  onChange: PropType.func.isRequired,
}

export default PhoneInput