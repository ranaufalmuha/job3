import Core "../Core";
import HashMap "mo:base/HashMap";

module CompanyTypesModule {

  public type CompaniesHashMap = HashMap.HashMap<Core.CompanyId, Company>;

  //   DTO's
  public type CreateCompany = {
    email : Text;
    companyName : Text;
    location : Text;
  };

  public type Company = {
    companyId : Core.CompanyId;
    email : Text;
    companyName : Text;
    industry : ?Text; // Web3, NFT, Protocol, dsb
    location : Text;
    website : ?Text;
    companyLogo : ?Text;

    aboutUs : ?Text;
    whatWeDo : ?Text;
    culture : ?Text;

    social : ?SocialLinks;
    jobPreferences : ?[JobPreference];
  };

  public type SocialLinks = {
    linkedIn : ?Text;
    twitter : ?Text;
    telegram : ?Text;
    discord : ?Text;
    github : ?Text;
    bitbucket : ?Text;
    other : ?Text;
  };

  public type JobPreference = {
    jobTypes : Text; // contoh: ["Full-Time", "Part-Time", "Freelance"]
    requiredSkills : [Text]; // contoh: ["Solidity", "Rust", "ICP Motoko"]
    salaryRange : ?Text; // opsional, misal "3000–5000 USDT/month"
  };
};
