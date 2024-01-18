import { describe, it } from "vitest";

describe("useRegisterUser", () => {
  it.todo(
    "Should return an object containing an onSubmit function and a isLoading boolean"
  );
  it.todo("The isLoading boolean should be false by default");
  it.todo(
    "The isLoading boolean should be true when onSubmit is called, and request is still processing"
  );
  it.todo(
    "The isLoading boolean should be false when onSubmit is called, and request has completed"
  );
  it.todo(
    "Should display a notification message when request has completed successfully, informing user that account has been created and to check email to verify account!"
  );
  it.todo(
    "Should display a notification message when request has completed with an error, informing user that the account could not be created, as well as the error message!"
  );
});
