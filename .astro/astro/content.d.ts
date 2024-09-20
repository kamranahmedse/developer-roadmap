declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"authors": {
"ebrahim-bharmal.md": {
	id: "ebrahim-bharmal.md";
  slug: "ebrahim-bharmal";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"ekene.md": {
	id: "ekene.md";
  slug: "ekene";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"fernando.md": {
	id: "fernando.md";
  slug: "fernando";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"jesse-li.md": {
	id: "jesse-li.md";
  slug: "jesse-li";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"kamran.md": {
	id: "kamran.md";
  slug: "kamran";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"peter-thaleikis.md": {
	id: "peter-thaleikis.md";
  slug: "peter-thaleikis";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"william.md": {
	id: "william.md";
  slug: "william";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
};
"guides": {
"asymptotic-notation.md": {
	id: "asymptotic-notation.md";
  slug: "asymptotic-notation";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"avoid-render-blocking-javascript-with-async-defer.md": {
	id: "avoid-render-blocking-javascript-with-async-defer.md";
  slug: "avoid-render-blocking-javascript-with-async-defer";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"backend-developer-skills.md": {
	id: "backend-developer-skills.md";
  slug: "backend-developer-skills";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"backend-developer-tools.md": {
	id: "backend-developer-tools.md";
  slug: "backend-developer-tools";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"backend-languages.md": {
	id: "backend-languages.md";
  slug: "backend-languages";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"backend-project-ideas.md": {
	id: "backend-project-ideas.md";
  slug: "backend-project-ideas";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"backend-technologies.md": {
	id: "backend-technologies.md";
  slug: "backend-technologies";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"basic-authentication.md": {
	id: "basic-authentication.md";
  slug: "basic-authentication";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"basics-of-authentication.md": {
	id: "basics-of-authentication.md";
  slug: "basics-of-authentication";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"big-o-notation.md": {
	id: "big-o-notation.md";
  slug: "big-o-notation";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"character-encodings.md": {
	id: "character-encodings.md";
  slug: "character-encodings";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"ci-cd.md": {
	id: "ci-cd.md";
  slug: "ci-cd";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"consistency-patterns-in-distributed-systems.md": {
	id: "consistency-patterns-in-distributed-systems.md";
  slug: "consistency-patterns-in-distributed-systems";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"design-patterns-for-humans.md": {
	id: "design-patterns-for-humans.md";
  slug: "design-patterns-for-humans";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"devops-career-path.md": {
	id: "devops-career-path.md";
  slug: "devops-career-path";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"devops-engineer.md": {
	id: "devops-engineer.md";
  slug: "devops-engineer";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"devops-skills.md": {
	id: "devops-skills.md";
  slug: "devops-skills";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"devops-vs-sre.md": {
	id: "devops-vs-sre.md";
  slug: "devops-vs-sre";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"dhcp-in-one-picture.md": {
	id: "dhcp-in-one-picture.md";
  slug: "dhcp-in-one-picture";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"dns-in-one-picture.md": {
	id: "dns-in-one-picture.md";
  slug: "dns-in-one-picture";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"free-resources-to-learn-llms.md": {
	id: "free-resources-to-learn-llms.md";
  slug: "free-resources-to-learn-llms";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"frontend-developer-skills.md": {
	id: "frontend-developer-skills.md";
  slug: "frontend-developer-skills";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"frontend-languages.md": {
	id: "frontend-languages.md";
  slug: "frontend-languages";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"full-stack-developer-skills.md": {
	id: "full-stack-developer-skills.md";
  slug: "full-stack-developer-skills";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"full-stack-vs-software-engineer.md": {
	id: "full-stack-vs-software-engineer.md";
  slug: "full-stack-vs-software-engineer";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"history-of-javascript.md": {
	id: "history-of-javascript.md";
  slug: "history-of-javascript";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"how-to-become-devops-engineer.md": {
	id: "how-to-become-devops-engineer.md";
  slug: "how-to-become-devops-engineer";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"how-to-become-frontend-developer.md": {
	id: "how-to-become-frontend-developer.md";
  slug: "how-to-become-frontend-developer";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"how-to-setup-a-jump-server.md": {
	id: "how-to-setup-a-jump-server.md";
  slug: "how-to-setup-a-jump-server";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"http-basic-authentication.md": {
	id: "http-basic-authentication.md";
  slug: "http-basic-authentication";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"http-caching.md": {
	id: "http-caching.md";
  slug: "http-caching";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"introduction-to-llms.md": {
	id: "introduction-to-llms.md";
  slug: "introduction-to-llms";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"java-developer-skills.md": {
	id: "java-developer-skills.md";
  slug: "java-developer-skills";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"journey-to-http2.md": {
	id: "journey-to-http2.md";
  slug: "journey-to-http2";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"jwt-authentication.md": {
	id: "jwt-authentication.md";
  slug: "jwt-authentication";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"levels-of-seniority.md": {
	id: "levels-of-seniority.md";
  slug: "levels-of-seniority";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"oauth.md": {
	id: "oauth.md";
  slug: "oauth";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"proxy-servers.md": {
	id: "proxy-servers.md";
  slug: "proxy-servers";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"random-numbers.md": {
	id: "random-numbers.md";
  slug: "random-numbers";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"scaling-databases.md": {
	id: "scaling-databases.md";
  slug: "scaling-databases";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"session-authentication.md": {
	id: "session-authentication.md";
  slug: "session-authentication";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"session-based-authentication.md": {
	id: "session-based-authentication.md";
  slug: "session-based-authentication";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"setup-and-auto-renew-ssl-certificates.md": {
	id: "setup-and-auto-renew-ssl-certificates.md";
  slug: "setup-and-auto-renew-ssl-certificates";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"single-command-database-setup.md": {
	id: "single-command-database-setup.md";
  slug: "single-command-database-setup";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"ssl-tls-https-ssh.md": {
	id: "ssl-tls-https-ssh.md";
  slug: "ssl-tls-https-ssh";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"sso.md": {
	id: "sso.md";
  slug: "sso";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"token-authentication.md": {
	id: "token-authentication.md";
  slug: "token-authentication";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"torrent-client.md": {
	id: "torrent-client.md";
  slug: "torrent-client";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"unfamiliar-codebase.md": {
	id: "unfamiliar-codebase.md";
  slug: "unfamiliar-codebase";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"what-are-web-vitals.md": {
	id: "what-are-web-vitals.md";
  slug: "what-are-web-vitals";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"what-is-internet.md": {
	id: "what-is-internet.md";
  slug: "what-is-internet";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"what-is-sli-slo-sla.md": {
	id: "what-is-sli-slo-sla.md";
  slug: "what-is-sli-slo-sla";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"why-build-it-and-they-will-come-wont-work-anymore.md": {
	id: "why-build-it-and-they-will-come-wont-work-anymore.md";
  slug: "why-build-it-and-they-will-come-wont-work-anymore";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
};
"question-groups": {
"backend.md": {
	id: "backend.md";
  slug: "backend";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops.md": {
	id: "devops.md";
  slug: "devops";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend.md": {
	id: "frontend.md";
  slug: "frontend";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript.md": {
	id: "javascript.md";
  slug: "javascript";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"nodejs.md": {
	id: "nodejs.md";
  slug: "nodejs";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"react.md": {
	id: "react.md";
  slug: "react";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
