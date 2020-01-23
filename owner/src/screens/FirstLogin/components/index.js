import React from 'react';
import {Link} from 'react-router-dom';
import * as Pages from '../../../router/Pages';
import Save from '../actions/Save';
import {useDispatch, useSelector} from "react-redux";

const Ua = () => {

  const dispatch = useDispatch()
  const owner = useSelector(state => state.App.owner)

  const setViewed = () => {
    dispatch(Save({
      isFirstLoginGreetingViewed: true
    }))
  }

  const nameSuffix = owner && owner.user ? `, ${owner.user.firstName}` : ''

  return <>
    <h1 className="mb-3">Вітаємо{nameSuffix}!</h1>
    <p>До закінчення налаштування вашої Компанії залишилось зовсім трохи.</p>
    <p>Крок 1. Перейти в меню
      &nbsp;<Link to={Pages.MY_COMPANY} onClick={setViewed}>Моя компанія</Link>
      &nbsp;та обрати умову надання бонусу.</p>
    <p>Крок 2. Перейти в меню
      &nbsp;<Link to={Pages.STORES} onClick={setViewed}>Торгові точки</Link>
      &nbsp;та додати в систему мінімум одну з них.</p>
    <p>Крок 3. При наявності найнятих працівників - перейти в меню
      &nbsp;<Link to={Pages.STAFF} onClick={setViewed}>Співробітники</Link>
      &nbsp;та запросити їх зареєструватися в системі.</p>
    <p className="mt-3">Вдалих Вам продажів!</p>

    <div className="text-center">
      <Link className="btn btn-primary btn-lg"
            onClick={setViewed}
            to={Pages.HOME}>Зрозуміло!</Link>
    </div>
  </>
}

const Greeting = () => {

  const locale = useSelector(state => state.App.locale)

  let content
  if (locale === 'ua') {
    content = <Ua/>
    // } else if (locale === 'ru') {
    //   content = <Ru/>
  } else {
    content = <Ua/>
  }

  return <div className="container py-5">
    <div className="row">
      <div className="col-12 col-md-8 mx-auto">

        {content}

      </div>
    </div>
  </div>

}
export default Greeting
