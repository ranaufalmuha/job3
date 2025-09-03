import CompanyTypes "../types/CompanyTypes";
import Core "../Core";
module CompanyServiceModule {

  type CompanyType = CompanyTypes.Company;
  type ApiResponse<T> = Core.ApiResponse<T>;

  // CREATE
  public func createCompany(
    companies : CompanyTypes.CompaniesHashMap,
    companyId : Core.CompanyId,
    createCompanyData : CompanyTypes.CreateCompany,
  ) : ApiResponse<CompanyType> {
    switch (companies.get(companyId)) {
      case (?_) { return #err(#AlreadyExists("This user already exists")) };
      case (null) {};
    };

    let companyNewData : CompanyType = {
      companyId = companyId;
      companyName = createCompanyData.companyName;
      email = createCompanyData.email;
      password = createCompanyData.password;
    };

    companies.put(companyId, companyNewData);
    #ok(companyNewData);
  };

};
