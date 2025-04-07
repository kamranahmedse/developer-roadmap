import Cookies from 'js-cookie';
import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from 'react';
import { TOKEN_COOKIE_NAME, removeAuthToken } from '../../lib/jwt';

interface PreviewFile extends File {
  preview: string;
}

type UploadProfilePictureProps = {
  isDisabled?: boolean;
  avatarUrl: string;
  type: 'avatar' | 'logo';
  label?: string;
  teamId?: string;
};

function getDimensions(file: File) {
  return new Promise<{
    width: number;
    height: number;
  }>((resolve) => {
    const img = new Image();

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => {
      resolve({ width: 0, height: 0 });
    };

    img.src = URL.createObjectURL(file);
  });
}

async function validateImage(file: File): Promise<string | null> {
  const dimensions = await getDimensions(file);

  if (dimensions.width > 3000 || dimensions.height > 3000) {
    return 'Image dimensions are too big. Maximum 3000x3000 pixels.';
  }

  if (dimensions.width < 100 || dimensions.height < 100) {
    return 'Image dimensions are too small. Minimum 100x100 pixels.';
  }

  if (file.size > 1024 * 1024) {
    return 'Image size is too big. Maximum 1MB.';
  }

  return null;
}

export default function UploadProfilePicture(props: UploadProfilePictureProps) {
  const { avatarUrl, teamId, type, isDisabled = false } = props;

  const [file, setFile] = useState<PreviewFile | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setError('');

    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }

    const error = await validateImage(file);
    if (error) {
      setError(error);
      return;
    }

    setFile(
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('name', 'avatar');
    formData.append('avatar', file);

    // FIXME: Use `httpCall` helper instead of fetch
    let res: Response;
    if (type === 'avatar') {
      res = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/v1-upload-profile-picture`,
        {
          method: 'POST',
          body: formData,
          credentials: 'include',
        }
      );
    } else {
      res = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/v1-upload-team-logo/${teamId}`,
        {
          method: 'POST',
          body: formData,
          credentials: 'include',
        }
      );
    }

    if (res.ok) {
      window.location.reload();
      return;
    }

    const data = await res.json();

    setError(data?.message || 'Something went wrong');
    setIsLoading(false);

    // Logout user if token is invalid
    if (data.status === 401) {
      removeAuthToken();
      window.location.reload();
    }
  };

  useEffect(() => {
    // Necessary to revoke the preview URL when the component unmounts for avoiding memory leaks
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="flex flex-col gap-2"
    >
      {props.label && (
        <label htmlFor="avatar" className="text-sm leading-none text-slate-500">
          {props.label}
        </label>
      )}
      <div className="mb-2 mt-2 flex items-center gap-2">
        <label
          htmlFor="avatar"
          title="Change profile picture"
          className="relative cursor-pointer"
        >
          <div className="relative block h-24 w-24 items-center overflow-hidden rounded-full">
            <img
              className="absolute inset-0 h-full w-full bg-gray-100 object-cover text-sm leading-8 text-red-700"
              src={file?.preview || avatarUrl}
              alt={file?.name ?? 'Error!'}
              loading="lazy"
              decoding="async"
              onLoad={() => file && URL.revokeObjectURL(file.preview)}
            />
          </div>

          {!file && !isDisabled && (
            <button
              disabled={isDisabled}
              type="button"
              className="absolute bottom-1 right-0 rounded-sm bg-gray-600 px-2 py-1 text-xs leading-none text-gray-50 ring-2 ring-white"
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
          disabled={isDisabled}
          ref={inputRef}
          id="avatar"
          type="file"
          name="avatar"
          accept="image/png, image/jpeg, image/jpg, image/pjpeg"
          className="hidden"
          onChange={onImageChange}
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
              disabled={isLoading || isDisabled}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex h-9 min-w-[96px] items-center justify-center rounded-md border border-gray-300 text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoading || isDisabled}
            >
              {isLoading ? 'Uploading..' : 'Upload'}
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
