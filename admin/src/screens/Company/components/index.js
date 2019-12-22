import React from 'react';
import {connect} from 'react-redux';
import {FILTER_CHANGED} from '../actions';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import Card from "./Card";
import {Link} from "react-router-dom";
import * as Pages from "../../../router/Pages";
import FetchOwners from "../../Owner/actions/Fetch";
import Filter from "./Filter";

class Company extends React.Component {

  componentDidMount() {

    this.props.dispatch(FetchOwners())

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
    const {items, isLoading} = this.props.Company

    if (items.length === 0) {
      if (!isLoading)
        return <div className="text-center pt-4">
          <h4>{i18n.t('company.not_found_title')}</h4>
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
                  <h3 className="m-0">{i18n.t('company.title')}</h3>
                </div>
                <div className="col-12 col-md-6 col-lg-4 text-right">
                  <Filter/>
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
  Company: store => store.Company,
})

export default connect(selectors)(Company)
