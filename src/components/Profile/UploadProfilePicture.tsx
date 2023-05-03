import { useEffect, useRef, useState } from 'preact/hooks';
import { httpCall, httpPost } from '../../lib/http';
import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from '../../lib/jwt';

interface PreviewFile extends File {
  preview: string;
}
export default function UploadProfilePicture({
  user,
}: {
  user: {
    image: string;
  };
}) {
  const [file, setFile] = useState<PreviewFile | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: Event) => {
    setError('');
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    // Check file size and dimension
    const dimensions = await new Promise<{
      width: number;
      height: number;
    }>((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    });

    // Image can't be larger than 3000x3000 pixels
    if (dimensions.width > 3000 || dimensions.height > 3000) {
      setError('Image dimensions are too big. Maximum 3000x3000 pixels.');
      return;
      // Image can't be smaller than 100x100 pixels
    } else if (dimensions.width < 100 || dimensions.height < 100) {
      setError('Image dimensions are too small. Minimum 100x100 pixels.');
      return;
    }

    // Image can't be larger than 1MB
    if (file.size > 1024 * 1024) {
      setError('Image size is too big. Maximum 1MB.');
      return;
    }

    setError('');
    setFile(
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    if (!file) return;

    const formData = new FormData();
    formData.append('name', 'avatar');
    formData.append('avatar', file);
    const res = await fetch(
      `${import.meta.env.PUBLIC_API_URL}/v1-upload-profile-picture`,
      {
        method: 'POST',
        body: formData,
        credentials: 'include',
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || 'Something went wrong');
      setIsLoading(false);
    }
    // Logout user if token is invalid
    if (data.status === 401) {
      Cookies.remove(TOKEN_COOKIE_NAME);
      window.location.reload();
    }

    window.location.reload();
  };

  useEffect(() => {
    // Necessary to revoke the preview URL when the component unmounts for avoiding memory leaks
    return () => {
      if (file) URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="mt-8 flex flex-col gap-2"
    >
      <label
        htmlFor="avatar"
        className='text-sm leading-none text-slate-500 after:text-red-400 after:content-["*"]'
      >
        Profile Picture
      </label>
      <div className="mt-2 flex items-center gap-2">
        <label
          htmlFor="avatar"
          title="Change profile picture"
          className="relative cursor-pointer"
        >
          <div className="relative block h-24 w-24 overflow-hidden rounded-full">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={
                file?.preview ??
                user.image ??
                'https://d22sqt16nof9dt.cloudfront.net/1683071715132-1x3.jpeg'
              }
              alt={file?.name ?? 'Profile picture'}
              loading="lazy"
              decoding="async"
              onLoad={() => file && URL.revokeObjectURL(file.preview)}
            />
          </div>

          {!file && (
            <button
              type="button"
              className="absolute bottom-1 right-0 rounded bg-gray-600 px-2 py-1 text-xs leading-none text-gray-50 ring-2 ring-white"
              onClick={() => {
                if (isLoading) return;
                inputRef.current?.click();
              }}
            >
              Edit
            </button>
          )}
        </label>
        <input
          ref={inputRef}
          id="avatar"
          type="file"
          name="avatar"
          accept="image/png, image/jpeg, image/jpg, image/pjpeg"
          className="hidden"
          onChange={handleFileChange}
        />

        {file && (
          <div className="ml-5 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setFile(null);
                inputRef.current?.value && (inputRef.current.value = '');
              }}
              className="flex h-9 min-w-[96px] items-center justify-center rounded-md border border-red-300 bg-red-100 text-sm font-medium text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex h-9 min-w-[96px] items-center justify-center rounded-md border border-gray-300 text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoading}
            >
              {isLoading ? 'Uploading' : 'Upload'}
            </button>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 rounded-lg bg-red-100 p-2 text-red-700">{error}</p>
      )}
    </form>
  );
}
