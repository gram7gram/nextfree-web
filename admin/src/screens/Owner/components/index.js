import React from 'react';
import {connect} from 'react-redux';
import {FILTER_CHANGED} from '../actions';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import Card from "./Card";
import Filter from "./Filter";

class Owner extends React.Component {

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
    const {items, isLoading} = this.props.Owner

    if (items.length === 0) {
      if (!isLoading)
      return <div className="text-center pt-4">
        <h4>{i18n.t('owner.not_found_title')}</h4>
      </div>
    }

    return <div className="row no-gutters">{items.map(model =>
      <Card model={model} key={model._id}/>
    )}</div>
  }

  render() {

    return <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card my-3">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h3 className="m-0">{i18n.t('owner.title')}</h3>
                </div>
                <div className="col-12 col-md-auto text-right">
                  <Filter/>
                </div>
              </div>
            </div>
            <div className="card-body px-0">
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
  Owner: store => store.Owner,
})

export default connect(selectors)(Owner)
