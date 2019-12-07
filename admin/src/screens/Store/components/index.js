import React from 'react';
import {connect} from 'react-redux';
import {FILTER_CHANGED} from '../actions';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import Card from "./Card";
import {Link} from "react-router-dom";
import FetchCompanies from "../../Company/actions/Fetch";
import * as Pages from "../../../router/Pages";

class Store extends React.Component {

  componentDidMount() {

    this.props.dispatch(FetchCompanies())

    this.changePage(1)
  }

  changePage = page => {
    this.props.dispatch({
      type: FILTER_CHANGED,
      payload: {
        page
      }
    })
  }

  renderContent = () => {
    const {items, isLoading} = this.props.Store

    if (items.length === 0) {
      if (!isLoading)
      return <div className="text-center pt-4">
        <h4>{i18n.t('store.not_found_title')}</h4>
      </div>
    }

    return <div className="row no-gutters">{items.map(model =>
      <Card model={model} key={model._id}/>
    )}</div>
  }

  render() {

    return <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm my-3">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h3 className="m-0">{i18n.t('store.title')}</h3>
                </div>
                <div className="col-12 col-md-auto text-right">
                  <Link className="btn btn-success btn-sm"
                        to={Pages.STORE_NEW}>
                    <i className="fa fa-plus"/>&nbsp;{i18n.t('store.new_action')}
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  {this.renderContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

const selectors = createStructuredSelector({
  Store: store => store.Store,
})

export default connect(selectors)(Store)
