import CompanyTypes "../types/CompanyTypes";
import Core "../Core";
import UserTypes "../types/UserTypes";
import Handler "../Handler";
import Iter "mo:base/Iter";
module CompanyServiceModule {

  type CompanyType = CompanyTypes.Company;
  type ApiResponse<T> = Core.ApiResponse<T>;

  // CREATE
  public func createCompany(
    companies : CompanyTypes.CompaniesHashMap,
    users : UserTypes.UsersHashMap,
    companyId : Core.CompanyId,
    createCompanyData : CompanyTypes.CreateCompany,
  ) : ApiResponse<CompanyType> {
    switch (Handler.Handler().isUserAlreadyExists(companyId, users, companies)) {
      case (true) { return #err(#AlreadyExists("This user already exists")) };
      case (false) {};
    };

    let companyNewData : CompanyType = {
      companyId = companyId;
      email = createCompanyData.email;
      companyName = createCompanyData.companyName;
      location = createCompanyData.location;
      website = null;
      companyLogo = null;
      companyAbout = null;
      social = null;
      jobPreferences = null;
    };

    companies.put(companyId, companyNewData);
    #ok(companyNewData);
  };

  // GET
  public func getCompanyByPrincipalId(
    companies : CompanyTypes.CompaniesHashMap,
    companyId : Core.CompanyId,
  ) : ApiResponse<CompanyType> {
    switch (companies.get(companyId)) {
      case (null) { #err(#NotFound("Company not found")) };
      case (?existing) { #ok(existing) };
    };
  };

  public func getAllCompany(
    companies : CompanyTypes.CompaniesHashMap
  ) : ApiResponse<[CompanyType]> {
    #ok(Iter.toArray<CompanyType>(companies.vals()));
  };

  // UPDATE
  public func updateCompanyOverview(
    companies : CompanyTypes.CompaniesHashMap,
    companyId : Core.CompanyId,
    updateCompanyData : CompanyTypes.CompanyOverview,
  ) : ApiResponse<CompanyType> {
    switch (companies.get(companyId)) {
      case (null) {
        return #err(#NotFound("Company not found, You Need to Create Account"));
      };
      case (?existing) {
        let prevAbout : CompanyTypes.CompanyAbout = switch (existing.companyAbout) {
          case (null) {
            {
              industry = null;
              specialties = null;
              companySize = null;
              aboutUs = null;
              whatWeDo = null;
              culture = null;
            };
          };
          case (?a) a;
        };

        let nextAbout : CompanyTypes.CompanyAbout = {
          industry = updateCompanyData.industry; // Web3, NFT, Protocol, dsb
          specialties = updateCompanyData.specialties;
          companySize = updateCompanyData.companySize;
          aboutUs = updateCompanyData.aboutUs;
          whatWeDo = prevAbout.whatWeDo;
          culture = prevAbout.culture;
        };

        let newUpdatedCompany : CompanyType = {
          existing with
          website = updateCompanyData.website;
          location = updateCompanyData.location;
          companyAbout = ?nextAbout;
        };

        companies.put(companyId, newUpdatedCompany);
        #ok(newUpdatedCompany);
      };
    };
  };

  public func updateCompanyWhatWeDo(
    companies : CompanyTypes.CompaniesHashMap,
    companyId : Core.CompanyId,
    updateCompanyData : ?Text,
  ) : ApiResponse<CompanyType> {
    switch (companies.get(companyId)) {
      case (null) {
        return #err(#NotFound("Company not found, You Need to Create Account"));
      };
      case (?existing) {
        let prevAbout : CompanyTypes.CompanyAbout = switch (existing.companyAbout) {
          case (null) {
            {
              industry = null;
              specialties = null;
              companySize = null;
              aboutUs = null;
              whatWeDo = null;
              culture = null;
            };
          };
          case (?a) a;
        };

        let nextAbout : CompanyTypes.CompanyAbout = {
          industry = prevAbout.industry; // Web3, NFT, Protocol, dsb
          specialties = prevAbout.specialties;
          companySize = prevAbout.companySize;
          aboutUs = prevAbout.aboutUs;
          whatWeDo = updateCompanyData;
          culture = prevAbout.culture;
        };

        let newUpdatedCompany : CompanyType = {
          existing with
          companyAbout = ?nextAbout;
        };

        companies.put(companyId, newUpdatedCompany);
        #ok(newUpdatedCompany);
      };
    };
  };

  public func updateCompanyCulture(
    companies : CompanyTypes.CompaniesHashMap,
    companyId : Core.CompanyId,
    updateCompanyData : ?Text,
  ) : ApiResponse<CompanyType> {
    switch (companies.get(companyId)) {
      case (null) {
        return #err(#NotFound("Company not found, You Need to Create Account"));
      };
      case (?existing) {
        let prevAbout : CompanyTypes.CompanyAbout = switch (existing.companyAbout) {
          case (null) {
            {
              industry = null;
              specialties = null;
              companySize = null;
              aboutUs = null;
              whatWeDo = null;
              culture = null;
            };
          };
          case (?a) a;
        };

        let nextAbout : CompanyTypes.CompanyAbout = {
          industry = prevAbout.industry; // Web3, NFT, Protocol, dsb
          specialties = prevAbout.specialties;
          companySize = prevAbout.companySize;
          aboutUs = prevAbout.aboutUs;
          whatWeDo = prevAbout.whatWeDo;
          culture = updateCompanyData;
        };

        let newUpdatedCompany : CompanyType = {
          existing with
          companyAbout = ?nextAbout;
        };

        companies.put(companyId, newUpdatedCompany);
        #ok(newUpdatedCompany);
      };
    };
  };

};
