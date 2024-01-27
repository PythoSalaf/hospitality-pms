import { appRoutes } from "../../src/routes";
import { CORRECT_CREDENTIALS, WRONG_CREDENTIALS } from "../_constants";

const ERROR_NOTIFICATION_TITLE = "Error";
describe("User Authentication", () => {
  beforeEach(() => {
    cy.viewport("macbook-11");
  });
  it("Unauthenticated user should be redirected to the login page when visiting a page that requires authentication", () => {
    // Visit a route that requires authentication
    cy.visit(appRoutes.dashboard);

    // Check if the URL has changed to the login page
    cy.url().should("include", appRoutes.login);
  });
  it("The login page should contain a form that has an email, password, and an submit button", () => {
    // Visit the login page
    cy.visit(appRoutes.login);

    // Check if there is a form on the page
    cy.get("form").should("exist");

    // Check if there is an email input field in the form
    cy.get('form input[name="email"]').should("exist");

    // Check if there is a password input field in the form
    cy.get('form input[name="password"]').should("exist");

    // Check if there is a submit button in the form
    cy.get('form button[type="submit"]').should("exist");
  });
  it("Should allow the user to submit the login form and show a notification on error when credentials are incorrect", () => {
    const { email, password } = WRONG_CREDENTIALS;
    // Visit the login page
    cy.visit(appRoutes.login);

    // Enter details into the form
    cy.get('form input[name="email"]').type(email);
    cy.get('form input[name="password"]').type(password);

    // Submit the form
    cy.get('form button[type="submit"]').click();

    // Check if a notification appears on error
    cy.contains(ERROR_NOTIFICATION_TITLE).should("exist");
  });
  it("The user should be redirected to the dashboard page if the login process was successful", () => {
    const { email, password } = CORRECT_CREDENTIALS;
    // Visit the login page
    cy.visit(appRoutes.login);

    // Enter details into the form
    cy.get('form input[name="email"]').type(email);
    cy.get('form input[name="password"]').type(password);

    // Submit the form
    cy.get('form button[type="submit"]').click();

    // SHould be redirected to the dashboard
    cy.url().should("include", appRoutes.dashboard);
  });
});
