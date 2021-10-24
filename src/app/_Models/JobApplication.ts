import { JobOffer } from "./JobOffer";
import { User } from "./User";

export class JobApplication {
  id!: number;
  status!: number;
  userId!: string;
  jobOfferId!: number;
  imgPath!: string;
  jobOffer!: JobOffer;
  user!: User;
}
