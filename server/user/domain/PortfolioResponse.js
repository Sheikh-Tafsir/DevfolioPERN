const UserEntity = require("../domain/UserEntity");
class PortfolioResponse {
    constructor(responseMessage, userEntity) {
      this.responseMessage = responseMessage;
      this.userEntity = userEntity;
    }
  }
  
  module.exports = PortfolioResponse;
  