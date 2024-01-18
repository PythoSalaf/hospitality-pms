import { appRoutes } from "../../src/routes";
import {
  CORRECT_CREDENTIALS,
  PENDING_USER_ID,
  USERS_API_URL,
} from "../_constants";

describe("User Details", () => {
  const { email, password } = CORRECT_CREDENTIALS;

  beforeEach(() => {
    cy.viewport("macbook-11");
    cy.visit(appRoutes.login);
    // Enter details into the form
    cy.get('form input[name="email"]').type(email);
    cy.get('form input[name="password"]').type(password);
    // Submit the form
    cy.get('form button[type="submit"]').click();
  });
  it("Should be able to blacklist a user that is not already blacklisted on the user detail page", () => {
    // Visit user details page
    cy.visit(`${appRoutes.customerUsers}/${PENDING_USER_ID}`, {
      failOnStatusCode: false,
    });
    cy.intercept("GET", USERS_API_URL, { fixture: "users.json" }).as("apiCall");
    cy.wait("@apiCall");
    const blacklistBtn = cy.get("button").contains(/blacklist/i);
    blacklistBtn.click();
    const dialog = cy.get("div[role=alertdialog]");
    dialog.should("be.visible");
    dialog
      .get("button")
      .contains(/cancel/i)
      .should("exist");

    cy.window().its("localStorage.users").should("exist");
    const proceedBtn = dialog.get("button").contains(/proceed/i);

    proceedBtn.click();
    cy.get("div[role=alertdialog]").should("not.exist");
    cy.get("button")
      .contains(/blacklist/i)
      .should("be.disabled");
  });
  it("Should be able to activate a user that is not already activated on the user detail page", () => {
    // Visit user details page
    cy.visit(`${appRoutes.customerUsers}/${PENDING_USER_ID}`, {
      failOnStatusCode: false,
    });
    cy.intercept("GET", USERS_API_URL, { fixture: "users.json" }).as("apiCall");
    cy.wait("@apiCall");
    const activateBtn = cy.get("button").contains(/activate/i);
    activateBtn.click();
    const dialog = cy.get("div[role=alertdialog]");
    dialog.should("be.visible");
    dialog
      .get("button")
      .contains(/cancel/i)
      .should("exist");

    cy.window().its("localStorage.users").should("exist");
    const proceedBtn = dialog.get("button").contains(/proceed/i);

    proceedBtn.click();
    cy.get("div[role=alertdialog]").should("not.exist");
    cy.get("button")
      .contains(/activate/i)
      .should("be.disabled");
  });
});
