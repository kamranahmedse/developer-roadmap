import { useState } from 'preact/hooks';

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

    fetch('http://localhost:8080/v1-update-profile', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        github,
        linkedin,
        website,
      }),
    });
  };

  return (
    <form>
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
            Github Username
          </label>
          <input
            type="text"
            name="github"
            id="github"
            className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="arikchakma"
          />
        </div>
        <div className="flex w-full flex-col">
          <label for="linkedin" className="text-sm leading-none text-slate-500">
            LinkedIn Url
          </label>
          <input
            type="text"
            name="linkedin"
            id="linkedin"
            className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none transition duration-150 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="https://www.linkedin.com/in/arikchakma/"
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
          />
        </div>

        <button
          className="!mt-5 inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-black p-2 px-4 text-sm font-medium text-white outline-none transition duration-150 ease-in-out focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:opacity-60"
          type="button"
        >
          Update
        </button>
      </div>
    </form>
  );
}
