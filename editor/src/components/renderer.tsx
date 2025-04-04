import { forwardRef } from 'react';

export const Renderer = forwardRef<HTMLDivElement, any>((props, ref) => {
  return (
    <div className="rdm:fixed rdm:bottom-0 rdm:left-0 rdm:right-0 rdm:top-0 rdm:z-[9999] rdm:border rdm:border-gray-200 rdm:bg-white rdm:p-5 rdm:text-black">
      <h2 className="rdm:mb-2 rdm:text-xl rdm:font-semibold">
        Private Component
      </h2>
      <p className="rdm:mb-4">
        Renderer is a private component. If you are a collaborator and have
        access to it. Run the following command:
      </p>
      <code className="rdm:mt-5 rdm:rounded-md rdm:bg-gray-800 rdm:p-2 rdm:text-white">
        npm run generate-renderer
      </code>
    </div>
  );
});

Renderer.displayName = 'Renderer';
