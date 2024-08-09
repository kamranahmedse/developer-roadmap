import { X } from 'lucide-react';
import { Modal } from '../Modal';
import { useState, type FormEvent } from 'react';
import { useToast } from '../../hooks/use-toast';

type SubmitProjectModalProps = {
  onClose: () => void;
  projectId: string;
  onSubmit: () => void;
};

export function SubmitProjectModal(props: SubmitProjectModalProps) {
  const { onClose, projectId, onSubmit } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [repoUrl, setRepoUrl] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError('');
      setSuccessMessage('');

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
        const errorData = await allContentsResponse.json();
        if (errorData?.status === 404) {
          throw new Error('Repository not found');
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

      // TODO: Make API call to update the project status
      setSuccessMessage('Repository verified successfully');
      setIsLoading(false);
      onSubmit();
    } catch (error: any) {
      console.error(error);
      setError(error?.message || 'Failed to verify repository');
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} bodyClassName="h-auto p-4">
      <h2 className="mb-0.5 text-xl font-semibold">
        Submit Link to the GitHub repository
      </h2>
      <p className="text-balance text-sm text-gray-500">
        Make sure to have a readme file in your project repository containing
        the link to this project page.
      </p>

      <form className="mt-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 p-2 focus:border-gray-500 focus:outline-none"
          placeholder="https://github.com/kamranahmedse/developer-roadmap"
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
          {isLoading ? 'Verifying...' : 'Verify'}
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
