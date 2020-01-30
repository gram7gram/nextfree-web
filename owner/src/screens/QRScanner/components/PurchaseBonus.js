import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import i18n from '../../../i18n';
import {SET_DEFAULTS} from "../actions";

const PurchaseBonus = () => {

  const purchase = useSelector(state => state.QRScanner.purchase)

  const dispatch = useDispatch()

  const setDefaults = () => {
    dispatch({
      type: SET_DEFAULTS
    })
  }

  const buyer = purchase.buyer.user.lastName + ' ' + purchase.buyer.user.firstName

  return <div className="text-center my-4">
    <h2 className="text-primary">
      <i className="fa fa-check"/>&nbsp;{i18n.t('qr_scanner.purchase_bonus_title')}
    </h2>
    <p>{i18n.t('qr_scanner.purchase_bonus_subtitle').replace('__NAME__', buyer)}</p>

    <button className="btn btn-primary" onClick={setDefaults}>
      {i18n.t('qr_scanner.again_action')}
    </button>
  </div>
}

export default PurchaseBonus
