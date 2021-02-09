// https://docs.cypress.io/api/introduction/api.html

describe("As Guest", () => {
  it("tries to login", () => {
    cy.visit("/");
    cy.contains("h2", "Log In");

    cy.get(".email-field").type("email@email.com");
    cy.get(".email-field .v-counter").contains("15 / 32");
    cy.get(".password-field").type("11111111");
    cy.get(".password-field .v-counter").contains("8 / 32");

    cy.contains("button.button", "Submit").click();

    cy.contains(".v-alert__content", "Incorrect credentials");

    cy.contains("button.button", "Reset Validation").click();

    cy.get(".v-alert__content").should('not.exist');

    cy.contains("button.button", "Reset Form").click();

    cy.get(".email-field .v-counter").contains("0 / 32");
    cy.get(".password-field .v-counter").contains("0 / 32");
  });
});
