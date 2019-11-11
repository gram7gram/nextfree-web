import request from 'axios'
import parameters from '../../../parameters'
import {SAVE_BEFORE, SAVE_FAILURE, SAVE_SUCCESS} from '../actions'

const parseBeforeSubmit = model => {
  const data = {...model}

  if (data.password1) {
    data.user.password = data.password1
  }

  delete data.password1
  delete data.password2
  delete data.hasAccepted

  return data
}

export default (model) => (dispatch) => {

  const data = parseBeforeSubmit(model)

  dispatch({
    type: SAVE_BEFORE
  })

  request.post(parameters.apiHost + '/api/v1/customer-register', data)
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
