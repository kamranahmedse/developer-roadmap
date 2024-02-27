import 'astro/client';

interface ImportMetaEnv {
  GITHUB_SHA: string;
  PUBLIC_API_URL: string;
  PUBLIC_AVATAR_BASE_URL: string;
  PUBLIC_EDITOR_APP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
