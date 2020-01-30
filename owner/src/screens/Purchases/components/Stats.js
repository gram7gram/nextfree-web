import React from 'react';
import {useSelector} from "react-redux";
import i18n from "../../../i18n";

const Stats = () => {

  const meta = useSelector(state => state.Purchases.meta)

  if (meta.length === 0) return null

  return <div className="row">
    {meta.map(item => {

      let state

      if (item.nextBonusIn === 1) {
        state = 'bg-primary text-dark'
      } else if (item.nextBonusIn === 2) {
        state = 'bg-secondary text-dark'
      } else {
        state = 'bg-dark-gray text-light'
      }

      let plural
      switch (item.nextBonusIn) {
        case 1:
          plural = i18n.t('purchases.purchase.single')
          break;
        case 2:
        case 3:
        case 4:
          plural = i18n.t('purchases.purchase.plural2')
          break;
        default:
          plural = i18n.t('purchases.purchase.plural1')
      }

      return <div className="col-6 col-md-4 col-lg-3" key={item.company._id}>
        <div className={`card mb-4 ${state}`}>
          <div className="card-body p-2">
            <h6 className="mb-1">{item.company.bonusCondition} | {item.company.name}</h6>
            <p className="m-0 small">
              {i18n.t('purchases.next_bonus_in')}
              <span className="font-weight-bold">&nbsp;{item.nextBonusIn}&nbsp;</span>
              {plural}
            </p>
          </div>
        </div>

      </div>
    })}

  </div>
}

export default Stats
