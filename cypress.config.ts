import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200', // ✅ Ensure Cypress knows where the Angular app is
    supportFile: false, // ✅ Disable Cypress' default support file
  }
});
