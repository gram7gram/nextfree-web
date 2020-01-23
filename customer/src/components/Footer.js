import React from 'react';
import moment from 'moment';
import parameters from '../parameters';

const year = moment().format('YYYY')

const Footer = () => {

  return <footer className="w-100 bg-darker text-light text-center text-md-left">
    <div className="container-fluid">
      <div className="row py-5">

        <div className="col-md-3 d-none d-md-flex">
          <a href={parameters.wwwHost}>
            <img src={`${parameters.storageHost}/img/v2/logo.svg`} alt="Logo"
                 className="img-fluid w-100 logo"/>
          </a>
        </div>

        <div className="col-12 col-md-3 mb-4">
          <h5 className="mb-3 font-weight-bold">Ресурси</h5>

          <a href={`${parameters.wwwHost}/privacy`}
             className="text-secondary py-2 d-block">Умови користування</a>

          <a href={parameters.customerHost}
             className="text-secondary py-2 d-block">Для покупців</a>

          <a href={parameters.ownerHost}
             className="text-secondary py-2 d-block">Для власників</a>

          <a href={parameters.staffHost}
             className="text-secondary py-2 d-block">Для співробітників</a>

        </div>

        <div className="col-12 col-md-3 mb-4">
          <h5 className="mb-3 font-weight-bold">Контакти</h5>

          {parameters.telegram &&
          <a href={parameters.telegram} rel="nofollow">
            <i className="fab fa-telegram-plane fa-2x text-secondary p-2"></i>
          </a>}

          {parameters.messenger &&
          <a href={parameters.messenger} rel="nofollow">
            <i className="fab fa-facebook-messenger fa-2x text-secondary p-2"></i>
          </a>}

          {parameters.viber &&
          <a href={parameters.viber} rel="nofollow">
            <i className="fab fa-viber fa-2x text-secondary p-2"></i>
          </a>}

          {parameters.email &&
          <a href={`mailto:${parameters.email}`} rel="nofollow">
            <i className="far fa-envelope fa-2x text-secondary p-2"></i>
          </a>}

        </div>

        <div className="col-12 col-md-3 mb-4">
          <h5 className="mb-3 font-weight-bold">Соц. мережі</h5>

          {parameters.fbLink &&
          <a href={parameters.fbLink}
             rel="nofollow"
             className="text-secondary py-2 d-block">Facebook</a>}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p className="text-secondary">{year} NextFree Україна. Всі права захищено</p>
        </div>
      </div>
    </div>

  </footer>
}

export default Footer