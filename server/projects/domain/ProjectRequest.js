class ProjectRequest {
    constructor(userId, name, description, technologies, category, liveLink, gitLink, imageLink) {
      this.userId = userId;
      this.name = name;
      this.description = description;
      this.technologies = technologies;
      this.category = category;
      this.liveLink = liveLink;
      this.gitLink = gitLink;
      this.imageLink = imageLink;
    
    }
}
module.exports = ProjectRequest