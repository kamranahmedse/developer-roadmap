import { CheckIcon, CopyIcon, X } from 'lucide-react';
import { Modal } from '../Modal';
import { type FormEvent, useState } from 'react';
import { httpPost } from '../../lib/http';
import { GitHubIcon } from '../ReactIcons/GitHubIcon.tsx';
import { SubmissionRequirement } from './SubmissionRequirement.tsx';
import { useCopyText } from '../../hooks/use-copy-text.ts';
import { getTopGitHubLanguages } from '../../lib/github.ts';
import { SubmitSuccessModal } from './SubmitSuccessModal.tsx';

type SubmitProjectResponse = {
  repositoryUrl: string;
  submittedAt: Date;
};

type GitHubApiLanguagesResponse = Record<string, number>;

type VerificationChecksType = {
  repositoryExists: 'pending' | 'success' | 'error';
  readmeExists: 'pending' | 'success' | 'error';
  projectUrlExists: 'pending' | 'success' | 'error';
};

type SubmitProjectModalProps = {
  onClose: () => void;
  projectId: string;
  repositoryUrl?: string;
  onSubmit: (response: SubmitProjectResponse) => void;
};

export function SubmitProjectModal(props: SubmitProjectModalProps) {
  const {
    onClose,
    projectId,
    onSubmit,
    repositoryUrl: defaultRepositoryUrl = '',
  } = props;

  const { isCopied, copyText } = useCopyText();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [repoUrl, setRepoUrl] = useState(defaultRepositoryUrl);
  const [verificationChecks, setVerificationChecks] =
    useState<VerificationChecksType>({
      repositoryExists: defaultRepositoryUrl ? 'success' : 'pending',
      readmeExists: defaultRepositoryUrl ? 'success' : 'pending',
      projectUrlExists: defaultRepositoryUrl ? 'success' : 'pending',
    });

  const projectUrl = `${import.meta.env.DEV ? 'http://localhost:3000' : 'https://roadmap.sh'}/projects/${projectId}`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setVerificationChecks({
        repositoryExists: 'pending',
        readmeExists: 'pending',
        projectUrlExists: 'pending',
      });

      setIsLoading(true);
      setError('');
      setIsSuccess(false);

      if (!repoUrl) {
        setVerificationChecks({
          repositoryExists: 'error',
          readmeExists: 'pending',
          projectUrlExists: 'pending',
        });

        throw new Error('Repository URL is required');
      }

      const repoUrlParts = repoUrl
        .replace(/https?:\/\/(www\.)?github\.com/, '')
        .split('/');
      const username = repoUrlParts[1];
      const repoName = repoUrlParts[2];

      if (!username || !repoName) {
        setVerificationChecks({
          repositoryExists: 'error',
          readmeExists: 'pending',
          projectUrlExists: 'pending',
        });

        throw new Error('Invalid GitHub repository URL');
      }

      const mainApiUrl = `https://api.github.com/repos/${username}/${repoName}`;

      const allContentsUrl = `${mainApiUrl}/contents`;
      const allContentsResponse = await fetch(allContentsUrl);
      if (!allContentsResponse.ok) {
        setVerificationChecks({
          repositoryExists: 'error',
          readmeExists: 'pending',
          projectUrlExists: 'pending',
        });

        if (allContentsResponse?.status === 404) {
          throw new Error(
            'Repository not found. Make sure it exists and is public.',
          );
        }

        throw new Error('Failed to fetch repository contents');
      }

      const allContentsData = await allContentsResponse.json();
      if (!Array.isArray(allContentsData)) {
        setVerificationChecks({
          repositoryExists: 'error',
          readmeExists: 'pending',
          projectUrlExists: 'pending',
        });

        throw new Error('Failed to fetch repository contents');
      }

      const readmeFile = allContentsData.find(
        (file) => file.name.toLowerCase() === 'readme.md',
      );
      if (!readmeFile || !readmeFile.url) {
        setVerificationChecks({
          repositoryExists: 'success',
          readmeExists: 'error',
          projectUrlExists: 'pending',
        });

        throw new Error('Readme file not found');
      }

      const readmeUrl = readmeFile.url;
      const response = await fetch(readmeUrl);
      if (!response.ok || response.status === 404) {
        setVerificationChecks({
          repositoryExists: 'success',
          readmeExists: 'error',
          projectUrlExists: 'pending',
        });

        throw new Error('Readme file not found');
      }

      const data = await response.json();
      if (!data.content) {
        setVerificationChecks({
          repositoryExists: 'success',
          readmeExists: 'error',
          projectUrlExists: 'pending',
        });

        throw new Error('Readme file not found');
      }

      const readmeContent = window.atob(data.content);
      if (!readmeContent.includes(projectUrl)) {
        setVerificationChecks({
          repositoryExists: 'success',
          readmeExists: 'success',
          projectUrlExists: 'error',
        });

        throw new Error('Add the project page URL to the readme file');
      }

      setVerificationChecks({
        repositoryExists: 'success',
        readmeExists: 'success',
        projectUrlExists: 'success',
      });

      const languagesResponse = await fetch(`${mainApiUrl}/languages`);
      let languages: string[] = [];
      if (languagesResponse.ok) {
        const languagesData =
          (await languagesResponse.json()) as GitHubApiLanguagesResponse;

        languages = getTopGitHubLanguages(languagesData);
        if (languages?.length === 0) {
          languages = Object.keys(languagesData || {})?.slice(0, 4);
        }
      }

      const submitProjectUrl = `${import.meta.env.PUBLIC_API_URL}/v1-submit-project/${projectId}`;
      const { response: submitResponse, error } =
        await httpPost<SubmitProjectResponse>(submitProjectUrl, {
          repositoryUrl: repoUrl,
          languages,
        });

      if (error || !submitResponse) {
        throw new Error(
          error?.message || 'Error submitting project. Please try again!',
        );
      }

      setIsSuccess(true);
      setIsLoading(false);

      onSubmit(submitResponse);
    } catch (error: any) {
      console.error(error);
      setError(error?.message || 'Failed to verify repository');
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return <SubmitSuccessModal projectId={projectId} onClose={onClose} />;
  }

  return (
    <Modal onClose={onClose} bodyClassName="h-auto p-4">
      <h2 className="mb-2 flex items-center gap-2.5 text-xl font-semibold">
        <GitHubIcon className="h-6 w-6 text-black" /> Submit Solution URL
      </h2>
      <p className="text-sm text-gray-500">
        Submit the URL of your GitHub repository with the solution.
      </p>

      <div className="my-4 flex flex-col gap-1">
        <SubmissionRequirement
          isLoading={isLoading}
          status={verificationChecks.repositoryExists}
        >
          URL must point to a public GitHub repository
        </SubmissionRequirement>
        <SubmissionRequirement
          isLoading={isLoading}
          status={verificationChecks.readmeExists}
        >
          Repository must contain a README file
        </SubmissionRequirement>
        <SubmissionRequirement
          isLoading={isLoading}
          status={verificationChecks.projectUrlExists}
        >
          README file must contain the{' '}
          <button
            className={
              'font-medium underline underline-offset-2 hover:text-purple-700'
            }
            onClick={() => {
              copyText(projectUrl);
            }}
          >
            {!isCopied && (
              <>
                project URL{' '}
                <CopyIcon
                  className="relative -top-0.5 inline-block h-3 w-3"
                  strokeWidth={2.5}
                />
              </>
            )}
            {isCopied && (
              <>
                copied URL{' '}
                <CheckIcon
                  className="relative -top-0.5 inline-block h-3 w-3"
                  strokeWidth={2.5}
                />
              </>
            )}
          </button>
        </SubmissionRequirement>
      </div>

      <form className="mt-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-gray-500 focus:outline-hidden"
          placeholder="https://github.com/you/solution-repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />

        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-black p-2 text-sm font-medium text-white disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify and Submit'}
        </button>
        {error && (
          <p className="mt-2 text-sm font-medium text-red-500">{error}</p>
        )}
      </form>
    </Modal>
  );
}
