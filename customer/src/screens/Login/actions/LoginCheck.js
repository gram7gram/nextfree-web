import request from 'axios'
import parameters from '../../../parameters'
import {LOGIN_CHECK_BEFORE, LOGIN_CHECK_FAILURE, LOGIN_CHECK_SUCCESS} from '../actions'

export default (content) => dispatch => {

  dispatch({
    type: LOGIN_CHECK_BEFORE
  })

  request.post(parameters.apiHost + '/api/v1/login-check-customer', null, {
    headers: {
      Authorization: content.token
    }
  })
    .then(({data}) => {
      dispatch({
        type: LOGIN_CHECK_SUCCESS,
        payload: data
      })
    })
    .catch(e => {
      console.log(e);

      if (!e.response) return

      dispatch({
        type: LOGIN_CHECK_FAILURE,
        payload: {
          status: e.response.status,
          data: e.response.data
        }
      })
    })
}
