// src/job3_backend/types/JobTypes.mo
import Core "../Core";
import HashMap "mo:base/HashMap";

module JobTypesModule {
  public type JobsHashMap = HashMap.HashMap<Core.JobId, Job>;

  // ======= Core DTO =======
  public type CreateJob = {
    companyId : Core.CompanyId;
    title : Text;
    description : Text;
    jobType : JobType;
    experience : Text;
    arrangement : WorkArrangement;
    payTypes : PayType;
    salary : ?Salary; // opsional (range)
    ecosystems : ?Text; // ICP | Solana | Ethereum
    techStack : [Text]; // Motoko, software
    verified : ?Bool; // “Verified by Job3”
    hiringSpeed : ?HiringSpeed;

    // KOL fields (opsional): kalau bukan KOL job, biarin null/[]
    kolAudience : ?[KOLSize];
    kolPlatforms : ?[Text]; //#x; #youtube; #tiktok; #mirror; #farcaster
  };

  public type Job = {
    jobId : Core.JobId;
    companyId : Core.CompanyId;
    title : Text;
    description : Text;
    jobType : JobType;
    experience : Text;
    arrangement : WorkArrangement;
    payTypes : PayType;
    salary : ?Salary; // opsional (range)
    ecosystems : ?Text; // ICP | Solana | Ethereum
    techStack : [Text]; // Motoko, software
    verified : ?Bool; // “Verified by Job3”
    hiringSpeed : ?HiringSpeed;

    // KOL fields (opsional): kalau bukan KOL job, biarin null/[]
    kolAudience : ?[KOLSize];
    kolPlatforms : ?[Text]; //#x; #youtube; #tiktok; #mirror; #farcaster

    // time
    createdAtNs : Core.Timestamp;
    updatedAtNs : ?Core.Timestamp;
  };

  // Types Support
  public type JobType = { #fullTime; #partTime; #contract; #freelance; #bounty };

  public type WorkArrangement = { #remote; #hybrid; #onsite };

  public type PayType = { #fiat; #crypto; #equity; #combo };

  public type Salary = {
    min : ?Nat;
    max : ?Nat;
    currency : ?Text;
  };

  public type HiringSpeed = { #immediate; #thisWeek; #openToTalks };

  // KOL fields (opsional): kalau bukan KOL job, biarin null/[]
  public type KOLSize = { #micro; #midTier; #macro; #mega };

};
