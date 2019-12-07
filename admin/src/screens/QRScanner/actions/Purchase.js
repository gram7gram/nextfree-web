import request from 'axios'
import parameters from '../../../parameters'
import {SAVE_BEFORE, SAVE_FAILURE, SAVE_SUCCESS} from '../actions'
import flatten from "../../../utils/flatten";

export default (model) => (dispatch, getState) => {

  const state = getState();
  const token = state.App.token

  let promise

  if (state.App.isStaff) {
    promise = request.post(parameters.apiHost + `/api/v1/staff/users/${model.userId}/purchases`, model, {
      headers: {
        Authorization: token
      }
    })
  } else if (state.App.isOwner) {
    promise = request.post(parameters.apiHost + `/api/v1/owner/users/${model.userId}/purchases`, model, {
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

  promise.then(({data}) => {
    dispatch({
      type: SAVE_SUCCESS,
      payload: data,
      flatten: flatten(data)
    })
  })
    .catch(e => {
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
