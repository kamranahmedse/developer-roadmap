import { useCallback, useState, type FormEvent } from 'react';
import { Modal } from '../Modal';
import {
  useDropzone,
  type DropEvent,
  type FileRejection,
} from 'react-dropzone';
import { cn } from '../../lib/classname';
import { Loader2Icon, PlusIcon, XIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { httpDelete, httpPost } from '../../lib/query-http';
import { useToast } from '../../hooks/use-toast';
import { queryClient } from '../../stores/query-client';
import {
  userResumeOptions,
  type UserResumeDocument,
} from '../../queries/user-resume';

type OnDrop<T extends File = File> = (
  acceptedFiles: T[],
  fileRejections: FileRejection[],
  event: DropEvent,
) => void;

type UploadResumeModalProps = {
  userResume?: UserResumeDocument;
  onClose: () => void;
  isUploading: boolean;
  uploadResume: (formData: FormData) => void;
};

export function UploadResumeModal(props: UploadResumeModalProps) {
  const {
    onClose,
    userResume: defaultUserResume,
    isUploading,
    uploadResume,
  } = props;

  const toast = useToast();
  const [file, setFile] = useState<File | null>(
    defaultUserResume?.resumeUrl
      ? new File([], defaultUserResume.fileName, {
          type: defaultUserResume.fileType,
        })
      : null,
  );

  const onDrop: OnDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { mutate: deleteResume, isPending: isDeletingResume } = useMutation(
    {
      mutationFn: async () => {
        return httpDelete('/v1-delete-resume');
      },
      onSuccess: () => {
        setFile(null);
      },
      onSettled: () => {
        return queryClient.invalidateQueries(userResumeOptions());
      },
      onError: (error) => {
        toast.error(error?.message || 'Failed to delete resume');
      },
    },
    queryClient,
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);
    uploadResume(formData);
  };

  const size = file?.size || defaultUserResume?.fileSize || 0;
  const fileSize = (size / 1024 / 1024).toFixed(2);

  return (
    <Modal onClose={onClose}>
      <form
        className="p-4 pt-8"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-3xl">Upload your resume</h2>
        <p className="mt-2 text-center text-sm text-balance text-gray-500">
          Upload your resume to get personalized responses to your questions.
        </p>

        {file && (
          <div className="mt-8">
            <div className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 p-4">
              <div>
                <h3 className="text-base font-medium">{file.name}</h3>
                <p className="mt-0.5 text-sm text-gray-400">{fileSize} MB</p>
              </div>

              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-md text-gray-400 hover:bg-red-100 hover:text-red-500"
                disabled={isDeletingResume}
                onClick={() => deleteResume()}
              >
                {isDeletingResume ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <XIcon className="size-4" />
                )}
              </button>
            </div>
          </div>
        )}

        {!file && (
          <>
            <div
              {...getRootProps({
                className: cn(
                  'border-[1.5px] border-dashed border-gray-200 min-h-60 flex items-center justify-center rounded-lg p-4 mt-8 bg-gray-50 cursor-pointer',
                  isDragActive && 'border-gray-400',
                ),
              })}
            >
              <input {...getInputProps()} />
              <div className="mx-auto flex max-w-2xs flex-col items-center text-center text-balance">
                <PlusIcon className="size-5 text-gray-400" />
                <p className="mt-3 text-gray-500">
                  Drag and drop your resume here or{' '}
                  <span className="text-black">click to browse</span>
                </p>
              </div>
            </div>

            <p className="mt-2 text-center text-xs text-gray-400">
              Only PDF files are supported at the moment
            </p>
          </>
        )}

        {!defaultUserResume && (
          <>
            <button
              type="submit"
              className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg bg-gray-100 p-1 py-2.5 leading-none tracking-wide text-gray-600 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400 data-[loading=true]:cursor-wait"
              data-loading={String(isUploading)}
              disabled={!file || isUploading || isDeletingResume}
            >
              {isUploading ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                'Upload Resume'
              )}
            </button>

            <p className="mt-4 text-center text-xs text-gray-400">
              You can also export your resume from{' '}
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 underline"
              >
                LinkedIn
              </a>
            </p>
          </>
        )}
      </form>
    </Modal>
  );
}
