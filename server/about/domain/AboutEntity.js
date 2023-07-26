class AboutEntity {
    constructor(id, userId, occupation, description, backgroundImageLink, aboutImageLink) {
      this.id = id;
      this.userId = userId;
      this.occupation = occupation;
      this.description = description;
      this.backgroundImageLink = backgroundImageLink;
      this.aboutImageLink = aboutImageLink;
    }
  }
  
  module.exports = AboutEntity;
  