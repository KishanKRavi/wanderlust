class ExpressError extends Error{
    constructor(StatusCode,message){
        super();
        this.status = StatusCode;
        this.message = message;

    }
};

module.exports = ExpressError;
