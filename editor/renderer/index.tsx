export function Renderer(props: any) {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[9999] border bg-white p-5 text-black">
      <h2 className="mb-2 text-xl font-semibold">Private Component</h2>
      <p className="mb-4">
        Renderer is a private component. If you are a collaborator and have
        access to it. Run the following command:
      </p>
      <code className="mt-5 rounded-md bg-gray-800 p-2 text-white">
        npm run generate-renderer
      </code>
    </div>
  );
}
