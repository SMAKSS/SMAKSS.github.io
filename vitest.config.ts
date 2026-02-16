import { defineConfig } from 'vitest/config';

/**
 * Vitest configuration for unit and service tests.
 */
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
});
