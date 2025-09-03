import UserTypes "../types/UserTypes";
import Core "../Core";

module {
  type UserType = UserTypes.User;
  type ApiResponse<T> = Core.ApiResponse<T>;

  // CREATE
  public func createUser(
    users : UserTypes.UsersHashMap,
    userId : Core.UserId,
    createUserData : UserTypes.CreateUser,
  ) : ApiResponse<UserType> {
    switch (users.get(userId)) {
      case (?_) { return #err(#AlreadyExists("This user already exists")) };
      case (null) {};
    };

    let userNewData : UserType = {
      userId = userId;
      email = createUserData.email;
      jobTitle = createUserData.jobTitle;
      fullName = createUserData.fullName;
      phoneNumber = null;
      profilePicture = null;
      socialHandle = null;
      location = createUserData.location;
      skillSet = null;
      projects = null;
      professionalSummary = null;
      workExperiences = null;
    };

    users.put(userId, userNewData);
    #ok(userNewData);
  };

  // GET
  public func getUserByPrincipalId(
    users : UserTypes.UsersHashMap,
    userId : Core.UserId,
  ) : ApiResponse<UserType> {
    switch (users.get(userId)) {
      case (null) { #err(#NotFound("User not found")) };
      case (?existing) { #ok(existing) };
    };
  };

  // UPDATE
  public func updateUser(
    users : UserTypes.UsersHashMap,
    userId : Core.UserId,
    updateUserData : UserTypes.UpdateUser,
  ) : ApiResponse<UserType> {
    switch (users.get(userId)) {
      case (null) {
        return #err(#NotFound("User not found, You Need to Create Account"));
      };
      case (?_existing) {
        let newUpdatedUser : UserType = {
          userId = userId;
          email = updateUserData.email;
          jobTitle = updateUserData.jobTitle;
          fullName = updateUserData.fullName;
          phoneNumber = updateUserData.phoneNumber;
          profilePicture = updateUserData.profilePicture;
          socialHandle = updateUserData.socialHandle;
          location = updateUserData.location;
          skillSet = updateUserData.skillSet;
          projects = updateUserData.projects;
          professionalSummary = updateUserData.professionalSummary;
          workExperiences = updateUserData.workExperiences;
        };

        users.put(userId, newUpdatedUser);
        #ok(newUpdatedUser);
      };
    };
  };

  public func updateGeneralUser(
    users : UserTypes.UsersHashMap,
    userId : Core.UserId,
    updateUserData : UserTypes.UpdateGeneralUser,
  ) : ApiResponse<UserType> {
    switch (users.get(userId)) {
      case (null) {
        return #err(#NotFound("User not found, You Need to Create Account"));
      };
      case (?existing) {
        let newUpdatedUser : UserType = {
          existing with
          email = updateUserData.email;
          fullName = updateUserData.fullName;
          jobTitle = updateUserData.jobTitle;
          phoneNumber = updateUserData.phoneNumber;
          profilePicture = updateUserData.profilePicture;
          socialHandle = updateUserData.socialHandle;
          location = updateUserData.location;
          skillSet = updateUserData.skillSet;
        };

        users.put(userId, newUpdatedUser);
        #ok(newUpdatedUser);
      };
    };
  };

  public func updateProfessionalSummaryUser(
    users : UserTypes.UsersHashMap,
    userId : Core.UserId,
    updateUserData : UserTypes.ProfessionalSummary,
  ) : ApiResponse<UserType> {
    switch (users.get(userId)) {
      case (null) {
        return #err(#NotFound("User not found, You Need to Create Account"));
      };
      case (?existing) {
        let newUpdatedUser : UserType = {
          existing with
          professionalSummary = ?updateUserData;
        };

        users.put(userId, newUpdatedUser);
        #ok(newUpdatedUser);
      };
    };
  };

  public func updateWorkExperiencesUser(
    users : UserTypes.UsersHashMap,
    userId : Core.UserId,
    updateUserData : [UserTypes.WorkExperiences],
  ) : ApiResponse<UserType> {
    switch (users.get(userId)) {
      case (null) {
        return #err(#NotFound("User not found, You Need to Create Account"));
      };
      case (?existing) {
        let newUpdatedUser : UserType = {
          existing with
          workExperiences = ?updateUserData;
        };

        users.put(userId, newUpdatedUser);
        #ok(newUpdatedUser);
      };
    };
  };

  public func updatePastProjectUser(
    users : UserTypes.UsersHashMap,
    userId : Core.UserId,
    updateUserData : [UserTypes.Project],
  ) : ApiResponse<UserType> {
    switch (users.get(userId)) {
      case (null) {
        return #err(#NotFound("User not found, You Need to Create Account"));
      };
      case (?existing) {
        let newUpdatedUser : UserType = {
          existing with
          projects = ?updateUserData;
        };

        users.put(userId, newUpdatedUser);
        #ok(newUpdatedUser);
      };
    };
  };
};
