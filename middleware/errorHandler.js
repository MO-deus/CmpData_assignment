
const {constants} = require("../contstants")

const ErrHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title : "Validation error",
                message : err.message,
                stackTrace : err.stackTrace
            });
            
            break;

        case constants.UNAUTHORIZED:
            res.json({
                title : "Unauthorized access",
                message : err.message,
                stackTrace : err.stackTrace
            });

             break;
    
        case constants.FORBIDDEN:
           res.json({
               title : "Forbidden",
               message : err.message,
               stackTrace : err.stackTrace
           });
           
           break;

        case constants.NOT_FOUND:
             res.json({
                 title : "Not found ",
                 message : err.message,
                 stackTrace : err.stackTrace
             });
            
            break;

        case constants.SERVER_ERROR:
            res.json({
                title : "Server error",
                message : err.message,
                stackTrace : err.stackTrace
            });
            
            break;
        default:    console.log("No errors found :) ");
        
            break;
    }


    res.json({title:"Not found" , message : err.message, stackTrace: err.stack})

    res.json({title:"Validation failed" , message : err.message, stackTrace: err.stack})

}

module.exports = ErrHandler;