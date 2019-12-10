import request from 'axios'
import flatten from '../../../utils/flatten'
import parameters from '../../../parameters'
import {SAVE_BEFORE, SAVE_FAILURE, SAVE_SUCCESS} from '../actions'

export default (model) => (dispatch, getState) => {

  const state = getState();
  const token = state.App.token

  dispatch({
    type: SAVE_BEFORE
  })

  request.put(parameters.apiHost + `/api/v1/admin/owners/${model.id}/security`, {
    newPassword: model.password1
  }, {
    headers: {
      Authorization: token
    }
  }).then(({data}) => {
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
