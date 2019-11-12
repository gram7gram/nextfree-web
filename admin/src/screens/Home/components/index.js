import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import i18n from '../../../i18n';
import * as Pages from '../../../router/Pages';
import {createStructuredSelector} from "reselect";

const Home = (props) => {

  const {firstName, email} = props.admin.user

  return <div className="container py-5">
    <div className="row">
      <div className="col-12">

        <div className="jumbotron">
          <h1 className="display-3">
            {i18n.t('home.welcome_title').replace('_NAME_', firstName || email)}
          </h1>
          <p className="lead">{i18n.t('home.welcome_text')}</p>

          <p className="lead">
            <Link className="btn btn-primary btn-lg"
                  to={Pages.PROFILE}>{i18n.t('home.profile')}</Link>
          </p>

        </div>

      </div>
    </div>
  </div>

}

const selectors = createStructuredSelector({
  admin: store => store.App.admin
})

export default connect(selectors)(Home)
