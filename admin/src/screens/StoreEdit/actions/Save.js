import request from 'axios'
import flatten from '../../../utils/flatten'
import parameters from '../../../parameters'
import {SAVE_BEFORE, SAVE_FAILURE, SAVE_SUCCESS} from '../actions'

const parseBeforeSubmit = model => {
  const data = {...model}

  delete data.id

  return data
}

export default (model) => (dispatch, getState) => {

  const state = getState();
  const token = state.App.token

  const data = parseBeforeSubmit(model)

  let promise

  if (model.id) {
    promise = request.put(parameters.apiHost + `/api/v1/admin/stores/${model.id}`, data, {
      headers: {
        Authorization: token
      }
    })
  } else {
    promise = request.post(parameters.apiHost + `/api/v1/admin/stores`, data, {
      headers: {
        Authorization: token
      }
    })
  }

  dispatch({
    type: SAVE_BEFORE
  })

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
