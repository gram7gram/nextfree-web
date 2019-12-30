import request from 'axios'
import parameters from '../../../parameters'
import {SAVE_SUCCESS} from '../actions'

export default (data) => (dispatch, getState) => {

  const state = getState();
  const token = state.App.token

  request.post(parameters.apiHost + '/api/v1/owner/profile', data, {
    headers: {
      Authorization: token
    }
  })
    .then(({data}) => {
      dispatch({
        type: SAVE_SUCCESS,
        payload: data,
      })
    })
    .catch(e => {
      console.log(e);
    })
}
