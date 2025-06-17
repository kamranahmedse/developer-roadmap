import { type FormEvent, useEffect, useState } from 'react';
import { httpGet, httpPost } from '../../lib/http';
import { pageProgressMessage } from '../../stores/page';
import UploadProfilePicture from './UploadProfilePicture';

export function UpdateProfileForm() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const { response, error } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-update-profile`,
      {
        name,
      },
    );

    if (error || !response) {
      setIsLoading(false);
      setError(error?.message || 'Something went wrong');

      return;
    }

    await loadProfile();
    setSuccess('Profile updated successfully');
  };

  const loadProfile = async () => {
    setIsLoading(true);

    const { error, response } = await httpGet(
      `${import.meta.env.PUBLIC_API_URL}/v1-me`,
    );

    if (error || !response) {
      setIsLoading(false);
      setError(error?.message || 'Something went wrong');

      return;
    }

    const { name, email, avatar, username } = response;

    setName(name);
    setEmail(email);
    setUsername(username);
    setAvatar(avatar || '');

    setIsLoading(false);
  };

  // Make a request to the backend to fill in the form with the current values
  useEffect(() => {
    loadProfile().finally(() => {
      pageProgressMessage.set('');
    });
  }, []);

  return (
    <div>
      <div className="mb-8 hidden md:block">
        <h2 className="text-2xl font-bold sm:text-3xl">Basic Information</h2>
        <p className="mt-0.5 text-gray-400">
          Update and set up your public profile below.
        </p>
      </div>
      <UploadProfilePicture
        type="avatar"
        label="Profile picture"
        avatarUrl={
          avatar
            ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${avatar}`
            : '/images/default-avatar.png'
        }
      />
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div className="flex w-full flex-col">
          <label
            htmlFor="name"
            className='text-sm leading-none text-slate-500 after:text-red-400 after:content-["*"]'
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-xs outline-hidden placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            required
            placeholder="John Doe"
            value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between">
            <label
              htmlFor="email"
              className='text-sm leading-none text-slate-500 after:text-red-400 after:content-["*"]'
            >
              Email
            </label>
            <a
              href="/account/settings"
              className="text-xs text-purple-700 underline hover:text-purple-800"
            >
              Visit settings page to change email
            </a>
          </div>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs outline-hidden placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            required
            disabled
            placeholder="john@example.com"
            value={email}
          />
        </div>

        {error && (
          <p className="mt-2 rounded-lg bg-red-100 p-2 text-red-700">{error}</p>
        )}

        {success && (
          <p className="mt-2 rounded-lg bg-green-100 p-2 text-green-700">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-hidden focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
        >
          {isLoading ? 'Please wait...' : 'Update Information'}
        </button>
      </form>
    </div>
  );
}
