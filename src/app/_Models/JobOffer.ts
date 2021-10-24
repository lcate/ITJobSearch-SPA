import { Company } from "./Company";

export class JobOffer {
  id!: number;
  position!: string;
  experience!: string;
  workType!: string;
  description!: string;
  salary!: any;
  workHours!: string;
  companyId!: number;
  company!: Company;
}

