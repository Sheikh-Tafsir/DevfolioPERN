class UserEntity {
    constructor(name, email, about, service, projects, contacts) {
    //   this.id = id;
      this.name = name;
      this.email = email;
    //   this.password = password;
      this.about = about;
      this.service = service;
      this.projects = projects;
      this.contacts = contacts;
    }
  }

  module.exports = UserEntity;