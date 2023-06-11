import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME, decodeToken } from '../../lib/jwt';

export function RoadCardPage() {
  const token = Cookies.get(TOKEN_COOKIE_NAME);
  if (!token) {
    return null;
  }

  const user = decodeToken(token);
  console.log(user);

  const textareaContent = `
  <a
  href="${import.meta.env.PUBLIC_API_URL}/v1-badge/long/${user.id}"
  target="_blank"
  rel="noopener noreferrer"
>
  <img
    src="${import.meta.env.PUBLIC_API_URL}/v1-badge/long/${user.id}"
    alt="Road Card"
  />
</a>
  `.trim();

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold sm:text-4xl">Grab your #RoadCard</h2>
        <p className="mt-2">
          Pick a badge and share your progress with the world.
        </p>
      </div>

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-2">
          <a
            href={`${import.meta.env.PUBLIC_API_URL}/v1-badge/long/${user.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full hover:cursor-pointer"
          >
            <img
              src={`${import.meta.env.PUBLIC_API_URL}/v1-badge/long/${user.id}`}
              alt="Road Card"
              width={300}
              height={390}
              className="aspect-[1/1.3]"
            />
          </a>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button className="flex h-7 items-center justify-center whitespace-nowrap rounded border border-gray-300 bg-gray-50 px-2 text-xs font-medium leading-none hover:opacity-75">
              Download
            </button>
            <a
              className="flex h-7 items-center justify-center whitespace-nowrap rounded border border-gray-300 bg-gray-50 px-2 text-xs font-medium leading-none hover:opacity-75"
              href={`${import.meta.env.PUBLIC_API_URL}/v1-badge/long/${
                user.id
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Copy Link
            </a>
          </div>
        </div>
        <div className="col-span-3">
          <span className="">Embed</span>
          <textarea
            className="no-scrollbar mt-3 h-32 w-full rounded-md border border-gray-300 bg-gray-50 p-3 text-gray-900"
            readOnly
          >
            {textareaContent}
          </textarea>
          <p className="mt-3">
            You can include it on your website or follow the instructions to{' '}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:no-underline"
            >
              include it on your GitHub profile.
            </a>
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <div className="col-span-3">
          <a
            href={`${import.meta.env.PUBLIC_API_URL}/v1-badge/long/${user.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block aspect-[2.63/1] w-full hover:cursor-pointer"
          >
            <img
              src={`${import.meta.env.PUBLIC_API_URL}/v1-badge/wide/${user.id}`}
              alt="Road Card"
              className="absolute left-0 top-0 h-full w-full object-cover"
            />
          </a>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <a
              href={`${import.meta.env.PUBLIC_API_URL}/v1-badge/wide/${
                user.id
              }`}
              download={`${user.name}-road-card.`}
              className="flex h-7 items-center justify-center whitespace-nowrap rounded border border-gray-300 bg-gray-50 px-2 text-xs font-medium leading-none hover:opacity-75"
            >
              Download
            </a>
            <a
              className="flex h-7 items-center justify-center whitespace-nowrap rounded border border-gray-300 bg-gray-50 px-2 text-xs font-medium leading-none hover:opacity-75"
              href={`${import.meta.env.PUBLIC_API_URL}/v1-badge/long/${
                user.id
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Copy Link
            </a>
          </div>
        </div>
        <div className="col-span-2">
          <span className="">Embed</span>
          <textarea
            className="no-scrollbar mt-3 h-32 w-full rounded-md border border-gray-300 bg-gray-50 p-3 text-gray-900"
            readOnly
          >
            {textareaContent}
          </textarea>
          <p className="mt-3">
            You can include it on your website or follow the instructions to{' '}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:no-underline"
            >
              include it on your GitHub profile.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
