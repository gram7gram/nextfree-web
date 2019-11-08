import request from 'axios'
import parameters from '../../../parameters'
import {FETCH_STORES_BEFORE, FETCH_STORES_FAILURE, FETCH_STORES_SUCCESS} from '../actions'

export default () => (dispatch, getState) => {

  const state = getState();
  const token = state.App.token
  const company = state.App.defaultCompany

  if (!company) return

  const query = [
    'limit=0',
  ]

  dispatch({
    type: FETCH_STORES_BEFORE
  })

  request.get(parameters.apiHost + `/api/v1/owner/companies/${company._id}/stores?` + query.join('&'), {
    headers: {
      Authorization: token
    }
  })
    .then(({data}) => {
      dispatch({
        type: FETCH_STORES_SUCCESS,
        payload: data
      })
    })
    .catch(e => {
      if (!e.response) return

      dispatch({
        type: FETCH_STORES_FAILURE,
        payload: {
          status: e.response.status,
          data: e.response.data
        }
      })
    })
}
