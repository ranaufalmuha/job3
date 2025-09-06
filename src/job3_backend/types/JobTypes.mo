// src/job3_backend/types/JobTypes.mo
import Core "../Core";
import HashMap "mo:base/HashMap";

module JobTypesModule {

  // ======= Master enums (match sidebar) =======
  public type JobType = { #fullTime; #partTime; #contract; #freelance; #bounty };

  public type Category = {
    #development;
    #marketing;
    #community;
    #design;
    #bizdev;
    #legal;
    #content;
  };

  public type ExperienceLevel = { #entry; #intermediate; #senior; #daoWizard };
  public type WorkArrangement = { #remote; #hybrid; #onsite };
  public type PayType = { #fiat; #crypto; #equity; #combo };
  public type Ecosystem = { #icp; #ethereum; #solana; #polkadot; #multichain };
  public type HiringSpeed = { #immediate; #thisWeek; #openToTalks };

  public type KOLSize = { #micro; #midTier; #macro; #mega };

  public type KOLPlatform = { #x; #youtube; #tiktok; #mirror; #farcaster };

  // ======= Core DTO =======
  public type Salary = {
    // gunakan angka kecil (misal USD) atau basis "per-month"
    // kamu bisa perluas ke per-hour/annual jika perlu
    min : ?Nat;
    max : ?Nat;
    currency : ?Text; // "USD", "USDT", "IDR", dll
  };

  public type Location = {
    country : ?Text;
    city : ?Text;
    remoteFirst : ?Bool;
  };

  // Data yang disimpan
  public type Job = {
    jobId : Core.JobId;
    companyId : Core.CompanyId;

    title : Text;
    description : Text;

    jobType : JobType;
    category : Category;
    experience : ExperienceLevel;
    arrangement : WorkArrangement;

    location : Location;
    payTypes : [PayType]; // USD/Crypto/Equity/Combo
    salary : ?Salary; // opsional (range)

    ecosystems : [Ecosystem];
    techStack : [Text];

    verified : ?Bool; // “Verified by Job3”
    featured : ?Bool; // Featured
    hasHiredBefore : ?Bool;

    hiringSpeed : ?HiringSpeed;

    // KOL fields (opsional): kalau bukan KOL job, biarin null/[]
    kolAudience : ?[KOLSize];
    kolPlatforms : ?[KOLPlatform];

    createdAtNs : Nat64;
    updatedAtNs : Nat64;
    isDeleted : Bool;
  };

  // Create & Update
  public type CreateJob = {
    companyId : Core.CompanyId;

    title : Text;
    description : Text;

    jobType : JobType;
    category : Category;
    experience : ExperienceLevel;
    arrangement : WorkArrangement;

    location : ?Location;
    payTypes : ?[PayType];
    salary : ?Salary;

    ecosystems : ?[Ecosystem];
    techStack : ?[Text];

    verified : ?Bool;
    featured : ?Bool;
    hasHiredBefore : ?Bool;

    hiringSpeed : ?HiringSpeed;

    kolAudience : ?[KOLSize];
    kolPlatforms : ?[KOLPlatform];
  };

  // Gunakan `?` di tiap field agar partial update
  public type UpdateJob = {
    title : ?Text;
    description : ?Text;

    jobType : ?JobType;
    category : ?Category;
    experience : ?ExperienceLevel;
    arrangement : ?WorkArrangement;

    location : ?Location;
    payTypes : ?[PayType];
    salary : ?Salary;

    ecosystems : ?[Ecosystem];
    techStack : ?[Text];

    verified : ?Bool;
    featured : ?Bool;
    hasHiredBefore : ?Bool;

    hiringSpeed : ?HiringSpeed;

    kolAudience : ?[KOLSize];
    kolPlatforms : ?[KOLPlatform];

    isDeleted : ?Bool;
  };

  // ======= Filter untuk list/pencarian =======
  public type JobFilters = {
    q : ?Text; // fulltext sederhana pada title/desc/tech
    jobTypes : ?[JobType];
    categories : ?[Category];
    experienceLevels : ?[ExperienceLevel];
    arrangements : ?[WorkArrangement];
    payTypes : ?[PayType];

    // salary (min-max)
    salaryMin : ?Nat;
    salaryMax : ?Nat;
    currency : ?Text;

    ecosystems : ?[Ecosystem];
    techStack : ?[Text];

    hiringSpeeds : ?[HiringSpeed];

    verified : ?Bool;
    featured : ?Bool;
    hasHiredBefore : ?Bool;

    // lokasi
    country : ?Text;
    city : ?Text;
    remoteFirst : ?Bool;

    // KOL
    kolAudiences : ?[KOLSize];
    kolPlatforms : ?[KOLPlatform];

    // pagination/sort
    page : ?Nat;
    pageSize : ?Nat;
    sortNewestFirst : ?Bool;
  };

  public type JobsHashMap = HashMap.HashMap<Core.JobId, Job>;
};
