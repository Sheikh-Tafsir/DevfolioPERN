const ApiResponse = require('./ApiResponse');

class ResponseUtil {
    static createResponse(message, data) {
        //console.log(status +" "+ message +" "+ data);
        const apiResponse = new ApiResponse(message, data);
        return {
          message: message,
          data: data,
          
        };
    }
}
  
module.exports = ResponseUtil;

  