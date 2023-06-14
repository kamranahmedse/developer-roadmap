export function GitHubReadmeBanner() {
  return (
    <p className="mt-3 rounded-md border p-2 text-sm w-full bg-yellow-100 border-yellow-400 text-yellow-900">
      Add this badge to your{' '}
      <a
        href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800"
      >
        GitHub profile readme.
      </a>
    </p>
  );
}
