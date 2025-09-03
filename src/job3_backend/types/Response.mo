import Result "mo:base/Result";

module {
    public type ApiResponse<T> = Result.Result<T, ApiError>;

    public type ApiError = {
        #NotFound : Text;
        #AlreadyExists : Text;
        #InvalidInput : Text;
        #Unauthorized : Text;
        #InternalError : Text;
    };
};
