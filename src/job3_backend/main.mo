import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";

import Core "Core";
import UserTypes "types/UserTypes";
import UserService "services/UserService";
import CompanyTypes "types/CompanyTypes";
import CompanyService "services/CompanyService";
import Handler "Handler";

persistent actor Job3 {
  // TYPES ==========================================================
  type UserType = UserTypes.User;
  type CompanyType = CompanyTypes.Company;
  type ApiResponse<T> = Core.ApiResponse<T>;

  // SNAPSHOTS ======================================================
  private var userEntries : [(Core.UserId, UserType)] = [];
  private var companyEntries : [(Core.CompanyId, CompanyType)] = [];

  // STATE ==========================================================
  private transient var users : UserTypes.UsersHashMap = HashMap.HashMap(8, Principal.equal, Principal.hash);
  private transient var companies : CompanyTypes.CompaniesHashMap = HashMap.HashMap(8, Principal.equal, Principal.hash);

  // SYSTEM =========================================================
  system func preupgrade() {
    userEntries := Iter.toArray(users.entries());
    companyEntries := Iter.toArray(companies.entries());
  };

  system func postupgrade() {
    users := HashMap.fromIter<Core.UserId, UserType>(userEntries.vals(), 8, Principal.equal, Principal.hash);
    companies := HashMap.fromIter<Core.CompanyId, CompanyType>(companyEntries.vals(), 8, Principal.equal, Principal.hash);

    userEntries := [];
    companyEntries := [];
  };

  //  ===============================================================
  // General ========================================================
  //  ===============================================================
  public shared (msg) func getAccountType() : async { #none; #user; #company } {
    Handler.Handler().getAccountType(msg.caller, users, companies);
  };

  //  ===============================================================
  // User ===========================================================
  //  ===============================================================
  // create
  public shared (msg) func createUser(createUserData : UserTypes.CreateUser) : async ApiResponse<UserType> {
    UserService.createUser(users, companies, msg.caller, createUserData);
  };

  // update
  public shared (msg) func updateUser(updateUserData : UserTypes.UpdateUser) : async ApiResponse<UserType> {
    UserService.updateUser(users, msg.caller, updateUserData);
  };

  public shared (msg) func updateGeneralUser(updateUserData : UserTypes.UpdateGeneralUser) : async ApiResponse<UserType> {
    UserService.updateGeneralUser(users, msg.caller, updateUserData);
  };

  public shared (msg) func updateProfessionalSummaryUser(updateUserData : UserTypes.ProfessionalSummary) : async ApiResponse<UserType> {
    UserService.updateProfessionalSummaryUser(users, msg.caller, updateUserData);
  };

  public shared (msg) func updateWorkExperiencesUser(updateUserData : [UserTypes.WorkExperiences]) : async ApiResponse<UserType> {
    UserService.updateWorkExperiencesUser(users, msg.caller, updateUserData);
  };

  public shared (msg) func updatePastProjectUser(updateUserData : [UserTypes.Project]) : async ApiResponse<UserType> {
    UserService.updatePastProjectUser(users, msg.caller, updateUserData);
  };

  // get
  public query func getUserByPrincipalId(userId : Core.UserId) : async ApiResponse<UserType> {
    UserService.getUserByPrincipalId(users, userId);
  };

  // public shared (msg) func getUserData() : async ApiResponse<UserType> {
  //   UserService.getUserByPrincipalId(users, msg.caller);
  // };

  //  ===============================================================
  // Company ===========================================================
  //  ===============================================================
  // create
  public shared (msg) func createCompany(createCompanyData : CompanyTypes.CreateCompany) : async ApiResponse<CompanyType> {
    CompanyService.createCompany(companies, users, msg.caller, createCompanyData);
  };

  // GET
  public query func getCompanyByPrincipalId(companyId : Core.CompanyId) : async ApiResponse<CompanyType> {
    CompanyService.getCompanyByPrincipalId(companies, companyId);
  };

  // UPDATE
  public shared (msg) func updateCompanyOverview(updateCompanyData : CompanyTypes.CompanyOverview) : async ApiResponse<CompanyType> {
    CompanyService.updateCompanyOverview(companies, msg.caller, updateCompanyData);
  };

  public shared (msg) func updateCompanyWhatWeDo(updateCompanyData : ?Text) : async ApiResponse<CompanyType> {
    CompanyService.updateCompanyWhatWeDo(companies, msg.caller, updateCompanyData);
  };

  public shared (msg) func updateCompanyCulture(updateCompanyData : ?Text) : async ApiResponse<CompanyType> {
    CompanyService.updateCompanyCulture(companies, msg.caller, updateCompanyData);
  };
};
