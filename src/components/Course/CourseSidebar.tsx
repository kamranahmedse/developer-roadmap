import { Chapter } from './Chapter';

export function CourseSidebar() {
  return (
    <aside className="border-r border-zinc-800">
      <div className="border-b border-zinc-800 p-4">
        <h2 className="text-lg font-semibold">Learn SQL</h2>

        <div className="mt-4">
          <span>5% Completed</span>
          <div className="mt-2 h-1 w-full bg-zinc-800"></div>
        </div>
      </div>

      <div className="relative h-full">
        <div className="absolute inset-0 overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]">
          <Chapter
            slug="1"
            index={1}
            title="DDL Queries"
            lessons={[
              {
                slug: '1',
                index: 1,
                title: 'Creating Tables',
              },
              {
                slug: '2',
                index: 2,
                title: 'Altering Tables',
              },
            ]}
            exercises={[
              {
                slug: '3',
                index: 1,
                title: 'Quiz 1',
              },
              {
                slug: '4',
                index: 2,
                title: 'Challenge 1',
              },
            ]}
          />

          <Chapter
            slug="2"
            index={2}
            title="DML Queries"
            isActive={true}
            lessons={[
              {
                slug: '5',
                index: 1,
                title: 'Inserting Data',
              },
              {
                slug: '6',
                index: 2,
                title: 'Updating Data',
              },
            ]}
            exercises={[
              {
                slug: '7',
                index: 1,
                title: 'Quiz 2',
              },
              {
                slug: '8',
                index: 2,
                title: 'Challenge 2',
              },
            ]}
          />
        </div>
      </div>
    </aside>
  );
}
