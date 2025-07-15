import {
    Brain,
    Bot,
    Book,
    Star,
    Rocket,
    CheckCircle2,
    Zap,
    Clock,
    Crown,
    Users2,
    Wand2,
    Play,
    GitPullRequest,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/classname';

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  duration?: string;
}

function FeatureCard({
  title,
  description,
  Icon,
  duration = '2:30',
}: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-8 transition-colors hover:border-blue-400">
      <div className="group relative mb-6 aspect-video w-full overflow-hidden rounded-lg bg-slate-900/50">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <Play className="h-6 w-6 text-white" strokeWidth={2} />
          </div>
        </div>
        <div className="absolute right-2 bottom-2 rounded bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
          {duration}
        </div>
      </div>
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}

function StarRating() {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
      ))}
    </div>
  );
}

function Testimonial({
  name,
  role,
  content,
}: {
  name: string;
  role: string;
  content: string;
}) {
  return (
    <div className="flex flex-col rounded-lg border border-slate-700 bg-slate-800/50 p-6">
      <StarRating />
      <p className="mt-4 mb-auto leading-relaxed text-slate-400">{content}</p>
      <div className="mt-4">
        <div className="font-medium text-white">{name}</div>
        <div className="text-sm text-slate-500">{role}</div>
      </div>
    </div>
  );
}

interface StatsItemProps {
  icon: LucideIcon;
  text: string;
}

function StatsItem(props: StatsItemProps) {
  const Icon = props.icon;
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-6 w-6 text-purple-500" strokeWidth={1.5} />
      <span className="text-gray-300">{props.text}</span>
    </div>
  );
}

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

