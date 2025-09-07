import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Hash "mo:base/Hash";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

import Core "Core";
import UserTypes "types/UserTypes";
import UserService "services/UserService";
import CompanyTypes "types/CompanyTypes";
import CompanyService "services/CompanyService";
import Handler "Handler";
import JobTypes "types/JobTypes";
import JobService "services/JobService";

persistent actor Job3 {
  // TYPES ==========================================================
  type UserType = UserTypes.User;
  type CompanyType = CompanyTypes.Company;
  type JobType = JobTypes.Job;
  type ApiResponse<T> = Core.ApiResponse<T>;

  // SNAPSHOTS ======================================================
  private var nextJobId : Core.JobId = 0;
  private var userEntries : [(Core.UserId, UserType)] = [];
  private var companyEntries : [(Core.CompanyId, CompanyType)] = [];
  private var jobEntries : [(Core.JobId, JobType)] = [];

  // STATE ==========================================================
  private transient let jobIdHash = func(id : Core.JobId) : Hash.Hash {
    Text.hash(Nat.toText(id));
  };
  private transient var users : UserTypes.UsersHashMap = HashMap.HashMap(8, Principal.equal, Principal.hash);
  private transient var companies : CompanyTypes.CompaniesHashMap = HashMap.HashMap(8, Principal.equal, Principal.hash);
  private transient var jobs : JobTypes.JobsHashMap = HashMap.HashMap(8, Nat.equal, jobIdHash);

  // SYSTEM =========================================================
  system func preupgrade() {
    userEntries := Iter.toArray(users.entries());
    companyEntries := Iter.toArray(companies.entries());
    jobEntries := Iter.toArray(jobs.entries());
  };

  system func postupgrade() {
    users := HashMap.fromIter<Core.UserId, UserType>(userEntries.vals(), 8, Principal.equal, Principal.hash);
    companies := HashMap.fromIter<Core.CompanyId, CompanyType>(companyEntries.vals(), 8, Principal.equal, Principal.hash);
    jobs := HashMap.fromIter<Core.JobId, JobType>(jobEntries.vals(), 8, Nat.equal, jobIdHash);

    userEntries := [];
    companyEntries := [];
    jobEntries := [];
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
  // CREATE
  public shared (msg) func createUser(createUserData : UserTypes.CreateUser) : async ApiResponse<UserType> {
    UserService.createUser(users, companies, msg.caller, createUserData);
  };

  // UPDATE
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

  //  ===============================================================
  // Company ========================================================
  //  ===============================================================
  // CREATE
  public shared (msg) func createCompany(createCompanyData : CompanyTypes.CreateCompany) : async ApiResponse<CompanyType> {
    CompanyService.createCompany(companies, users, msg.caller, createCompanyData);
  };

  // GET
  public query func getCompanyByPrincipalId(companyId : Core.CompanyId) : async ApiResponse<CompanyType> {
    CompanyService.getCompanyByPrincipalId(companies, companyId);
  };

  public query func getAllCompany() : async ApiResponse<[CompanyType]> {
    CompanyService.getAllCompany(companies);
  };

  // UPDATE
  public shared (msg) func updateCompanyGeneral(updateCompanyData : CompanyTypes.UpdateCompanyGeneral) : async ApiResponse<CompanyType> {
    CompanyService.updateCompanyGeneral(companies, msg.caller, updateCompanyData);
  };

  public shared (msg) func updateCompanyOverview(updateCompanyData : CompanyTypes.CompanyOverview) : async ApiResponse<CompanyType> {
    CompanyService.updateCompanyOverview(companies, msg.caller, updateCompanyData);
  };

  public shared (msg) func updateCompanyWhatWeDo(updateCompanyData : ?Text) : async ApiResponse<CompanyType> {
    CompanyService.updateCompanyWhatWeDo(companies, msg.caller, updateCompanyData);
  };

  public shared (msg) func updateCompanyCulture(updateCompanyData : ?Text) : async ApiResponse<CompanyType> {
    CompanyService.updateCompanyCulture(companies, msg.caller, updateCompanyData);
  };

  //  ===============================================================
  // Job ============================================================
  //  ===============================================================
  // CREATE
  public shared (msg) func createJob(createJobData : JobTypes.CreateJob) : async ApiResponse<JobType> {
    let id = nextJobId;
    nextJobId += 1;
    JobService.createJob(companies, users, jobs, id, msg.caller, createJobData);
  };

  // GET
  public query func getAllJob() : async ApiResponse<[JobType]> {
    JobService.getAllJob(jobs);
  };

  public query func getJobById(jobId : Core.JobId) : async ApiResponse<JobType> {
    JobService.getJobById(jobs, jobId);
  };

  public query func getJobsByCompanyId(companyId : Core.CompanyId) : async ApiResponse<[JobType]> {
    JobService.getJobsByCompanyId(jobs, companyId);
  };

  // UPDATE
  public shared (msg) func updateJob(jobId : Core.JobId, updateJobData : JobTypes.CreateJob) : async ApiResponse<JobType> {
    JobService.updateJob(companies, users, jobs, jobId, msg.caller, updateJobData);
  };
};
