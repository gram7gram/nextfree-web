import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import i18n from '../../../i18n';
import * as Pages from '../../../router/Pages';
import {createStructuredSelector} from "reselect";

const Home = (props) => {

  const {firstName, email} = props.customer.user

  return <div className="container py-5">
    <div className="row">
      <div className="col-12">

        <h1 className="mb-4">
          {i18n.t('home.welcome_title').replace('_NAME_', firstName || email)}
        </h1>

        <Link className="btn btn-success btn-lg"
              to={Pages.PROFILE}>{i18n.t('home.action')}</Link>

      </div>
    </div>
  </div>

}

const selectors = createStructuredSelector({
  customer: store => store.App.customer
})

export default connect(selectors)(Home)
