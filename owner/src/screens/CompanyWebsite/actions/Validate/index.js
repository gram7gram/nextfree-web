import validate from './Action'
import {VALIDATE_WEBSITE_SUCCESS, VALIDATE_WEBSITE_FAILURE} from '../../actions'

export default (model, changes) => {
    const validator = validate(model, changes)

    if (validator.total === 0) {
        return {
            type: VALIDATE_WEBSITE_SUCCESS
        }
    } else {
        return {
            type: VALIDATE_WEBSITE_FAILURE,
            payload: validator
        }
    }
}