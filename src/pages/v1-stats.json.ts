import { execSync } from 'child_process';

export const prerender = true;

export async function GET() {
  const commitHash = execSync('git rev-parse HEAD').toString().trim();
  const commitDate = execSync('git log -1 --format=%cd').toString().trim();
  const commitMessage = execSync('git log -1 --format=%B').toString().trim();

  const prevCommitHash = execSync('git rev-parse HEAD~1').toString().trim();
  const prevCommitDate = execSync('git log -1 --format=%cd HEAD~1')
    .toString()
    .trim();
  const prevCommitMessage = execSync('git log -1 --format=%B HEAD~1')
    .toString()
    .trim();

  return new Response(
    JSON.stringify({
      current: {
        hash: commitHash,
        date: commitDate,
        message: commitMessage,
      },
      previous: {
        hash: prevCommitHash,
        date: prevCommitDate,
        message: prevCommitMessage,
      },
    }),
    {},
  );
}
