import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Core "../Core";

module {
  public type UsersHashMap = HashMap.HashMap<Core.UserId, User>;

  //   DTO's
  public type CreateUser = {
    email : Text;
    fullName : Text;
    location : Text;
    jobTitle : Text;
  };

  public type UpdateGeneralUser = {
    email : Text;
    fullName : Text;
    jobTitle : Text;
    phoneNumber : ?Text;
    profilePicture : ?Text;
    socialHandle : ?SocialHandle;
    location : Text;
    skillSet : ?SkillSet;
  };

  public type UpdateUser = {
    email : Text;
    fullName : Text;
    jobTitle : Text;
    phoneNumber : ?Text;
    profilePicture : ?Text;
    socialHandle : ?SocialHandle;
    location : Text;
    skillSet : ?SkillSet;
    projects : ?[Project];
    professionalSummary : ?ProfessionalSummary;
    workExperiences : ?[WorkExperiences];
  };

  public type User = {
    userId : Core.UserId;
    email : Text;
    fullName : Text;
    jobTitle : Text;
    phoneNumber : ?Text;
    profilePicture : ?Text;
    socialHandle : ?SocialHandle;
    location : Text;
    skillSet : ?SkillSet;
    projects : ?[Project];
    professionalSummary : ?ProfessionalSummary;
    workExperiences : ?[WorkExperiences];
  };

  type SocialHandle = {
    discord : ?Text;
    telegram : ?Text;
    personalWebsites : ?[Text];
  };

  type SkillSet = {
    primaryRole : ?[Text];
    yearsOfExperience : ?Text;
    techStack : ?[Text];
    languageSpoken : ?[Text];
  };

  // Portfolio
  public type Project = {
    title : Text;
    role : [Text];
    link : Text;
    shortDescription : Text;
  };

  public type ProfessionalSummary = {
    bio : Text;
    careerObjective : ?Text;
    resumeOrCV : ?Text;
  };

  public type WorkExperiences = {
    company : ?Core.CompanyId;
    companyNamePlain : ?Text;
    jobTitle : Text;
    startDate : Core.Timestamp;
    endDate : Core.Timestamp;
    responsibilities : Text;
    contributions : Text;
  };
};
