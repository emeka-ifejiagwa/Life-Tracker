class UnauthorizedError extends Error{
    constructor(message, status=401){
        super(message)
        this.status = status
    }
}

class BadRequestError extends Error{
    constructor(message, status=400){
        super(message)
        this.status = status
    }
}

module.exports = { UnauthorizedError, BadRequestError}