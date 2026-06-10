// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// `base` is replaced with the Webflow Cloud mount path at deploy time.
export default defineConfig({
  base: 'CLOUD_MOUNT_PATH',
});
