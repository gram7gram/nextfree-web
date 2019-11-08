import React from 'react'
import ReactSelect from 'react-select'
import i18n from '../i18n'

const Select = props => {

  let value = null
  if (props.value) {
    value = props.options.find(item => item.value === value)
  }

  return <ReactSelect
    placeholder={i18n.t('placeholders.select')}
    {...props}
    value={value}/>
}

export default Select