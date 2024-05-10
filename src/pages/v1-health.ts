import { execSync } from 'child_process';

export const prerender = false;

export async function GET() {
  return new Response(JSON.stringify({}), {});
}
