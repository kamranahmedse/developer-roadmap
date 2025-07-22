import type { LucideIcon } from 'lucide-react';
import {
    Bot,
    GitPullRequest,
    Star,
    Users2,
} from 'lucide-react';
import { cn } from '../../lib/classname';

interface CredibilityItemProps {
  icon: LucideIcon;
  iconClassName: string;
  value: string;
  label: string;
  subLabel: string;
}

function CredibilityItem(props: CredibilityItemProps) {
  const Icon = props.icon;
  return (
    <div className="group flex flex-col items-center text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900/50">
        <Icon
          className={cn(`h-6 w-6`, props.iconClassName)}
          strokeWidth={1.5}
        />
      </div>
      <div className="text-3xl font-bold text-white">{props.value}</div>
      <div className="mt-3 text-sm font-medium text-slate-400">
        {props.label}
      </div>
      <div className="mt-1.5 text-xs text-slate-500">{props.subLabel}</div>
    </div>
  );
}

export function CredibilityStats() {
  return (
    <div className="mb-10 hidden md:block">
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8 md:p-12">
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            The Platform Developers Trust
          </h2>
          <p className="mt-2 text-lg text-slate-400">
            Join millions of developers in their learning journey
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          <CredibilityItem
            icon={Star}
            iconClassName="text-yellow-400 fill-current"
            value="#6"
            label="Most Starred Project"
            subLabel="Among 200M+ Repositories"
          />
          <CredibilityItem
            icon={Users2}
            iconClassName="text-blue-400"
            value="2.1M+"
            label="Active Developers"
            subLabel="Learning & Growing Daily"
          />
          <CredibilityItem
            icon={Bot}
            iconClassName="text-indigo-400"
            value="37K+"
            label="Discord Members"
            subLabel="Active Community Support"
          />
          <CredibilityItem
            icon={GitPullRequest}
            iconClassName="text-purple-400"
            value="1000+"
            label="Contributors"
            subLabel="Community Driven Project"
          />
        </div>
      </div>
    </div>
  );
} 