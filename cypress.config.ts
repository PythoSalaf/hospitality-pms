// import { defineConfig } from "cypress";
const { defineConfig } = require("cypress");

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});
