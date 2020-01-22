import React from 'react';
import {useDispatch} from 'react-redux';
import i18n from '../../../i18n';
import {SET_DEFAULTS} from "../actions";

const PurchaseSuccess = () => {

  const dispatch = useDispatch()

  const setDefaults = () => {
    dispatch({
      type: SET_DEFAULTS
    })
  }

  return <div className="alert alert-light text-center">
    <h4>{i18n.t('qr_scanner.purchase_success_title')}</h4>
    <p>{i18n.t('qr_scanner.purchase_success_subtitle')}</p>

    <button className="btn btn-primary" onClick={setDefaults}>
      {i18n.t('qr_scanner.again_action')}
    </button>
  </div>
}

export default PurchaseSuccess