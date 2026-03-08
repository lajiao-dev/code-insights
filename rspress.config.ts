import * as path from 'node:path';
import { defineConfig } from '@rspress/core';
import { pluginLlms } from '@rspress/plugin-llms';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [pluginLlms()],
  base: '/code-insights/', 
  title: '辣椒的 Coding 之旅',
  icon: '/logo.svg',
  logo: {
    light: '/logo.svg',
    dark: '/logo.svg',
  },
  themeConfig: {
    llmsUI: true,
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/web-infra-dev/rspress',
      },
    ],
  },
});
