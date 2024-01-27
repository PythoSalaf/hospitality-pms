import { appRoutes } from "../../src/routes";
import { CORRECT_CREDENTIALS } from "../_constants";

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

    // Perform assertions for the specific content on the dashboard/users page
    cy.contains("h6", "AVAILABLE ROOMS").should("exist");
    cy.contains("h6", "NEW CUSTOMERS").should("exist");
    cy.contains("h6", "ACTIVE ORDERS").should("exist");
    cy.contains("h6", "TOTAL BOOKINGS & RESE ...").should("exist");
  });

  it("The user should be able to toggle sidebar on a mobile view", async () => {
    cy.viewport("iphone-7");
    // TODO: data testid attributes should be refactored as constants and then imported and passed tests from source code
    cy.get('[data-testid="toggleSideBarButton"]').should("exist");

    cy.get('[data-testid="toggleSideBarButton"]').click();

    // The sidebar should be open and its components visiible
    cy.get("div")
      .contains(/switch role/i)
      .should("be.visible");
    cy.get("div")
      .contains(/dashboard/i)
      .should("be.visible");
    cy.get("div")
      .contains(/customers/i)
      .should("be.visible");
    cy.get("div").contains(/users/i).should("be.visible");
    cy.get("div").contains(/staff/i).should("be.visible");
    cy.get("div").contains(/loans/i).should("be.visible");
    cy.get("div")
      .contains(/administrators/i)
      .should("be.visible");
    cy.get("div")
      .contains(/branches/i)
      .should("be.visible");
    cy.get("div").contains(/rooms/i).should("be.visible");
    cy.get("div")
      .contains(/venues/i)
      .should("be.visible");
    // TODO: Populate other fields here, also find a way to pass the details as an array gotten from source code

    cy.get('[data-testid="toggleSideBarCloseBtn"]').should("exist");

    cy.get('[data-testid="toggleSideBarCloseBtn"]').click();
    // The sidebar should be close and its components visiible
    cy.get("div")
      .contains(/switch role/i)
      .should("be.hidden");
  });
});
