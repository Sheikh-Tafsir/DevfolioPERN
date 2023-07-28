function ContactsEntity(id, userId, phoneNo, email, facebookLink, instagramLink, githubLink, linkedinLink) {
    this.id = id; // You might use a unique ID generator in your application
    this.userId = userId;
    this.phoneNo = phoneNo;
    this.email = email;
    this.facebookLink = facebookLink;
    this.instagramLink = instagramLink;
    this.githubLink = githubLink;
    this.linkedinLink = linkedinLink;
  }
  
  module.exports = ContactsEntity;
  