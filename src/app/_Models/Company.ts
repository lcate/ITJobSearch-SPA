import { User } from './User';

export class Company {
  id!: number;
  name!: string;
  webURL!: string;
  user!: User;
  employeesTo!: number;
  employeesFrom!: number;
  yearFounded!: number;
  locations!: string;
}
