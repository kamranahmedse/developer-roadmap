import { execSync } from 'child_process';

export async function GET() {
  return new Response(JSON.stringify({}), {});
}
