import request from 'axios'
import parameters from '../../../parameters'
import {LOGIN_BEFORE, LOGIN_FAILURE, LOGIN_SUCCESS} from '../actions'

export default (email, password) => dispatch => {

  dispatch({
    type: LOGIN_BEFORE
  })

  request.post(parameters.apiHost + '/api/v1/login-admin', {email, password})
    .then(({data}) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data
      })
    })
    .catch(e => {
      console.log(e);

      dispatch({
        type: LOGIN_FAILURE,
        payload: {
          status: e.response ? e.response.status : 0,
          data: e.response ? e.response.data : null
        }
      })
    })
}
