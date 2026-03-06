import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    setupFiles: "setup-tests",
    globals: true,
    include: ["**/*.test.tsx", "**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["lcov", "text"],
      exclude: [
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/index.ts",
        "**/index.tsx",
        "**/*.d.ts",
        "**/__tests__/**",
      ],
    },
  },
});
