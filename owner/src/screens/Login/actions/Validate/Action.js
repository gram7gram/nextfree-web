export default model => {

    const validator = {
        total: 0,
        errors: []
    }

    if (!model.email) {
        ++validator.total
    }

    if (!model.password) {
        ++validator.total
    }

    return validator
}
