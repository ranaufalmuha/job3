import Core "../Core";
import UserTypes "../types/UserTypes";
import Handler "../Handler";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import JobTypes "../types/JobTypes";
import CompanyTypes "../types/CompanyTypes";

module JobServiceModule {

  type JobType = JobTypes.Job;
  type ApiResponse<T> = Core.ApiResponse<T>;

  // CREATE
  public func createJob(
    companies : CompanyTypes.CompaniesHashMap,
    users : UserTypes.UsersHashMap,
    jobs : JobTypes.JobsHashMap,
    jobId : Core.JobId,
    companyId : Core.CompanyId,
    createJobData : JobTypes.CreateJob,
  ) : ApiResponse<JobType> {
    switch (Handler.Handler().getAccountType(companyId, users, companies)) {
      case (#user or #none) {
        return #err(#Unauthorized("This Account is not Company Account"));
      };
      case (#company) {};
    };

    let jobNewData : JobType = {
      jobId = jobId;
      companyId = createJobData.companyId;
      title = createJobData.title;
      description = createJobData.description;
      jobType = createJobData.jobType;
      experience = createJobData.experience;
      arrangement = createJobData.arrangement;
      payTypes = createJobData.payTypes;
      salary = createJobData.salary; // opsional (range)
      ecosystems = createJobData.ecosystems; // ICP | Solana | Ethereum
      techStack = createJobData.techStack;
      verified = createJobData.verified; // “Verified by Job3”
      hiringSpeed = createJobData.hiringSpeed;
      kolAudience = createJobData.kolAudience;
      kolPlatforms = createJobData.kolPlatforms;
      createdAtNs = Time.now();
      updatedAtNs = null;
    };

    jobs.put(jobId, jobNewData);
    #ok(jobNewData);
  };

  // GET
  public func getAllJob(
    jobs : JobTypes.JobsHashMap
  ) : ApiResponse<[JobType]> {
    #ok(Iter.toArray<JobType>(jobs.vals()));
  };

  public func getJobById(
    jobs : JobTypes.JobsHashMap,
    jobId : Core.JobId,
  ) : ApiResponse<JobType> {
    switch (jobs.get(jobId)) {
      case (null) { #err(#NotFound("Company not found")) };
      case (?existing) { #ok(existing) };
    };
  };

  public func getJobsByCompanyId(
    jobs : JobTypes.JobsHashMap,
    companyId : Core.CompanyId,
  ) : ApiResponse<[JobType]> {
    let it = Iter.filter<JobType>(
      jobs.vals(),
      func(j : JobType) : Bool { j.companyId == companyId },
    );
    #ok(Iter.toArray<JobType>(it));
  };

  // UPDATE
  public func updateJob(
    companies : CompanyTypes.CompaniesHashMap,
    users : UserTypes.UsersHashMap,
    jobs : JobTypes.JobsHashMap,
    jobId : Core.JobId,
    companyId : Core.CompanyId,
    updateJobData : JobTypes.CreateJob,
  ) : ApiResponse<JobType> {
    switch (Handler.Handler().getAccountType(companyId, users, companies)) {
      case (#user or #none) {
        return #err(#Unauthorized("This Account is not Company Account"));
      };
      case (#company) {
        switch (jobs.get(jobId)) {
          case (null) {
            return #err(#NotFound("Job not found"));
          };
          case (?existing) {
            let jobUpdateData : JobType = {
              existing with
              companyId = updateJobData.companyId;
              title = updateJobData.title;
              description = updateJobData.description;
              jobType = updateJobData.jobType;
              experience = updateJobData.experience;
              arrangement = updateJobData.arrangement;
              payTypes = updateJobData.payTypes;
              salary = updateJobData.salary; // opsional (range)
              ecosystems = updateJobData.ecosystems; // ICP | Solana | Ethereum
              techStack = updateJobData.techStack;
              verified = updateJobData.verified; // “Verified by Job3”
              hiringSpeed = updateJobData.hiringSpeed;
              kolAudience = updateJobData.kolAudience;
              kolPlatforms = updateJobData.kolPlatforms;
              updatedAtNs = ?Time.now();
            };

            jobs.put(jobId, jobUpdateData);
            #ok(jobUpdateData);
          };
        };
      };
    };

  };
};
