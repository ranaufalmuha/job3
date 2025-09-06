import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
import Core "Core";
import UserTypes "types/UserTypes";
import CompanyTypes "types/CompanyTypes";

module HandlerModule {
  public class Handler() {

    type ApiResponse<T> = Core.ApiResponse<T>;

    public func isUserAlreadyExists(userId : Principal, users : UserTypes.UsersHashMap, companies : CompanyTypes.CompaniesHashMap) : Bool {
      switch (users.get(userId)) {
        case (?_) { return true };
        case (null) {
          switch (companies.get(userId)) {
            case (?_) { return true };
            case (null) { return false };
          };
        };
      };
    };

    public func getAccountType(userId : Principal, users : UserTypes.UsersHashMap, companies : CompanyTypes.CompaniesHashMap) : {
      #none;
      #user;
      #company;
    } {
      switch (users.get(userId)) {
        case (?_) { return #user };
        case (null) {
          switch (companies.get(userId)) {
            case (?_) { return #company };
            case (null) { return #none };
          };
        };
      };
    };
  };

};
