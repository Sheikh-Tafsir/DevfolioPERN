function ContactsEntity(userId, phoneNo, email, facebookLink, instagramLink, githubLink, linkedinLink) {
    this.userId = userId;
    this.phoneNo = phoneNo;
    this.email = email;
    this.facebookLink = facebookLink;
    this.instagramLink = instagramLink;
    this.githubLink = githubLink;
    this.linkedinLink = linkedinLink;
  }
  
  module.exports = ContactsEntity;
  