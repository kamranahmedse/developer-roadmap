import { useState } from 'preact/hooks';
import { TOKEN_COOKIE_NAME } from '../../lib/utils';
import Cookies from 'js-cookie';

export default function UpdateProfileForm() {
  const [name, setName] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    setIsLoading(true);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(
      'Cookie',
      `${TOKEN_COOKIE_NAME}=${Cookies.get(TOKEN_COOKIE_NAME)}`
    );

    fetch('http://localhost:8080/v1-update-profile', {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify({
        name,
        github: github === '' ? undefined : github,
        linkedin: linkedin === '' ? undefined : linkedin,
        website: website === '' ? undefined : website,
      }),
    })
      .then(async (res) => {
        const json = await res.json();
        if (res.ok) {
          return json;
        } else {
          throw new Error(json.message);
        }
      })
      .then((data) => {
        setIsLoading(false);
        setName('');
        setGithub('');
        setLinkedin('');
        setWebsite('');
        setError('');
        setSuccessMessage('Profile updated successfully');
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold sm:text-4xl">Update Profile</h2>
      <p className="mt-2">Manage settings for your roadmap.sh profile</p>
      <div className="mt-8 space-y-4">
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
            className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            required
            placeholder="Arik Chakma"
            value={name}
            onChange={(e) => setName((e.target as HTMLInputElement).value)}
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
            className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            required
            disabled
            placeholder="arik@roadmap.sh"
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
            className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="https://github.com/arikchakma"
            value={github}
            onChange={(e) => setGithub((e.target as HTMLInputElement).value)}
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
            className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="https://www.linkedin.com/in/arikchakma/"
            value={linkedin}
            onChange={(e) => setLinkedin((e.target as HTMLInputElement).value)}
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
            className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="https://arikko.dev"
            value={website}
            onChange={(e) => setWebsite((e.target as HTMLInputElement).value)}
          />
        </div>

        {error && (
          <div className="text-sm font-medium text-red-500">
            <span className="text-red-500">{error}</span>
          </div>
        )}
        {successMessage && (
          <div className="text-sm font-medium text-green-500">
            <span className="text-green-500">{successMessage}</span>
          </div>
        )}

        <button
          className="!mt-5 inline-flex h-10 min-w-[120px] items-center justify-center rounded-lg border border-slate-300 bg-black p-2 px-4 text-sm font-medium text-white outline-none transition duration-150 ease-in-out focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              class={`h-5 w-5 animate-spin text-white`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="stroke-[4px] opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            'Update'
          )}
        </button>
      </div>
    </form>
  );
}
