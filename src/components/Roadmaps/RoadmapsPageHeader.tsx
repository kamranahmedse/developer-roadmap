export function RoadmapsPageHeader() {
  return (
    <div className="bg-white py-12">
      <div className="container">
        <div className="flex flex-col items-center bg-white">
          <h1 className="text-5xl font-bold">Developer Roadmaps</h1>
          <p className="my-3 text-lg">
            Browse ever-growing list of up-to-date, community driven roadmaps
          </p>
          <p className="flex flex-row gap-3">
            <a
              className="inline-block rounded-md bg-black px-3.5 py-1.5 text-base text-white"
              href="#"
            >
              Draw your own roadmap
            </a>
            <a
              className="inline-block rounded-md bg-gray-300 px-3.5 py-1.5 text-base text-black"
              href="#"
            >
              Generate Roadmap with AI
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
