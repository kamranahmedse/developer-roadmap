import { CheckIcon, CircleDashed, X } from 'lucide-react';
import { Modal } from '../Modal';
import { useState, type FormEvent, type ReactNode } from 'react';
import { useToast } from '../../hooks/use-toast';
import { httpPost } from '../../lib/http';
import { GitHubIcon } from '../ReactIcons/GitHubIcon.tsx';
import { cn } from '../../lib/classname.ts';
import { SubmissionRequirement } from './SubmissionRequirement.tsx';

type SubmitProjectResponse = {
  repositoryUrl: string;
  submittedAt: Date;
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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [repoUrl, setRepoUrl] = useState(defaultRepositoryUrl);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError('');
      setSuccessMessage('');

      if (!repoUrl) {
        throw new Error('Repository URL is required');
      }

      const repoUrlParts = repoUrl
        .replace(/https?:\/\/(www\.)?github\.com/, '')
        .split('/');
      const username = repoUrlParts[1];
      const repoName = repoUrlParts[2];

      if (!username || !repoName) {
        throw new Error('Invalid GitHub repository URL');
      }

      const mainApiUrl = `https://api.github.com/repos/${username}/${repoName}`;

      const allContentsUrl = `${mainApiUrl}/contents`;
      const allContentsResponse = await fetch(allContentsUrl);
      if (!allContentsResponse.ok) {
        if (allContentsResponse?.status === 404) {
          throw new Error(
            'Repository not found. Make sure it exists and is public.',
          );
        }

        throw new Error('Failed to fetch repository contents');
      }

      const allContentsData = await allContentsResponse.json();
      if (!Array.isArray(allContentsData)) {
        throw new Error('Failed to fetch repository contents');
      }

      const readmeFile = allContentsData.find(
        (file) => file.name.toLowerCase() === 'readme.md',
      );
      if (!readmeFile || !readmeFile.url) {
        throw new Error('Readme file not found');
      }

      const readmeUrl = readmeFile.url;
      const response = await fetch(readmeUrl);
      if (!response.ok || response.status === 404) {
        throw new Error('Readme file not found');
      }

      const data = await response.json();
      if (!data.content) {
        throw new Error('Readme file not found');
      }

      const readmeContent = window.atob(data.content);
      const projectUrl = `${window.location.origin}/projects/${projectId}`;
      if (!readmeContent.includes(projectUrl)) {
        throw new Error('Project URL not found in the readme file');
      }

      const submitProjectUrl = `${import.meta.env.PUBLIC_API_URL}/v1-submit-project/${projectId}`;
      const { response: submitResponse, error } =
        await httpPost<SubmitProjectResponse>(submitProjectUrl, {
          repositoryUrl: repoUrl,
        });

      if (error || !submitResponse) {
        throw new Error(error?.message || 'Failed to submit project');
      }

      setSuccessMessage('Repository verified successfully');
      setIsLoading(false);
      onSubmit(submitResponse);
    } catch (error: any) {
      console.error(error);
      setError(error?.message || 'Failed to verify repository');
      setIsLoading(false);
    }
  };

  const verificationChecks = {
    valid_url: {
      status: 'pending',
      message: 'URL must point to a public GitHub repository',
    },
    valid_repo: {
      status: 'pending',
      message: 'Repository must contain a readme file',
    },
    valid_readme: {
      status: 'pending',
      message: 'Readme file must contain the project URL',
    },
  };

  return (
    <Modal onClose={onClose} bodyClassName="h-auto p-4">
      <h2 className="mb-2 flex items-center gap-2.5 text-2xl font-semibold">
        <GitHubIcon className="h-6 w-6 text-black" /> Submit Solution URL
      </h2>
      <p className="text-sm text-gray-500">
        Submit the URL of your GitHub repository with the solution.
      </p>

      <div className="my-4 flex flex-col gap-1">
        <SubmissionRequirement status="pending">
          URL must point to a public GitHub repository
        </SubmissionRequirement>
        <SubmissionRequirement status="pending">
          Repository must contain a README file
        </SubmissionRequirement>
        <SubmissionRequirement status="pending">
          README file must contain the project URL
        </SubmissionRequirement>
      </div>

      <form className="mt-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 p-2 focus:border-gray-500 focus:outline-none text-sm"
          placeholder="https://github.com/you/solution-repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />

        {error && (
          <p className="mt-2 text-sm font-medium text-red-500">{error}</p>
        )}

        {successMessage && (
          <p className="mt-2 text-sm font-medium text-green-500">
            {successMessage}
          </p>
        )}

        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-black p-2 font-medium text-white disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify Submission'}
        </button>
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
