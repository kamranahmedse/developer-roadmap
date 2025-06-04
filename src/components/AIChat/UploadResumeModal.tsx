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
import { httpDelete } from '../../lib/query-http';
import { useToast } from '../../hooks/use-toast';
import { queryClient } from '../../stores/query-client';
import {
  userResumeOptions,
  type UserResumeDocument,
} from '../../queries/user-resume';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';

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
  const [showLinkedInExport, setShowLinkedInExport] = useState(false);
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

    if (!isLoggedIn()) {
      showLoginPopup();
      return;
    }

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
      {showLinkedInExport ? (
        <div className="p-4 pt-8">
          <h2 className="text-center text-2xl font-semibold text-black">
            How to export LinkedIn Resume
          </h2>
          <p className="mt-2 text-center text-sm text-balance text-gray-500">
            Visit your LinkedIn profile and export your resume as a PDF.
          </p>
          <img
            src="https://assets.roadmap.sh/guest/linkedin-resume-export-w3x2f.png"
            alt="LinkedIn Resume Export"
            className="mt-6 min-h-[331px] rounded-xl object-cover"
          />
          <button
            onClick={() => setShowLinkedInExport(false)}
            className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg bg-black p-1 py-3 leading-none tracking-wide text-white transition-colors hover:bg-gray-900"
          >
            Back to Upload
          </button>
        </div>
      ) : (
        <form
          className="p-4 pt-8"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center text-2xl font-semibold text-black">
            Upload your resume
          </h2>
          <p className="mt-2 text-center text-sm text-balance text-gray-500">
            Upload your resume to get personalized responses to your questions.
          </p>

          {file && (
            <div className="mt-8">
              <div className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 p-4">
                <div>
                  <h3 className="text-base font-medium text-black">
                    {file.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-gray-500">{fileSize} MB</p>
                </div>

                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
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
                    'border border-dashed border-gray-300 min-h-60 flex items-center justify-center rounded-lg p-4 mt-8 bg-gray-50 cursor-pointer hover:border-black transition-colors',
                    isDragActive && 'border-black bg-gray-100',
                  ),
                })}
              >
                <input {...getInputProps()} />
                <div className="mx-auto flex max-w-2xs flex-col items-center text-center text-balance">
                  <PlusIcon className="size-5 text-gray-500" />
                  <p className="mt-4 text-gray-600">
                    Drag and drop your resume here or{' '}
                    <span className="font-semibold text-black">
                      click to browse
                    </span>
                  </p>
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-gray-500">
                Only PDF files (max 2MB in size) are supported
              </p>
            </>
          )}

          {!defaultUserResume && (
            <>
              <button
                type="submit"
                className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg bg-black p-1 py-3 leading-none tracking-wide text-white transition-colors hover:bg-gray-900 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-[loading=true]:cursor-wait"
                data-loading={String(isUploading)}
                disabled={!file || isUploading || isDeletingResume}
              >
                {isUploading ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  'Upload Resume'
                )}
              </button>

              <p className="mt-4 text-center text-xs text-gray-500">
                You can also export your resume from{' '}
                <button
                  type="button"
                  onClick={() => setShowLinkedInExport(true)}
                  className="text-black underline underline-offset-2 hover:text-gray-600"
                >
                  LinkedIn
                </button>
              </p>
            </>
          )}
        </form>
      )}
    </Modal>
  );
}
