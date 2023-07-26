class AboutRequest {
    constructor(userId, occupation, description, backgroundImageLink, aboutImageLink) {
      this.userId = userId;
      this.occupation = occupation;
      this.description = description;
      this.backgroundImageLink = backgroundImageLink;
      this.aboutImageLink = aboutImageLink;
    }
  }
  
  module.exports = AboutRequest;
  