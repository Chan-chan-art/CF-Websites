// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';


import icon from 'astro-icon';


import react from '@astrojs/react';


// https://astro.build/config
export default defineConfig({
  integrations: [icon(), react()],
  vite: {
    plugins: [tailwindcss()]
  },

  output: 'server',
  site: 'https://yourdomain.com', // Change this to your actual deployed website URL
});