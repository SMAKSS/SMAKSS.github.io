import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src',
  future: {
    v8_viteEnvironmentApi: true,
  },
  ssr: true,
} satisfies Config;
