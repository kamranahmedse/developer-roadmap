import { useState } from 'react';
import { Modal } from '../Modal';
import { GitHubButton } from './GitHubButton';
import { GoogleButton } from './GoogleButton';
import { LinkedInButton } from './LinkedInButton';

type CourseLoginPopupProps = {
  onClose: () => void;
};

export function CourseLoginPopup(props: CourseLoginPopupProps) {
  const { onClose } = props;

  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <Modal onClose={onClose} bodyClassName="p-5">
      <div className="mb-7 text-center">
        <p className="mb-3.5 pt-2 text-2xl font-semibold leading-5 text-slate-900">
          Let's get you started
        </p>
        <p className="mt-2 text-sm leading-4 text-slate-600">
          Login or sign up for an account to start learning
        </p>
      </div>

      <div className="flex w-full flex-col gap-2">
        <GitHubButton className="border-gray-400 hover:bg-gray-100 rounded-md" isDisabled={isDisabled} setIsDisabled={setIsDisabled} />
        <GoogleButton className="border-gray-400 hover:bg-gray-100 rounded-md" isDisabled={isDisabled} setIsDisabled={setIsDisabled} />
        <LinkedInButton className="border-gray-400 hover:bg-gray-100 rounded-md" isDisabled={isDisabled} setIsDisabled={setIsDisabled} />
      </div>
    </Modal>
  );
}
