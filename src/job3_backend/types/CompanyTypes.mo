import Core "../Core";
import HashMap "mo:base/HashMap";

module CompanyTypesModule {

  public type CompaniesHashMap = HashMap.HashMap<Core.CompanyId, Company>;

  //   DTO's
  public type CreateCompany = {
    email : Text;
    companyName : Text;
    password : Text;
  };

  public type Company = {
    companyId : Core.CompanyId;
    companyName : Text;
    email : Text;
    password : Text;
  };
};
