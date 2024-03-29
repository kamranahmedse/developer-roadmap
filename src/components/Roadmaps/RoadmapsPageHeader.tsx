export function RoadmapsPageHeader() {
  return (
    <div className="bg-white py-3 sm:py-12">
      <div className="container">
        <div className="flex flex-col items-start sm:items-center bg-white">
          <h1 className="text-2xl sm:text-5xl font-bold">Developer Roadmaps</h1>
          <p className="mb-3 mt-1 sm:my-3 text-sm sm:text-lg">
            Browse the ever-growing list of up-to-date, community driven roadmaps
          </p>
          <p className="flex flex-col sm:flex-row gap-1.5 sm:gap-3 w-full sm:w-auto mb-3 sm:mb-0">
            <a
              className="inline-block rounded-md bg-black px-3.5 py-2 sm:py-1.5 text-sm sm:text-base text-white"
              href="#"
            >
              Draw your own roadmap
            </a>
            <a
              className="inline-block rounded-md bg-gray-300 px-3.5 py-2 sm:py-1.5 text-sm sm:text-base text-black"
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
