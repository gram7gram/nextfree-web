import request from 'axios'
import parameters from '../../../parameters'
import {FETCH_USER_BEFORE, FETCH_USER_FAILURE, FETCH_USER_SUCCESS} from '../actions'
import flatten from "../../../utils/flatten";

export default (id) => (dispatch, getState) => {

  const state = getState();
  const token = state.App.token

  dispatch({
    type: FETCH_USER_BEFORE
  })

  request.get(parameters.apiHost + `/api/v1/users/${id}`, {
    headers: {
      Authorization: token
    }
  })
    .then(({data}) => {
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: data,
        flatten: flatten(data)
      })
    })
    .catch(e => {
      console.log(e);

      dispatch({
        type: FETCH_USER_FAILURE,
        payload: {
          status: e.response ? e.response.status : 0,
          data: e.response ? e.response.data : null
        }
      })
    })
}
