import { useEffect, useState } from 'react';
import { deleteOpenAIKey, getOpenAIKey, saveOpenAIKey } from '../../lib/jwt.ts';
import { cn } from '../../lib/classname.ts';
import { CloseIcon } from '../ReactIcons/CloseIcon.tsx';
import { useToast } from '../../hooks/use-toast.ts';
import { httpPost } from '../../lib/http.ts';
import { ChevronLeft } from 'lucide-react';

type OpenAISettingsProps = {
  onClose: () => void;
  onBack: () => void;
};

export function OpenAISettings(props: OpenAISettingsProps) {
  const { onClose, onBack } = props;

  const [defaultOpenAIKey, setDefaultOpenAIKey] = useState('');

  const [error, setError] = useState('');
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const apiKey = getOpenAIKey();
    setOpenaiApiKey(apiKey || '');
    setDefaultOpenAIKey(apiKey || '');
  }, []);

  return (
    <div className="p-4">
      <button
        onClick={onBack}
        className="mb-5 flex items-center gap-1.5 text-sm leading-none opacity-40 transition-opacity hover:opacity-100 focus:outline-hidden"
      >
        <ChevronLeft size={16} />
        Back to options
      </button>

      <h2 className="text-xl font-semibold text-gray-800">OpenAI Settings</h2>
      <p className="mt-2 text-sm leading-normal text-gray-500">
        Add your OpenAI API key below to bypass the roadmap generation limits.
        You can use your existing key or{' '}
        <a
          className="underline underline-offset-2 hover:text-gray-900"
          href={'https://platform.openai.com/signup'}
          target="_blank"
        >
          create a new one here
        </a>
        .
      </p>

      <form
        className="mt-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError('');

          const normalizedKey = openaiApiKey.trim();
          if (!normalizedKey) {
            deleteOpenAIKey();
            toast.success('OpenAI API key removed');
            onClose();
            return;
          }

          if (!normalizedKey.startsWith('sk-')) {
            setError("Invalid OpenAI API key. It should start with 'sk-'");
            return;
          }

          setIsLoading(true);
          const { response, error } = await httpPost(
            `${import.meta.env.PUBLIC_API_URL}/v1-validate-openai-key`,
            {
              key: normalizedKey,
            },
          );

          if (error) {
            setError(error.message);
            setIsLoading(false);
            return;
          }

          // Save the API key to cookies
          saveOpenAIKey(normalizedKey);
          toast.success('OpenAI API key saved');
          onClose();
        }}
      >
        <div className="relative">
          <input
            type="text"
            name="openai-api-key"
            id="openai-api-key"
            className={cn(
              'block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 transition-colors focus:border-black focus:outline-hidden',
              {
                'border-red-500 bg-red-100 focus:border-red-500': error,
              },
            )}
            placeholder="Enter your OpenAI API key"
            value={openaiApiKey}
            onChange={(e) => {
              setError('');
              setOpenaiApiKey((e.target as HTMLInputElement).value);
            }}
          />

          {openaiApiKey && (
            <button
              type={'button'}
              onClick={() => {
                setOpenaiApiKey('');
              }}
              className="absolute right-2 top-1/2 flex h-[20px] w-[20px] -translate-y-1/2 items-center justify-center rounded-full bg-gray-400 text-white hover:bg-gray-600"
            >
              <CloseIcon className="h-[13px] w-[13px] stroke-[3.5]" />
            </button>
          )}
        </div>
        <p className={'mb-2 mt-1 text-xs text-gray-500'}>
          We do not store your API key on our servers.
        </p>

        {error && (
          <p className="mt-2 text-sm text-red-500">
              {error}
          </p>
        )}
        <button
          disabled={isLoading}
          type="submit"
          className={
            'mt-2 w-full rounded-md bg-gray-700 px-4 py-2 text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50'
          }
        >
          {!isLoading && 'Save'}
          {isLoading && 'Validating ..'}
        </button>
        {!defaultOpenAIKey && (
          <button
            type="button"
            onClick={() => {
              onClose();
            }}
            className="mt-1 w-full rounded-md border border-red-500 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-700 hover:text-white"
          >
            Cancel
          </button>
        )}
        {defaultOpenAIKey && (
          <button
            type="button"
            onClick={() => {
              deleteOpenAIKey();
              onClose();
              toast.success('OpenAI API key removed');
            }}
            className="mt-1 w-full rounded-md border border-red-500 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-700 hover:text-white"
          >
            Remove API Key
          </button>
        )}
      </form>
    </div>
  );
}
