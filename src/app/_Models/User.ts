export class User {

  public fullName = '';
  public email = '';
  public userName = '';
  public profilePicture = '';
  public role = '';

  constructor(fullName: string, email: string, userName: string, role: string, profilePicture: string) {
    this.fullName = fullName;
    this.email = email;
    this.userName = userName;
    this.role = role;
    this.profilePicture = profilePicture;
  }
}
