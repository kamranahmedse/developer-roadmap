import { useState } from 'react';
import { Modal } from '../Modal';

export type ModifyCoursePromptProps = {
  title: string; // Yeni eklenen özellik
  description: string; // Yeni eklenen özellik
  onClose: () => void;
  onSubmit: (prompt: string) => void;
};

export function ModifyCoursePrompt(props: ModifyCoursePromptProps) {
  const { onClose, onSubmit } = props;

  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(prompt);
  };

  return (
    <Modal
      onClose={onClose}
      wrapperClassName="rounded-xl max-w-xl w-full h-auto"
      bodyClassName="p-6"
      overlayClassName="items-start md:items-center"
    >
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="mb-2 text-left text-xl font-semibold">
            Give AI more context
          </h2>
          <p className="text-sm text-gray-500">
            Pass additional information to the AI to generate a course outline.
          </p>
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <textarea
            id="prompt"
            autoFocus
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full rounded-md border border-gray-200 p-2 placeholder:text-sm focus:outline-black"
            placeholder="e.g. make sure to add a section on React hooks"
          />

          <p className="text-sm text-gray-500">
            Complete the sentence: "I want AI to..."
          </p>

          <div className="flex justify-end gap-2">
            <button
              className="rounded-md bg-gray-200 px-4 py-2.5 text-sm text-black hover:opacity-80"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!prompt.trim()}
              className="rounded-md bg-black px-4 py-2.5 text-sm text-white hover:opacity-80 disabled:opacity-50"
            >
              Modify Prompt
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
