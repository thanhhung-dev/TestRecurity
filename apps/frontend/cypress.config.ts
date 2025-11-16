import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "recruitify",
  e2e: {
    baseUrl: "http://localhost:3000",

    // Viewport size
    viewportWidth: 1980,
    viewportHeight: 1080,

    // Test files
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});