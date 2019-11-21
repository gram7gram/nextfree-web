import request from 'axios'
import parameters from '../../../parameters'
import {FETCH_BEFORE, FETCH_FAILURE, FETCH_SUCCESS} from '../actions'
import flatten from "../../../utils/flatten";

export default () => (dispatch, getState) => {

  const state = getState();
  const token = state.App.token
  let promise

  if (state.App.isOwner) {
    promise = request.get(parameters.apiHost + '/api/v1/owner/profile', {
      headers: {
        Authorization: token
      }
    })
  } else if (state.App.isCustomer) {
    promise = request.get(parameters.apiHost + '/api/v1/customer/profile', {
      headers: {
        Authorization: token
      }
    })
  } else if (state.App.isStaff) {
    promise = request.get(parameters.apiHost + '/api/v1/staff/profile', {
      headers: {
        Authorization: token
      }
    })
  } else {
    return
  }

  dispatch({
    type: FETCH_BEFORE
  })

  promise.then(({data}) => {
    dispatch({
      type: FETCH_SUCCESS,
      payload: data,
      flatten: flatten(data)
    })
  })
    .catch(e => {


      dispatch({
        type: FETCH_FAILURE,
        payload: {
          status: e.response ? e.response.status : 0,
          data: e.response ? e.response.data : null
        }
      })
    })
}
