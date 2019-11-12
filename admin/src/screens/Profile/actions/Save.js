import request from 'axios'
import parameters from '../../../parameters'
import {SAVE_BEFORE, SAVE_FAILURE, SAVE_SUCCESS} from '../actions'
import flatten from "../../../utils/flatten";

const parseBeforeSubmit = model => {
  const data = {...model}

  delete data.id

  if (data.password1) {
    data.password = data.password1
  }

  delete data.password1
  delete data.password2

  return data
}

export default (model) => (dispatch, getState) => {

  const state = getState();
  const token = state.App.token

  const data = parseBeforeSubmit(model)

  let promise

  if (state.App.isOwner) {
    promise = request.post(parameters.apiHost + '/api/v1/owner/profile', data, {
      headers: {
        Authorization: token
      }
    })
  } else if (state.App.isCustomer) {
    promise = request.post(parameters.apiHost + '/api/v1/customer/profile', data, {
      headers: {
        Authorization: token
      }
    })
  } else if (state.App.isStaff) {
    promise = request.post(parameters.apiHost + '/api/v1/staff/profile', data, {
      headers: {
        Authorization: token
      }
    })
  } else {
    return
  }

  dispatch({
    type: SAVE_BEFORE
  })

  promise
    .then(({data}) => {
      dispatch({
        type: SAVE_SUCCESS,
        payload: data,
        flatten: flatten(data)
      })
    })
    .catch(e => {
      console.log(e);

      if (!e.response) return

      dispatch({
        type: SAVE_FAILURE,
        payload: {
          status: e.response.status,
          data: e.response.data
        }
      })
    })
}
