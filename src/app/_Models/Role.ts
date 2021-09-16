export class Role {

  public role = '';
  public isSelected = false;

  constructor(role: string, isSelected: boolean = false){
    this.role = role;
    this.isSelected = isSelected;
  }
}
