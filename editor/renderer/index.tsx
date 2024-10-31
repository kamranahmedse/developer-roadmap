export function Renderer(props: {}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="mb-4 text-xl font-semibold text-center">Private Component</h2>
        <p className="mb-5 text-center">
          Renderer is a private component. If you are a collaborator and have
          access to it, run the following command:
        </p>
        <code className="block bg-gray-800 text-white p-3 rounded-md text-center font-mono">
          npm run generate-renderer
        </code>
      </div>
    </div>
  );
}
