import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import i18n from '../../../i18n';
import {MODEL_CHANGED} from "../actions";

const Customer = () => {

  const stores = useSelector(state => state.Store.items)
  const model = useSelector(state => state.QRScanner.model)
  const dispatch = useDispatch()

  const changeStore = e => {
    const storeId = e.target.value

    const match = stores.find(store => store._id === storeId)
    if (match) {
      dispatch({
        type: MODEL_CHANGED,
        payload: {
          storeId,
          companyId: match.companyId,
        }
      })
    } else {
      dispatch({
        type: MODEL_CHANGED,
        payload: {
          storeId: null,
          companyId: null,
        }
      })
    }
  }

  return <div className="row">
    <div className="col-12">
      <div className="form-group">
        <label className="m-0 required">{i18n.t('qr_scanner.store')}</label>
        <select
          name="storeId"
          value={model.storeId || ''}
          onChange={changeStore}
          className="form-control">
          <option value="" disabled={true}>{i18n.t('placeholder.select')}</option>
          {stores
            .map(item => <option key={item._id} value={item._id}>{item.address || item._id}</option>)}
        </select>
      </div>
    </div>
  </div>
}

export default Customer
