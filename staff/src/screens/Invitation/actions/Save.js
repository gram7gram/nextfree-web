import request from 'axios'
import parameters from '../../../parameters'
import {SAVE_BEFORE, SAVE_FAILURE, SAVE_SUCCESS} from '../actions'
import flatten from "../../../utils/flatten";

const parseBeforeSubmit = model => {
  const data = JSON.parse(JSON.stringify(model))

  delete data.id

  if (data.password1) {
    data.user.password = data.password1
  }

  delete data.password1
  delete data.password2

  delete data.hasAccepted

  return data
}

export default (id, model) => (dispatch) => {

  const data = parseBeforeSubmit(model)

  dispatch({
    type: SAVE_BEFORE
  })

  request.post(parameters.apiHost + `/api/v1/invitation/${id}/accept`, data)
    .then(({data}) => {
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
