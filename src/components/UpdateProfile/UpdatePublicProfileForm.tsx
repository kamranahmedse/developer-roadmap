import { type FormEvent, useEffect, useState } from 'react';
import { httpGet, httpPatch } from '../../lib/http';
import { pageProgressMessage } from '../../stores/page';
import type {
  AllowedCustomRoadmapVisibility,
  AllowedProfileVisibility,
  AllowedRoadmapVisibility,
  UserDocument,
} from '../../api/user';
import { SelectionButton } from '../RoadCard/SelectionButton';
import {
  ArrowUpRight,
  Check,
  CheckCircle,
  Copy,
  Eye,
  EyeOff,
  FileBadge,
  Trophy,
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { CreateRoadmapModal } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal.tsx';
import { VisibilityDropdown } from './VisibilityDropdown.tsx';
import { ProfileUsername } from './ProfileUsername.tsx';
import UploadProfilePicture from './UploadProfilePicture.tsx';
import { SkillProfileAlert } from './SkillProfileAlert.tsx';
import { useCopyText } from '../../hooks/use-copy-text.ts';
import { cn } from '../../lib/classname.ts';

type RoadmapType = {
  id: string;
  title: string;
  isCustomResource: boolean;
};

type GetProfileSettingsResponse = Pick<
  UserDocument,
  'username' | 'profileVisibility' | 'publicConfig' | 'links'
>;

export function UpdatePublicProfileForm() {
  const [profileVisibility, setProfileVisibility] =
    useState<AllowedProfileVisibility>('public');

  const toast = useToast();

  const [isCreatingRoadmap, setIsCreatingRoadmap] = useState(false);
  const [publicProfileUrl, setPublicProfileUrl] = useState('');
  const [isAvailableForHire, setIsAvailableForHire] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(true);
  const [headline, setHeadline] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [roadmapVisibility, setRoadmapVisibility] =
    useState<AllowedRoadmapVisibility>('all');
  const [customRoadmapVisibility, setCustomRoadmapVisibility] =
    useState<AllowedCustomRoadmapVisibility>('all');
  const [roadmaps, setRoadmaps] = useState<string[]>([]);
  const [customRoadmaps, setCustomRoadmaps] = useState<string[]>([]);

  const [currentUsername, setCurrentUsername] = useState('');
  const [name, setName] = useState('');

  const [avatar, setAvatar] = useState('');
  const [github, setGithub] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [dailydev, setDailydev] = useState('');
  const [website, setWebsite] = useState('');

  const [profileRoadmaps, setProfileRoadmaps] = useState<RoadmapType[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  const { isCopied, copyText } = useCopyText();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const { response, error } = await httpPatch(
      `${import.meta.env.PUBLIC_API_URL}/v1-update-public-profile-config`,
      {
        isAvailableForHire,
        isEmailVisible,
        profileVisibility,
        headline,
        username,
        roadmapVisibility,
        customRoadmapVisibility,
        roadmaps,
        customRoadmaps,
        github,
        twitter,
        linkedin,
        website,
        name,
        email,
        dailydev,
      },
    );

    if (error || !response) {
      setIsLoading(false);
      toast.error(error?.message || 'Something went wrong');

      return;
    }

    await loadProfileSettings();
    toast.success('Profile updated successfully');
    setIsProfileUpdated(true);
  };

  const loadProfileSettings = async () => {
    setIsLoading(true);

    const { error, response } = await httpGet<UserDocument>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-profile-settings`,
    );

    if (error || !response) {
      setIsLoading(false);
      toast.error(error?.message || 'Something went wrong');

      return;
    }

    const {
      name,
      email,
      links,
      username,
      profileVisibility: defaultProfileVisibility,
      publicConfig,
      avatar,
    } = response;

    setAvatar(avatar || '');
    setPublicProfileUrl(username ? `/u/${username}` : '');
    setUsername(username || '');
    setCurrentUsername(username || '');
    setName(name || '');
    setEmail(email || '');
    setGithub(links?.github || '');
    setTwitter(links?.twitter || '');
    setLinkedin(links?.linkedin || '');
    setDailydev(links?.dailydev || '');
    setWebsite(links?.website || '');
    setProfileVisibility(defaultProfileVisibility || 'public');
    setHeadline(publicConfig?.headline || '');
    setRoadmapVisibility(publicConfig?.roadmapVisibility || 'all');
    setCustomRoadmapVisibility(publicConfig?.customRoadmapVisibility || 'all');
    setCustomRoadmaps(publicConfig?.customRoadmaps || []);
    setRoadmaps(publicConfig?.roadmaps || []);
    setIsAvailableForHire(publicConfig?.isAvailableForHire || false);
    setIsEmailVisible(publicConfig?.isEmailVisible ?? true);

    setIsLoading(false);
  };

  const loadProfileRoadmaps = async () => {
    setIsLoading(true);

    const { error, response } = await httpGet<{
      roadmaps: RoadmapType[];
    }>(`${import.meta.env.PUBLIC_API_URL}/v1-get-profile-roadmaps`);

    if (error || !response) {
      setIsLoading(false);
      toast.error(error?.message || 'Something went wrong');

      return;
    }

    setProfileRoadmaps(response?.roadmaps || []);
    setIsLoading(false);
  };

  // Make a request to the backend to fill in the form with the current values
  useEffect(() => {
    Promise.all([loadProfileSettings(), loadProfileRoadmaps()]).finally(() => {
      pageProgressMessage.set('');
    });
  }, []);

  const publicCustomRoadmaps = profileRoadmaps.filter(
    (r) => r.isCustomResource,
  );
  const publicRoadmaps = profileRoadmaps.filter((r) => !r.isCustomResource);

  return (
    <div>
      {isCreatingRoadmap && (
        <CreateRoadmapModal onClose={() => setIsCreatingRoadmap(false)} />
      )}

      <SkillProfileAlert />

      <div className="mb-8 flex flex-col justify-between gap-2 sm:mb-1 sm:flex-row">
        <div className="flex flex-grow flex-row items-center gap-2 sm:items-center">
          <h3 className="mr-1 text-xl font-bold sm:text-3xl">Skill Profile</h3>
          {publicProfileUrl && (
            <>
              <a
                href={publicProfileUrl}
                target="_blank"
                className="flex shrink-0 flex-row items-center gap-1 rounded-lg border border-black py-0.5 pl-1.5 pr-2.5 text-xs uppercase transition-colors hover:bg-black hover:text-white"
              >
                <ArrowUpRight className="h-3 w-3 stroke-[3]" />
                Visit
              </a>
              <button
                onClick={() => {
                  copyText(`${window.location.origin}${publicProfileUrl}`);
                }}
                className={cn(
                  'flex shrink-0 flex-row items-center gap-1 rounded-lg border border-black py-0.5 pl-1.5 pr-2.5 text-xs uppercase transition-colors hover:bg-black hover:text-white',
                  {
                    'bg-black text-white': isCopied,
                  },
                )}
              >
                {!isCopied && <Copy className="h-3 w-3 stroke-[2.5]" />}
                {isCopied && <Check className="h-3 w-3 stroke-[2.5]" />}
                {!isCopied ? 'Copy URL' : 'Copied!'}
              </button>
            </>
          )}
        </div>
        <VisibilityDropdown
          visibility={profileVisibility}
          setVisibility={setProfileVisibility}
        />
      </div>
      <p className="mb-8 mt-2 hidden text-sm text-gray-400 sm:mt-0 sm:block sm:text-base">
        Create your skill profile to showcase your skills.
      </p>

      <UploadProfilePicture
        type="avatar"
        label="Profile picture"
        avatarUrl={
          avatar
            ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${avatar}`
            : '/images/default-avatar.png'
        }
      />

      <form className="mt-6 space-y-4 pb-10" onSubmit={handleSubmit}>
        <div className="flex w-full flex-col">
          <label
            htmlFor="name"
            className='text-sm leading-none text-slate-500 after:text-red-400 after:content-["*"]'
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            required
            placeholder="John Doe"
            value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
          />
        </div>

        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between">
            <label
              htmlFor="email"
              className='text-sm leading-none text-slate-500 after:text-red-400 after:content-["*"]'
            >
              Email
            </label>
            <a
              href="/account/settings"
              className="text-xs text-purple-700 underline hover:text-purple-800"
            >
              Visit settings page to change email
            </a>
          </div>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            required
            disabled
            placeholder="john@example.com"
            value={email}
          />
          <div className="flex items-center justify-end gap-2 rounded-md text-xs text-gray-400">
            <div className="flex select-none items-center justify-end gap-2 rounded-md text-xs text-gray-400">
              <input
                type="checkbox"
                name="isEmailVisible"
                id="isEmailVisible"
                checked={isEmailVisible}
                onChange={(e) => setIsEmailVisible(e.target.checked)}
              />
              <label
                htmlFor="isEmailVisible"
                className="flex-grow cursor-pointer py-1.5"
              >
                Show my email on profile
              </label>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col">
          <label
            htmlFor="headline"
            className="text-sm leading-none text-slate-500"
          >
            Headline
          </label>
          <input
            type="text"
            name="headline"
            id="headline"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="Full Stack Developer"
            value={headline}
            onChange={(e) => setHeadline((e.target as HTMLInputElement).value)}
            required={profileVisibility === 'public'}
          />
        </div>

        <ProfileUsername
          username={username}
          setUsername={setUsername}
          profileVisibility={profileVisibility}
          currentUsername={currentUsername}
        />

        <div className="rounded-md border p-4">
          <h3 className="text-sm font-medium">
            Which roadmap progresses do you want to show on your profile?
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <SelectionButton
              type="button"
              text="All Progress"
              icon={Eye}
              isDisabled={false}
              isSelected={roadmapVisibility === 'all'}
              onClick={() => {
                setRoadmapVisibility('all');
                setRoadmaps([]);
              }}
            />
            <SelectionButton
              type="button"
              icon={EyeOff}
              text="Hide my Progress"
              isDisabled={false}
              isSelected={roadmapVisibility === 'none'}
              onClick={() => {
                setRoadmapVisibility('none');
                setRoadmaps([]);
              }}
            />
          </div>

          <h3 className="mt-4 text-sm text-gray-400">
            Or select the roadmaps you want to show
          </h3>
          {publicRoadmaps.length > 0 ? (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {publicRoadmaps.filter(r => r.id && r.title).map((r) => (
                <SelectionButton
                  type="button"
                  key={r.id}
                  text={r.title}
                  isDisabled={false}
                  isSelected={roadmaps.includes(r.id)}
                  onClick={() => {
                    if (roadmapVisibility !== 'selected') {
                      setRoadmapVisibility('selected');
                    }
                    if (roadmaps.includes(r.id)) {
                      setRoadmaps(roadmaps.filter((id) => id !== r.id));
                    } else {
                      setRoadmaps([...roadmaps, r.id]);
                    }
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="mt-2 rounded-lg bg-yellow-100 p-2 text-sm text-yellow-700">
              Update{' '}
              <a
                target="_blank"
                className="font-medium underline underline-offset-2 hover:text-yellow-800"
                href="/roadmaps"
              >
                your progress on roadmaps
              </a>{' '}
              to show your learning activity.
            </p>
          )}
        </div>

        <div className="rounded-md border p-4">
          <h3 className="text-sm font-medium">
            Pick your custom roadmaps to show on your profile
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <SelectionButton
              type="button"
              text="All Roadmaps"
              icon={Eye}
              isDisabled={false}
              isSelected={customRoadmapVisibility === 'all'}
              onClick={() => {
                setCustomRoadmapVisibility('all');
                setCustomRoadmaps([]);
              }}
            />
            <SelectionButton
              type="button"
              text="Hide my Roadmaps"
              icon={EyeOff}
              isDisabled={false}
              isSelected={customRoadmapVisibility === 'none'}
              onClick={() => {
                setCustomRoadmapVisibility('none');
                setCustomRoadmaps([]);
              }}
            />
          </div>

          <h3 className="mt-4 text-sm text-gray-400">
            Or select the custom roadmaps you want to show
          </h3>
          {publicCustomRoadmaps.length > 0 ? (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {publicCustomRoadmaps.map((r) => (
                <SelectionButton
                  type="button"
                  key={r.id}
                  text={r.title}
                  isDisabled={false}
                  isSelected={customRoadmaps.includes(r.id)}
                  onClick={() => {
                    if (customRoadmapVisibility !== 'selected') {
                      setCustomRoadmapVisibility('selected');
                    }

                    if (customRoadmaps.includes(r.id)) {
                      setCustomRoadmaps(
                        customRoadmaps.filter((id) => id !== r.id),
                      );
                    } else {
                      setCustomRoadmaps([...customRoadmaps, r.id]);
                    }
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="mt-2 rounded-lg bg-yellow-100 p-2 text-sm text-yellow-700">
              You do not have any custom roadmaps.{' '}
              <button
                type={'button'}
                className="font-medium underline underline-offset-2 hover:text-yellow-800"
                onClick={() => {
                  setIsCreatingRoadmap(true);
                }}
              >
                Create one now
              </button>
              .
            </p>
          )}
        </div>

        <div className="flex w-full flex-col">
          <label
            htmlFor="github"
            className="text-sm leading-none text-slate-500"
          >
            Github
          </label>
          <input
            type="text"
            name="github"
            id="github"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="https://github.com/username"
            value={github}
            onChange={(e) => setGithub((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className="flex w-full flex-col">
          <label
            htmlFor="twitter"
            className="text-sm leading-none text-slate-500"
          >
            Twitter
          </label>
          <input
            type="text"
            name="twitter"
            id="twitter"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="https://twitter.com/username"
            value={twitter}
            onChange={(e) => setTwitter((e.target as HTMLInputElement).value)}
          />
        </div>

        <div className="flex w-full flex-col">
          <label
            htmlFor="linkedin"
            className="text-sm leading-none text-slate-500"
          >
            LinkedIn
          </label>
          <input
            type="text"
            name="linkedin"
            id="linkedin"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="https://www.linkedin.com/in/username/"
            value={linkedin}
            onChange={(e) => setLinkedin((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className="flex w-full flex-col">
          <label
            htmlFor="dailydev"
            className="text-sm leading-none text-slate-500"
          >
            daily.dev
          </label>
          <input
            type="text"
            name="dailydev"
            id="dailydev"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="https://app.daily.dev/username"
            value={dailydev}
            onChange={(e) => setDailydev((e.target as HTMLInputElement).value)}
          />
        </div>

        <div className="flex w-full flex-col">
          <label
            htmlFor="website"
            className="text-sm leading-none text-slate-500"
          >
            Website
          </label>
          <input
            type="text"
            name="website"
            id="website"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="https://example.com"
            value={website}
            onChange={(e) => setWebsite((e.target as HTMLInputElement).value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex select-none items-center gap-2 rounded-md border px-3 hover:bg-gray-100">
            <input
              type="checkbox"
              name="isAvailableForHire"
              id="isAvailableForHire"
              checked={isAvailableForHire}
              onChange={(e) => setIsAvailableForHire(e.target.checked)}
            />
            <label
              htmlFor="isAvailableForHire"
              className="flex-grow cursor-pointer py-1.5"
            >
              Available for Hire
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
        >
          {isLoading ? 'Please wait..' : 'Save Profile'}
        </button>
        {isProfileUpdated && publicProfileUrl && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={cn(
                'flex shrink-0 flex-row items-center gap-1 rounded-lg border border-black py-1.5 pl-2.5 pr-3.5 text-xs uppercase text-black transition-colors hover:bg-black hover:text-white',
                isCopied
                  ? 'border-green-600 bg-green-600 text-white hover:bg-green-600 hover:text-white'
                  : '',
              )}
              onClick={() => {
                copyText(`${window.location.origin}${publicProfileUrl}`);
              }}
            >
              {isCopied ? (
                <>
                  <CheckCircle className="size-4" />
                  Copied Profile URL
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  Copy Profile URL
                </>
              )}
            </button>
            <a
              className='flex shrink-0 flex-row items-center gap-1 rounded-lg border border-black py-1.5 pl-2.5 pr-3.5 text-xs uppercase text-black transition-colors hover:bg-black hover:text-white'
              href={publicProfileUrl}
              target="_blank"
            >
              <ArrowUpRight className="size-4" />
              View Profile
            </a>
          </div>
        )}
      </form>
    </div>
  );
}
