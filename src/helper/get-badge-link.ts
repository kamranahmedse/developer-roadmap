import type { RoadmapOptionProps } from "../components/RoadCard/RoadmapSelect";
import type { useAuth } from "../hooks/use-auth";

export type GetBadgeLinkProps = {
  user: ReturnType<typeof useAuth>;
  variant: 'dark' | 'light';
  badge: 'tall' | 'wide';
  roadmaps?: RoadmapOptionProps[]
};

export function getBadgeLink({ user, variant, badge, roadmaps }: GetBadgeLinkProps) {
  const badgeUrl = new URL(`${import.meta.env.PUBLIC_API_URL}/v1-badge/${badge}/${user?.id}`);
  if (variant) {
    badgeUrl.searchParams.set('variant', variant);
  }
  if (roadmaps && roadmaps?.length > 0) {
    for (const roadmap of roadmaps) {
      badgeUrl.searchParams.append('roadmaps', roadmap.value);
    }
  }
  const textareaContent = `
  <a href="${badgeUrl}">
    <img src="${badgeUrl}" alt="${user?.name}${user?.name && "'s"} Road Card"/>
  </a>
      `.trim();
  const markdownSnippet = `
      [![${user?.name}${user?.name && "'s"
    } Road Card](${badgeUrl})](${badgeUrl})
          `.trim();

  return {
    badgeUrl: badgeUrl.toString(),
    textareaContent,
    markdownSnippet,
  };
}
