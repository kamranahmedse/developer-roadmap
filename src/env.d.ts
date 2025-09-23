/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  GITHUB_SHA: string;
  PUBLIC_API_URL: string;
  PUBLIC_APP_URL: string;
  PUBLIC_AVATAR_BASE_URL: string;
  PUBLIC_EDITOR_APP_URL: string;
  PUBLIC_COURSE_APP_URL: string;
  PUBLIC_MOBILE_APP_SCHEMA: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