export function PremiumPage() {
  const handleUpgrade = () => {
    alert('Upgrade functionality coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black">
      <div className="mx-auto max-w-4xl px-4 py-20">
        {/* Hero Section */}
        <div className="mx-auto mb-20 max-w-4xl">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-slate-800/50 px-4 py-2 text-blue-400">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">
                Unlock All Premium Features
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Learn Faster with AI
            </h1>
            <p className="mb-8 text-lg text-balance text-slate-400 md:text-xl">
              Generate unlimited courses about any topic, get career guidance
              and instant answers from AI, test your skills and more
            </p>
            <button
              onClick={handleUpgrade}
              className="group mx-auto block rounded-2xl bg-gradient-to-b from-indigo-600 to-indigo-700 px-8 py-4 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25"
            >
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="font-medium text-indigo-100">
                  Upgrade for just
                </span>
                <span className="font-bold text-white">$10/month</span>
                <span className="text-white transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </button>
            <p className="mt-5 flex items-center justify-center gap-2 text-sm">
              <Clock className="h-3 w-3 text-white" />
              <span className="text-indigo-200">
                2 months free with yearly plan
              </span>
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          <StatsItem icon={Users2} text="+100K Learners" />
          <StatsItem icon={Bot} text="+135K Roadmaps" />
          <StatsItem icon={Book} text="+90K Courses" />
          <StatsItem icon={Wand2} text="+1M AI Chats" />
        </div>

        {/* Testimonials */}
        <div className="-mx-4 mb-20 md:-mx-8 lg:-mx-16 xl:-mx-68">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            What others are saying
          </h2>
          <div className="grid gap-6 px-4 md:grid-cols-4 md:px-8 lg:px-16">
            <Testimonial
              name="Gourav Khunger"
              role="Full Stack Developer"
              content="The AI tutor is absolutely brilliant! It's like having a senior developer available 24/7 to answer my questions."
            />
            <Testimonial
              name="Meabed"
              role="Tech Lead"
              content="The personalized learning paths and premium resources have helped my entire team stay up-to-date with the latest tech."
            />
            <Testimonial
              name="Mohsin Aheer"
              role="Software Engineer"
              content="The interactive exercises and real-world scenarios have significantly improved my problem-solving skills."
            />
            <Testimonial
              name="Sarah Chen"
              role="Frontend Developer"
              content="The AI-powered code reviews have been invaluable. I've learned so many best practices and modern patterns."
            />
            <Testimonial
              name="Alex Rodriguez"
              role="DevOps Engineer"
              content="Premium resources helped me master cloud architecture. The roadmaps are incredibly detailed and practical."
            />
            <Testimonial
              name="Priya Sharma"
              role="Backend Developer"
              content="Worth every penny! The AI assistant helped me solve complex problems and understand advanced concepts quickly."
            />
            <Testimonial
              name="James Wilson"
              role="Mobile Developer"
              content="The cross-platform development guides are exceptional. Helped me transition from native to React Native seamlessly."
            />
            <Testimonial
              name="Emma Thompson"
              role="UI/UX Designer"
              content="As a designer learning to code, the visual learning paths and interactive tutorials made the journey much easier."
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Everything You Need to Succeed
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              Icon={Brain}
              title="AI Learning Assistant"
              description="Get instant answers and personalized guidance from our advanced AI tutor, available 24/7."
            />
            <FeatureCard
              Icon={Bot}
              title="Custom Learning Paths"
              description="Follow AI-generated roadmaps tailored to your career goals and current skill level."
            />
            <FeatureCard
              Icon={Crown}
              title="Premium Resources"
              description="Access exclusive learning materials, guides, and best practices curated by experts."
            />
            <FeatureCard
              Icon={Clock}
              title="Time-Saving Tools"
              description="Save hours with AI-generated summaries and quick reference guides."
            />
            <FeatureCard
              Icon={Book}
              title="Interactive Exercises"
              description="Practice with real-world scenarios and get instant feedback on your solutions."
            />
            <FeatureCard
              Icon={Rocket}
              title="Career Acceleration"
              description="Get guidance on industry best practices and trending technologies."
            />
          </div>
        </div>

        {/* Credibility Stats */}
        <div className="mb-20">
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

        {/* Pricing Section */}
        <div className="mb-20">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Choose Your Plan
          </h2>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8">
              <h3 className="mb-4 text-2xl font-bold text-white">Monthly</h3>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">$10</span>
                  <span className="text-slate-400">/month</span>
                </div>
                <p className="mt-2 text-slate-400">
                  Perfect for continuous learning
                </p>
              </div>
              <button
                onClick={handleUpgrade}
                className="mb-8 w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Start Monthly Plan
              </button>
              <ul className="space-y-4 text-slate-300">
                {[
                  'AI Learning Assistant',
                  'Personalized Learning Paths',
                  'Interactive Exercises',
                  'Premium Resources',
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle2
                      className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-blue-400"
                      strokeWidth={2}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative rounded-xl border-2 border-blue-400 bg-slate-800/50 p-8">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                <span className="rounded-full bg-blue-600 px-4 py-1 text-sm font-medium text-white">
                  Most Popular
                </span>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">Yearly</h3>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">$100</span>
                  <span className="text-slate-400">/year</span>
                </div>
                <p className="mt-2 font-medium text-blue-400">
                  Save $20 (2 months free)
                </p>
              </div>
              <button
                onClick={handleUpgrade}
                className="mb-8 w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Start Yearly Plan
              </button>
              <ul className="space-y-4 text-slate-300">
                {[
                  'Everything in Monthly',
                  'Priority Support',
                  'Early Access Features',
                  'Team Collaboration Tools',
                  'Advanced Analytics',
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle2
                      className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-blue-400"
                      strokeWidth={2}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Not Ready to Commit Yet?
          </h2>
          <p className="mb-8 text-lg text-slate-400">
            Try our AI features for free and experience the power of AI-assisted
            learning before upgrading.
          </p>
          <a
            href="/ai"
            className="group inline-flex items-center gap-3 rounded-full bg-slate-800/50 px-6 py-3 text-blue-400 ring-1 ring-slate-700/50 transition-all hover:bg-slate-800 hover:text-blue-300 hover:ring-blue-400/50"
          >
            <Bot className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span className="text-lg font-medium">
              Try AI Features for Free
            </span>
            <span className="transform transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
