import { Company } from 'src/app/_Models/Company';

// tslint:disable-next-line: no-namespace
export namespace CompanyMapper {

export function toCompanyViewModel(companyList: Company[]): Company[] {
    return companyList.map((c) => {
      const companies: Company = {
        id: c.id,
        name: c.name,
        URL: c.URL,
        logo: c.logo
      };
      return companies;
    });
  }
}
