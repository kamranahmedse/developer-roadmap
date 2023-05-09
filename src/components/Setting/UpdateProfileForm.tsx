import { useEffect, useState } from 'preact/hooks';
import { httpGet, httpPost } from '../../lib/http';
import { pageLoadingMessage } from '../../stores/page';
import UploadProfilePicture from '../Profile/UploadProfilePicture';

export function UpdateProfileForm() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [github, setGithub] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [website, setWebsite] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const { response, error } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-update-profile`,
      {
        name,
        github: github || undefined,
        linkedin: linkedin || undefined,
        twitter: twitter || undefined,
        website: website || undefined,
      }
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
    // Set the loading state
    setIsLoading(true);

    const { error, response } = await httpGet(
      `${import.meta.env.PUBLIC_API_URL}/v1-me`
    );

    if (error || !response) {
      setIsLoading(false);
      setError(error?.message || 'Something went wrong');

      return;
    }

    const { name, email, links, avatar } = response;

    setName(name);
    setEmail(email);
    setGithub(links?.github || '');
    setLinkedin(links?.linkedin || '');
    setTwitter(links?.twitter || '');
    setWebsite(links?.website || '');
    setAvatar(avatar || '');

    setIsLoading(false);
  };

  // Make a request to the backend to fill in the form with the current values
  useEffect(() => {
    pageLoadingMessage.set('Loading profile');
    loadProfile().finally(() => {
      pageLoadingMessage.set('');
    });
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold sm:text-4xl">Profile</h2>
      <p className="mt-2">Update your profile details below.</p>
      <UploadProfilePicture
        avatarUrl={
          avatar
            ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${avatar}`
            : '/images/default-avatar.png'
        }
      />
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div className="flex w-full flex-col">
          <label
            for="name"
            className='text-sm leading-none text-slate-500 after:text-red-400 after:content-["*"]'
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            required
            placeholder="John Doe"
            value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className="flex w-full flex-col">
          <label
            for="email"
            className='text-sm leading-none text-slate-500 after:text-red-400 after:content-["*"]'
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            required
            disabled
            placeholder="john@example.com"
            value={email}
          />
        </div>

        <div className="flex w-full flex-col">
          <label for="github" className="text-sm leading-none text-slate-500">
            Github
          </label>
          <input
            type="text"
            name="github"
            id="github"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="https://github.com/username"
            value={github}
            onInput={(e) => setGithub((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className="flex w-full flex-col">
          <label for="twitter" className="text-sm leading-none text-slate-500">
            Twitter
          </label>
          <input
            type="text"
            name="twitter"
            id="twitter"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="https://twitter.com/username"
            value={twitter}
            onInput={(e) => setTwitter((e.target as HTMLInputElement).value)}
          />
        </div>

        <div className="flex w-full flex-col">
          <label for="linkedin" className="text-sm leading-none text-slate-500">
            LinkedIn
          </label>
          <input
            type="text"
            name="linkedin"
            id="linkedin"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="https://www.linkedin.com/in/username/"
            value={linkedin}
            onInput={(e) => setLinkedin((e.target as HTMLInputElement).value)}
          />
        </div>

        <div className="flex w-full flex-col">
          <label for="website" className="text-sm leading-none text-slate-500">
            Website
          </label>
          <input
            type="text"
            name="website"
            id="website"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="https://example.com"
            value={website}
            onInput={(e) => setWebsite((e.target as HTMLInputElement).value)}
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
          className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
        >
          {isLoading ? 'Please wait...' : 'Continue'}
        </button>
      </form>
    </div>
  );
}
