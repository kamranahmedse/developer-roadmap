import { useState } from 'react';
import { cn } from '../../lib/classname.ts';

const demoItems = [
  {
    title: 'Roadmap Editor',
    description:
      '<span class="font-semibold">Powerful editor</span> to create custom roadmaps and other trackable documents',
    image: '/images/team-promo/roadmap-editor.png',
  },
  {
    title: 'Invite Members',
    description:
      'Invite your <span class="font-semibold">team members and assign roles</span>',
    image: '/images/team-promo/invite-members.png',
  },
  {
    title: 'Track Progress',
    description:
      'You and your team can <span class="font-semibold">track progress</span> on the roadmaps',
    image: '/images/team-promo/update-progress.png',
  },
  {
    title: 'Team Dashboard',
    description:
      'Keep an eye on the team progress through <span class="font-semibold">team dashboards</span>',
    image: '/images/team-promo/team-dashboard.png',
  },
  {
    title: 'Roadmaps and Documents',
    description:
      'Create as many <span class="font-semibold">roadmaps or trackable documents</span> as you want',
    image: '/images/team-promo/many-roadmaps.png',
  },
  {
    title: 'Community Roadmaps',
    description:
      'Create custom roadmaps or customize <span class="font-semibold">community roadmaps</span> to fit your needs',
    image: '/images/team-promo/our-roadmaps.png',
  },
  {
    title: 'Sharing Settings',
    description:
      'Share a roadmap or trackable document with <span class="font-semibold">everyone or specific people</span>',
    image: '/images/team-promo/sharing-settings.png',
  },
  {
    title: 'More Coming Soon!',
    description:
      '<span class="font-semibold">We have a lot more coming soon!</span>',
  },
];

export function TeamDemo() {
  const [hasViewed, setHasViewed] = useState<number[]>([0]);
  const [activeItem, setActiveItem] = useState(demoItems[0]);

  return (
    <div className="border-t py-12 hidden sm:block">
      <div className="container">
        <h2 className="mb-2 text-3xl font-bold">See how it works</h2>
        <p>Here is a sneak peek of what you can do today (more coming soon!)</p>

        <div className="relative mt-7 flex flex-row items-center gap-2.5">
          {demoItems.map((item, counter) => {
            const isActive = item === activeItem;
            const hasAlreadyViewed = hasViewed.includes(counter);

            if (!isActive) {
              return (
                <span key={item.title} className="relative flex items-center">
                  <span
                    onClick={() => {
                      setHasViewed([
                          ...hasViewed,
                          counter
                      ])
                      setActiveItem(item);
                    }}
                    className={cn('z-50 cursor-pointer rounded-full p-[6px]', {
                      'bg-black': item === activeItem,
                      'bg-gray-300 hover:bg-gray-400': item !== activeItem,
                    })}
                  />
                  {!hasAlreadyViewed && <span className="pointer-events-none absolute inline-flex h-full w-full animate-ping rounded-full bg-gray-400 opacity-75"></span> }
                </span>
              );
            }

            return (
              <span key={item.title} className=" rounded-full bg-black px-3 py-0.5 text-sm text-white">
                {activeItem.title}
              </span>
            );
          })}
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-gray-300">
          <div className="p-3">
            <p
              className="text-base text-black"
              dangerouslySetInnerHTML={{ __html: activeItem.description }}
            />
          </div>
          {activeItem.image && (
            <img
              className="rounded-b-xl border-t"
              src={activeItem.image}
              alt=""
            />
          )}
          {!activeItem.image && (
            <div className="bg-gray-50 py-4 pl-3">
              <p className="mb-3">
                Register your team now and help us shape the future of teams in
                roadmap.sh!
              </p>
              <div className="flex flex-row items-center gap-2">
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-lg border border-transparent bg-purple-600 px-5 py-2 text-base font-medium text-white hover:bg-purple-700"
                >
                  Create your Team
                </a>
                <span className="ml-1 text-base">
                  or &nbsp;
                  <a
                    href="/login"
                    className="text-purple-600 underline  hover:text-purple-700"
                  >
                    Login to your account
                  </a>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
