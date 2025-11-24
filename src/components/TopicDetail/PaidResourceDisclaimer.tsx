import { useState } from 'react';
import { X } from 'lucide-react';

type PaidResourceDisclaimerProps = {
  onClose: () => void;
};

export function PaidResourceDisclaimer(props: PaidResourceDisclaimerProps) {
  const { onClose } = props;

  return (
    <div className="relative ml-3 mt-4 rounded-md bg-gray-100 p-3 px-3 text-xs text-gray-500">
      <button className="absolute right-1 top-1" onClick={onClose}>
        <X size={16} className="absolute right-2 top-2 cursor-pointer" />
      </button>

      <p className="mb-1 font-medium text-gray-800">
        Note on Premium Resources
      </p>
      <p className="mb-1">
        These are optional paid resources vetted by the roadmap team.
      </p>
      <p>
        If you purchase a resource, we may receive a small commission at no
        extra cost to you. This helps us offset the costs of running this site
        and keep it free for everyone.
      </p>
    </div>
  );
}
