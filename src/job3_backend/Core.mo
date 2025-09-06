import Result "mo:base/Result";
import Time "mo:base/Time";
module {
  public type UserId = Principal;
  public type CompanyId = Principal;
  public type JobId = Nat;
  public type Timestamp = Time.Time;

  // For uniform error handling
  public type ApiResponse<T> = Result.Result<T, ApiError>;
  public type ApiError = {
    #NotFound : Text;
    #AlreadyExists : Text;
    #InvalidInput : Text;
    #StorageError : Text;
    #Unauthorized : Text;
    #InternalError : Text;
    #ValidationError : Text;
    #NotAuthorized : Text;
  };
};
