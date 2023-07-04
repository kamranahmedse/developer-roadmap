import { useState } from 'preact/hooks';
import { httpGet } from '../../lib/http';

export function IdentiferInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUniqueIdentifier, setIsUniqueIdentifier] = useState(true);
  const [message, setMessage] = useState('');

  const checkUniqueIdentifier = async (value: string) => {
    if (!value) {
      return;
    }
    setIsLoading(true);
    setMessage('');
    const { response, error } = await httpGet<{
      status: 'ok' | 'error';
    }>(`${import.meta.env.PUBLIC_API_URL}/v1-is-unique-identifier/${value}`);

    if (error) {
      setIsLoading(false);
      alert(error.message);
      return;
    }

    if (response?.status === 'ok') {
      setIsUniqueIdentifier(true);
      setMessage('This identifier is available');
    } else {
      setIsUniqueIdentifier(false);
      setMessage('This identifier is already taken.');
    }
    setIsLoading(false);
  };

  return (
    <div className="mt-4 flex w-full flex-col">
      <label for="identifier" className="text-sm leading-none text-slate-500">
        Identifier
      </label>
      <input
        type="text"
        name="identifier"
        id="identifier"
        className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        placeholder="roadmap-sh"
        required
        value={value}
        onInput={(e) => {
          setMessage('');
          onChange((e.target as HTMLInputElement).value);
        }}
        onBlur={(e) =>
          checkUniqueIdentifier((e.target as HTMLInputElement).value)
        }
      />

      {value && (
        <>
          {isLoading && (
            <div className="mt-2 text-xs text-gray-500">Checking...</div>
          )}
          {!isLoading && message && (
            <div
              className={`mt-2 text-xs ${
                isUniqueIdentifier ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {message}
            </div>
          )}
        </>
      )}

      <div className="mt-2 text-xs text-gray-500">
        This will be used to create your team URL. You can change this later.
      </div>
    </div>
  );
}
