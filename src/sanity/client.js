import { createClient } from '@sanity/client';

const config = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: '2025-02-19',
};

export const client = createClient({ ...config, useCdn: true });
export const previewClient = createClient({
  ...config,
  useCdn: false,
  perspective: 'previewDrafts',
  token: import.meta.env.VITE_SANITY_PREVIEW_TOKEN,
});
