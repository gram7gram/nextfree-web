import React from 'react';
import moment from 'moment';
import i18n from '../../../i18n';

const Card = ({model}) => {

  return <>
    <td className="align-middle">

      {model.company
        ? <h6 className="m-0">{model.company.name}</h6>
        : null}

      {model.store
        ? <div>
          <small>{model.store.city || ''}, {model.store.address || ''}</small>
        </div>
        : null}

    </td>
    <td className="align-middle">
      {moment(model.createdAt).format('HH:mm DD.MM.YY')}
    </td>
    <td className="align-middle">
      <span className="text-primary">{model.bonusCondition}</span>
    </td>
    <td className="align-middle">
      {model.isBonus
        ? <div className="badge badge-primary">{i18n.t('purchases.is_bonus')}</div>
        : <div className="badge badge-default">{i18n.t('purchases.is_not_bonus')}</div>}
    </td>
  </>
}

export default Card
