import { CheckIcon, CopyIcon, X } from 'lucide-react';
import { CheckIcon as ReactCheckIcon } from '../ReactIcons/CheckIcon.tsx';
import { Modal } from '../Modal';
import { type FormEvent, useState } from 'react';
import { httpPost } from '../../lib/http';
import { GitHubIcon } from '../ReactIcons/GitHubIcon.tsx';
import { SubmissionRequirement } from './SubmissionRequirement.tsx';
import { useCopyText } from '../../hooks/use-copy-text.ts';

type SubmitProjectResponse = {
  repositoryUrl: string;
  submittedAt: Date;
};

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
  const [successMessage, setSuccessMessage] = useState('');
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
      setSuccessMessage('');

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

      const submitProjectUrl = `${import.meta.env.PUBLIC_API_URL}/v1-submit-project/${projectId}`;
      const { response: submitResponse, error } =
        await httpPost<SubmitProjectResponse>(submitProjectUrl, {
          repositoryUrl: repoUrl,
        });

      if (error || !submitResponse) {
        throw new Error(
          error?.message || 'Error submitting project. Please try again!',
        );
      }

      setSuccessMessage('Solution submitted successfully!');
      setIsLoading(false);

      onSubmit(submitResponse);
    } catch (error: any) {
      console.error(error);
      setError(error?.message || 'Failed to verify repository');
      setIsLoading(false);
    }
  };

  if (successMessage) {
    return (
      <Modal onClose={onClose} bodyClassName="h-auto p-4">
        <div className="flex flex-col items-center justify-center gap-4 pb-10 pt-12">
          <ReactCheckIcon additionalClasses={'h-12 text-green-500 w-12'} />
          <p className="text-lg font-medium">{successMessage}</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose} bodyClassName="h-auto p-4">
      <h2 className="mb-2 flex items-center gap-2.5 text-2xl font-semibold">
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
          className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-gray-500 focus:outline-none"
          placeholder="https://github.com/you/solution-repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />

        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-black p-2 font-medium text-white disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify and Submit'}
        </button>
        {error && (
          <p className="mt-2 text-sm font-medium text-red-500">{error}</p>
        )}

        {successMessage && (
          <p className="mt-2 text-sm font-medium text-green-500">
            {successMessage}
          </p>
        )}
      </form>

      <button
        className="absolute right-2.5 top-2.5 text-gray-600 hover:text-black"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </button>
    </Modal>
  );
}
