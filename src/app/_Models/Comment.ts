import { User } from './User';

export class Comment {
  id!: number;
  message!: string;
  user!: User;
  file!: string;
  dateCreated!: string;
}
