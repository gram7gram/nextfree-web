import request from 'axios'
import parameters from '../../../parameters'
import {SAVE_BEFORE, SAVE_FAILURE, SAVE_SUCCESS} from '../actions'

export default (model) => (dispatch, getState) => {

  const state = getState();
  const token = state.App.token

  dispatch({
    type: SAVE_BEFORE
  })

  request.post(parameters.apiHost + `/api/v1/owner/users/${model.userId}/purchases`, null, {
    headers: {
      Authorization: token
    }
  })
    .then(({data}) => {
      dispatch({
        type: SAVE_SUCCESS,
        payload: data
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
