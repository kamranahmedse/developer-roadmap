/// <reference types="astro/client" />

interface ImportMetaEnv {
  GITHUB_SHA: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
