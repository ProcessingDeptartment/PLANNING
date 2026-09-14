import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  preview: {
    functions: {
      "ordersapi": {
        name: "Sales Order Register API",
        source: "./functions/orders-api.ts",
      },
    },
  },
});
