import request from 'axios'
import parameters from '../../../parameters'
import {SAVE_BEFORE, SAVE_FAILURE, SAVE_SUCCESS} from '../actions'

const parseBeforeSubmit = model => {
  const data = {...model}

  if (data.owner.password1) {
    data.owner.user.password = data.owner.password1
  }

  delete data.owner.password1
  delete data.owner.password2
  delete data.owner.hasAccepted

  return data
}

export default (model) => (dispatch) => {

  const data = parseBeforeSubmit(model)

  dispatch({
    type: SAVE_BEFORE
  })

  request.post(parameters.apiHost + '/api/v1/owner-register', data)
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
