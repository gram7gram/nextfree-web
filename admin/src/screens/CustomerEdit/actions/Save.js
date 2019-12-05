import request from 'axios'
import flatten from '../../../utils/flatten'
import parameters from '../../../parameters'
import {SAVE_BEFORE, SAVE_FAILURE, SAVE_SUCCESS} from '../actions'

const parseBeforeSubmit = model => {
  const data = JSON.parse(JSON.stringify(model))

  delete data.id

  if (data.password1) {
    data.user.password = data.password1
  }

  delete data.password1
  delete data.password2

  return data
}

export default (model) => (dispatch, getState) => {

  const state = getState();
  const token = state.App.token

  const data = parseBeforeSubmit(model)

  dispatch({
    type: SAVE_BEFORE
  })

  let promise

  if (model.id) {
    promise = request.put(parameters.apiHost + `/api/v1/admin/customers/${model.id}`, data, {
      headers: {
        Authorization: token
      }
    })
  } else {
    promise = request.post(parameters.apiHost + `/api/v1/admin/customers`, data, {
      headers: {
        Authorization: token
      }
    })
  }

  promise.then(({data}) => {
    dispatch({
      type: SAVE_SUCCESS,
      payload: data,
      flatten: flatten(data),
    })
  }).catch(e => {
    console.log(e);



    dispatch({
      type: SAVE_FAILURE,
      payload: {
        status: e.response ? e.response.status : 0,
        data: e.response ? e.response.data : null
      }
    })
  })
}
