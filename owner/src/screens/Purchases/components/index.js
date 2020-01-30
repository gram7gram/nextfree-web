import React from 'react';
import {connect} from 'react-redux';
import {FILTER_CHANGED} from '../actions';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import Card from "./Card";
import Filter from "./Filter";
import Stats from "./Stats";

class Purchases extends React.Component {

  componentDidMount() {
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
    const {items, isLoading} = this.props.Purchases

    if (items.length === 0) {
      if (!isLoading)
      return <div className="text-center pt-4">
        <h4>{i18n.t('purchases.not_found_title')}</h4>
      </div>
    }

    return <table className="table table-sm text-light bg-dark-gray">
      <thead>
      <tr>
        <th>{i18n.t('purchases.location')}</th>
        <th>{i18n.t('purchases.date')}</th>
        <th>{i18n.t('purchases.condition')}</th>
        <th>{i18n.t('purchases.bonus')}</th>
      </tr>
      </thead>
      <tbody>{items.map(model =>
        <tr key={model.createdAt}>
          <Card model={model}/>
        </tr>
      )}</tbody>
    </table>
  }

  render() {

    return <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card my-3">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h3 className="m-0">{i18n.t('purchases.title')}</h3>
                </div>
                <div className="col-12 col-md-auto text-right">
                  <Filter/>
                </div>
              </div>
            </div>
            <div className="card-body px-0">

              <Stats/>

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
  Purchases: store => store.Purchases,
})

export default connect(selectors)(Purchases)
