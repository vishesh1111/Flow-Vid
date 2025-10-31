
// promises based Error Handling
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).
    catch((error) => next(error))
}
}


export default asyncHandler;



/* syntax Below:-
const asyncHandler = () => {}
const asyncHandler = (fn) => () => {}
const asyncHandler = (fn) => async () => {}


// using higher order Func = can be used as parameter and treated as variable
const asyncHandler = (fn) => async (req, res,next) => {
    try {
        await fn(req, res, next);
}
catch (error) {
    res.status(error.code || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
    });
}
}
*/ 
