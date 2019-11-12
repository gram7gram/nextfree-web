import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {FILTER_CHANGED} from '../actions';
import * as Pages from '../../../router/Pages';
import i18n from '../../../i18n';
import {createStructuredSelector} from "reselect";
import Card from "./Card";
import Paginator from "../../../components/Paginator";
import Loading from "../../../components/Loading";

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

  renderPagination = () => {
    const {isLoading, page, limit, total} = this.props.Owner

    if (isLoading) return <Loading/>

    return <Paginator
      onChange={this.changePage}
      total={total}
      limit={limit}
      page={page}/>

  }

  renderContent = () => {
    const {items} = this.props.Owner

    if (items.length === 0) {
      return <div className="text-center pt-4">
        <h4>{i18n.t('owner.not_found_title')}</h4>
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
                  <h3 className="m-0">{i18n.t('owner.title')}</h3>
                </div>
                <div className="col-12 col-md-auto text-right">
                  <Link className="btn btn-success btn-sm"
                        to={Pages.OWNER_NEW}>
                    <i className="fa fa-plus"/>&nbsp;{i18n.t('owner.new_action')}
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
              <div className="row my-2">
                <div className="col-auto mx-auto">
                  {this.renderPagination()}
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
