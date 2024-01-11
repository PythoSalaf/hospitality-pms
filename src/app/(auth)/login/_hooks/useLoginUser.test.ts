import { describe, expect, it } from "vitest";
import { render, screen } from "~~/lib/test";
import { appRoutes } from "~~/routes";

describe("useLoginUser", () => {
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
    "Should display a notification message when request has completed successfully, informing user of successful login!"
  );
  it.todo(
    "Should display a notification message when request has completed with an error, informing user of the error encountered!"
  );
});
