import { appRoutes } from "../../src/routes";
import { CORRECT_CREDENTIALS, USERS_API_URL } from "../_constants";

// TODO: ENsure cypress tests uses absolute imports

describe("User Dashboard", () => {
  const { email, password } = CORRECT_CREDENTIALS;

  beforeEach(() => {
    cy.viewport("macbook-11");
    // login to app
    cy.visit(appRoutes.login);
    // Enter details into the form
    cy.get('form input[name="email"]').type(email);
    cy.get('form input[name="password"]').type(password);
    // Submit the form
    cy.get('form button[type="submit"]').click();
  });

  it("The authenticated user should be redirected to the dashboard page when trying to access the login page", () => {
    cy.url().should("include", appRoutes.dashboard);

    // Visit the login page
    cy.visit(appRoutes.login, { failOnStatusCode: false });
    cy.url().should("include", appRoutes.dashboard);
    cy.contains("Dashboard").should("exist");
  });

  it("Should navigate user to the dashboard page after successful login", () => {
    // Verify if the dashboard page is displayed after login
    cy.url().should("include", appRoutes.dashboard);

    cy.contains("Dashboard").should("exist");
  });

  it("Should contain 4 user analytic cards and a table with user columns", () => {
    cy.url().should("include", appRoutes.dashboard);
    cy.contains("Dashboard").should("exist");
    cy.intercept("GET", USERS_API_URL, { fixture: "users.json" }).as("apiCall");
    cy.wait("@apiCall");

    // Perform assertions for the specific content on the dashboard/users page
    cy.contains("h6", "Users").should("exist");
    cy.contains("h6", "Active Users").should("exist");
    cy.contains("h6", "Users with loans").should("exist");
    cy.contains("h6", "Users with savings").should("exist");
    cy.get("table").should("exist");
    cy.get("table th").then(($headers) => {
      // Now $headers contains all the table header elements
      // You can perform assertions or actions on the headers
      // For example, checking the number of headers
      expect($headers).to.have.length(7); // Adjust the length based on your table structure
    });
    cy.get("table th")
      .contains(/organization/i)
      .should("exist");
    cy.get("table th")
      .contains(/username/i)
      .should("exist");
    cy.get("table th").contains(/email/i).should("exist");
    cy.get("table th")
      .contains(/phone number/i)
      .should("exist");
    cy.get("table th")
      .contains(/date joined/i)
      .should("exist");
    cy.get("table th")
      .contains(/Status/i)
      .should("exist");
  });

  it("The user should be able to toggle sidebar on a mobile view", async () => {
    cy.viewport("iphone-7");
    // TODO: data testid attributes should be refactored as constants and then imported and passed tests from source code
    cy.get('[data-testid="toggleSideBarButton"]').should("exist");

    cy.get('[data-testid="toggleSideBarButton"]').click();

    // The sidebar should be open and its components visiible
    cy.get("div")
      .contains(/switch organization/i)
      .should("be.visible");
    cy.get("div")
      .contains(/dashboard/i)
      .should("be.visible");
    cy.get("div")
      .contains(/customers/i)
      .should("be.visible");
    cy.get("div").contains(/users/i).should("be.visible");
    cy.get("div")
      .contains(/guarantors/i)
      .should("be.visible");
    cy.get("div").contains(/loans/i).should("be.visible");
    cy.get("div")
      .contains(/decision models/i)
      .should("be.visible");
    cy.get("div")
      .contains(/savings/i)
      .should("be.visible");
    cy.get("div")
      .contains(/loan requests/i)
      .should("be.visible");
    cy.get("div")
      .contains(/whitelist/i)
      .should("be.visible");
    // TODO: Populate other fields here, also find a way to pass the details as an array gotten from source code

    cy.get('[data-testid="toggleSideBarCloseBtn"]').should("exist");

    cy.get('[data-testid="toggleSideBarCloseBtn"]').click();
    // The sidebar should be close and its components visiible
    cy.get("div")
      .contains(/switch organization/i)
      .should("be.hidden");
  });

  // TODO: Flesh out filter user tests and pagination when time permits
  // it("The user should be able to filter users by clicking on the filter button and applying a filter", async () => {
  //   // Check if at least one button exists in the table header
  //   cy.get("table th button").should("exist");

  //   // Click the first instance of the button within a table header
  //   cy.get("table th button").first().click({ force: true });

  //   // Check if the filter user form appears
  //   // cy.get("dialog form").should("be.visible");

  //   // You can add more logic here to interact with the filter form and apply filters
  // });
});
