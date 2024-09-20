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
"backend/backend.md": {
	id: "backend/backend.md";
  slug: "backend/backend";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/anomaly-detection.md": {
	id: "backend/content/anomaly-detection.md";
  slug: "backend/content/anomaly-detection";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/api-dependencies.md": {
	id: "backend/content/api-dependencies.md";
  slug: "backend/content/api-dependencies";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/api-endpoint.md": {
	id: "backend/content/api-endpoint.md";
  slug: "backend/content/api-endpoint";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/api-tests.md": {
	id: "backend/content/api-tests.md";
  slug: "backend/content/api-tests";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/api-versioning.md": {
	id: "backend/content/api-versioning.md";
  slug: "backend/content/api-versioning";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/batch-processing.md": {
	id: "backend/content/batch-processing.md";
  slug: "backend/content/batch-processing";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/benefits-drawbacks-microservices.md": {
	id: "backend/content/benefits-drawbacks-microservices.md";
  slug: "backend/content/benefits-drawbacks-microservices";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/bg-tasks.md": {
	id: "backend/content/bg-tasks.md";
  slug: "backend/content/bg-tasks";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/blue-green-deployment.md": {
	id: "backend/content/blue-green-deployment.md";
  slug: "backend/content/blue-green-deployment";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/cache-eviction.md": {
	id: "backend/content/cache-eviction.md";
  slug: "backend/content/cache-eviction";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/cap-theorem.md": {
	id: "backend/content/cap-theorem.md";
  slug: "backend/content/cap-theorem";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/ci-cd.md": {
	id: "backend/content/ci-cd.md";
  slug: "backend/content/ci-cd";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/containerization.md": {
	id: "backend/content/containerization.md";
  slug: "backend/content/containerization";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/correlation-ids.md": {
	id: "backend/content/correlation-ids.md";
  slug: "backend/content/correlation-ids";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/data-encryption.md": {
	id: "backend/content/data-encryption.md";
  slug: "backend/content/data-encryption";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/db-connections.md": {
	id: "backend/content/db-connections.md";
  slug: "backend/content/db-connections";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/deadlock-db-transaction.md": {
	id: "backend/content/deadlock-db-transaction.md";
  slug: "backend/content/deadlock-db-transaction";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/debugging-backend.md": {
	id: "backend/content/debugging-backend.md";
  slug: "backend/content/debugging-backend";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/decompose-microservices.md": {
	id: "backend/content/decompose-microservices.md";
  slug: "backend/content/decompose-microservices";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/distributed-caching.md": {
	id: "backend/content/distributed-caching.md";
  slug: "backend/content/distributed-caching";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/eventual-consistency.md": {
	id: "backend/content/eventual-consistency.md";
  slug: "backend/content/eventual-consistency";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/fault-tolerance.md": {
	id: "backend/content/fault-tolerance.md";
  slug: "backend/content/fault-tolerance";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/file-uploads.md": {
	id: "backend/content/file-uploads.md";
  slug: "backend/content/file-uploads";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/fulltext-search.md": {
	id: "backend/content/fulltext-search.md";
  slug: "backend/content/fulltext-search";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/gdpr-compliance.md": {
	id: "backend/content/gdpr-compliance.md";
  slug: "backend/content/gdpr-compliance";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/high-available-storage.md": {
	id: "backend/content/high-available-storage.md";
  slug: "backend/content/high-available-storage";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/http-request-response-cycle.md": {
	id: "backend/content/http-request-response-cycle.md";
  slug: "backend/content/http-request-response-cycle";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/idempotency.md": {
	id: "backend/content/idempotency.md";
  slug: "backend/content/idempotency";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/instrument-monitor.md": {
	id: "backend/content/instrument-monitor.md";
  slug: "backend/content/instrument-monitor";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/iot-streams.md": {
	id: "backend/content/iot-streams.md";
  slug: "backend/content/iot-streams";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/load-balanced-session.md": {
	id: "backend/content/load-balanced-session.md";
  slug: "backend/content/load-balanced-session";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/load-testing-api.md": {
	id: "backend/content/load-testing-api.md";
  slug: "backend/content/load-testing-api";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/long-running.md": {
	id: "backend/content/long-running.md";
  slug: "backend/content/long-running";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/maintainable-code.md": {
	id: "backend/content/maintainable-code.md";
  slug: "backend/content/maintainable-code";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/message-queue.md": {
	id: "backend/content/message-queue.md";
  slug: "backend/content/message-queue";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/optimistic-vs-pessimistic.md": {
	id: "backend/content/optimistic-vs-pessimistic.md";
  slug: "backend/content/optimistic-vs-pessimistic";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/protect-sql-injection.md": {
	id: "backend/content/protect-sql-injection.md";
  slug: "backend/content/protect-sql-injection";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/rate-limiting.md": {
	id: "backend/content/rate-limiting.md";
  slug: "backend/content/rate-limiting";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/realtime-data-sync.md": {
	id: "backend/content/realtime-data-sync.md";
  slug: "backend/content/realtime-data-sync";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/rest-core-principles.md": {
	id: "backend/content/rest-core-principles.md";
  slug: "backend/content/rest-core-principles";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/reverse-proxy.md": {
	id: "backend/content/reverse-proxy.md";
  slug: "backend/content/reverse-proxy";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/scale-backend.md": {
	id: "backend/content/scale-backend.md";
  slug: "backend/content/scale-backend";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/schema-migrations.md": {
	id: "backend/content/schema-migrations.md";
  slug: "backend/content/schema-migrations";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/secure-api.md": {
	id: "backend/content/secure-api.md";
  slug: "backend/content/secure-api";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/secure-interservice.md": {
	id: "backend/content/secure-interservice.md";
  slug: "backend/content/secure-interservice";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/session-management.md": {
	id: "backend/content/session-management.md";
  slug: "backend/content/session-management";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/sql-vs-nosql.md": {
	id: "backend/content/sql-vs-nosql.md";
  slug: "backend/content/sql-vs-nosql";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/sso.md": {
	id: "backend/content/sso.md";
  slug: "backend/content/sso";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/statelessness-http.md": {
	id: "backend/content/statelessness-http.md";
  slug: "backend/content/statelessness-http";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"backend/content/webhooks.md": {
	id: "backend/content/webhooks.md";
  slug: "backend/content/webhooks";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/ansible-benefits.md": {
	id: "devops/content/ansible-benefits.md";
  slug: "devops/content/ansible-benefits";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/auto-scaling.md": {
	id: "devops/content/auto-scaling.md";
  slug: "devops/content/auto-scaling";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/blue-green-deployment.md": {
	id: "devops/content/blue-green-deployment.md";
  slug: "devops/content/blue-green-deployment";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/build-pipelines.md": {
	id: "devops/content/build-pipelines.md";
  slug: "devops/content/build-pipelines";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/canary-release.md": {
	id: "devops/content/canary-release.md";
  slug: "devops/content/canary-release";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/cicd-setup.md": {
	id: "devops/content/cicd-setup.md";
  slug: "devops/content/cicd-setup";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/cluster-health.md": {
	id: "devops/content/cluster-health.md";
  slug: "devops/content/cluster-health";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/common-iac-tools.md": {
	id: "devops/content/common-iac-tools.md";
  slug: "devops/content/common-iac-tools";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/container-consistency.md": {
	id: "devops/content/container-consistency.md";
  slug: "devops/content/container-consistency";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/container-vs-vm.md": {
	id: "devops/content/container-vs-vm.md";
  slug: "devops/content/container-vs-vm";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/continuous-monitoring.md": {
	id: "devops/content/continuous-monitoring.md";
  slug: "devops/content/continuous-monitoring";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/data-migration.md": {
	id: "devops/content/data-migration.md";
  slug: "devops/content/data-migration";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/devsecops.md": {
	id: "devops/content/devsecops.md";
  slug: "devops/content/devsecops";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/docker-compose.md": {
	id: "devops/content/docker-compose.md";
  slug: "devops/content/docker-compose";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/explain-ci-vs-cd.md": {
	id: "devops/content/explain-ci-vs-cd.md";
  slug: "devops/content/explain-ci-vs-cd";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/health-monitor.md": {
	id: "devops/content/health-monitor.md";
  slug: "devops/content/health-monitor";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/high-availability.md": {
	id: "devops/content/high-availability.md";
  slug: "devops/content/high-availability";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/iac-concept.md": {
	id: "devops/content/iac-concept.md";
  slug: "devops/content/iac-concept";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/implement-logging.md": {
	id: "devops/content/implement-logging.md";
  slug: "devops/content/implement-logging";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/kubernetes-components.md": {
	id: "devops/content/kubernetes-components.md";
  slug: "devops/content/kubernetes-components";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/kubernetes-operators.md": {
	id: "devops/content/kubernetes-operators.md";
  slug: "devops/content/kubernetes-operators";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/load-balancer.md": {
	id: "devops/content/load-balancer.md";
  slug: "devops/content/load-balancer";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/microservice-challenges.md": {
	id: "devops/content/microservice-challenges.md";
  slug: "devops/content/microservice-challenges";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/microservice-vs-monolithic.md": {
	id: "devops/content/microservice-vs-monolithic.md";
  slug: "devops/content/microservice-vs-monolithic";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/migrate-environment.md": {
	id: "devops/content/migrate-environment.md";
  slug: "devops/content/migrate-environment";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/multi-cloud-kubernetes.md": {
	id: "devops/content/multi-cloud-kubernetes.md";
  slug: "devops/content/multi-cloud-kubernetes";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/multi-cloud.md": {
	id: "devops/content/multi-cloud.md";
  slug: "devops/content/multi-cloud";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/network-configuration.md": {
	id: "devops/content/network-configuration.md";
  slug: "devops/content/network-configuration";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/optimize-cicd.md": {
	id: "devops/content/optimize-cicd.md";
  slug: "devops/content/optimize-cicd";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/orchestration.md": {
	id: "devops/content/orchestration.md";
  slug: "devops/content/orchestration";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/popular-cicd-tools.md": {
	id: "devops/content/popular-cicd-tools.md";
  slug: "devops/content/popular-cicd-tools";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/purpose-of-cm.md": {
	id: "devops/content/purpose-of-cm.md";
  slug: "devops/content/purpose-of-cm";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/reverse-proxy.md": {
	id: "devops/content/reverse-proxy.md";
  slug: "devops/content/reverse-proxy";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/role-of-devops.md": {
	id: "devops/content/role-of-devops.md";
  slug: "devops/content/role-of-devops";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/scaling-differences.md": {
	id: "devops/content/scaling-differences.md";
  slug: "devops/content/scaling-differences";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/secret-management.md": {
	id: "devops/content/secret-management.md";
  slug: "devops/content/secret-management";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/serverless-computing.md": {
	id: "devops/content/serverless-computing.md";
  slug: "devops/content/serverless-computing";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/stateful-applications.md": {
	id: "devops/content/stateful-applications.md";
  slug: "devops/content/stateful-applications";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/what-is-devops.md": {
	id: "devops/content/what-is-devops.md";
  slug: "devops/content/what-is-devops";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/what-is-docker.md": {
	id: "devops/content/what-is-docker.md";
  slug: "devops/content/what-is-docker";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/what-is-gitops.md": {
	id: "devops/content/what-is-gitops.md";
  slug: "devops/content/what-is-gitops";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/what-is-helm-chart.md": {
	id: "devops/content/what-is-helm-chart.md";
  slug: "devops/content/what-is-helm-chart";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/what-is-iac.md": {
	id: "devops/content/what-is-iac.md";
  slug: "devops/content/what-is-iac";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/what-is-kubernetes.md": {
	id: "devops/content/what-is-kubernetes.md";
  slug: "devops/content/what-is-kubernetes";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/what-is-prometheus.md": {
	id: "devops/content/what-is-prometheus.md";
  slug: "devops/content/what-is-prometheus";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/what-is-rollback.md": {
	id: "devops/content/what-is-rollback.md";
  slug: "devops/content/what-is-rollback";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/what-is-service-mesh.md": {
	id: "devops/content/what-is-service-mesh.md";
  slug: "devops/content/what-is-service-mesh";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/what-is-shift-left.md": {
	id: "devops/content/what-is-shift-left.md";
  slug: "devops/content/what-is-shift-left";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/what-is-version-control.md": {
	id: "devops/content/what-is-version-control.md";
  slug: "devops/content/what-is-version-control";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/content/zero-downtime.md": {
	id: "devops/content/zero-downtime.md";
  slug: "devops/content/zero-downtime";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"devops/devops.md": {
	id: "devops/devops.md";
  slug: "devops/devops";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/async-ops-js.md": {
	id: "frontend/content/async-ops-js.md";
  slug: "frontend/content/async-ops-js";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/block-inline-elems.md": {
	id: "frontend/content/block-inline-elems.md";
  slug: "frontend/content/block-inline-elems";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/box-model.md": {
	id: "frontend/content/box-model.md";
  slug: "frontend/content/box-model";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/browser-render.md": {
	id: "frontend/content/browser-render.md";
  slug: "frontend/content/browser-render";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/client-storage.md": {
	id: "frontend/content/client-storage.md";
  slug: "frontend/content/client-storage";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/closures.md": {
	id: "frontend/content/closures.md";
  slug: "frontend/content/closures";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/critical-css.md": {
	id: "frontend/content/critical-css.md";
  slug: "frontend/content/critical-css";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/csp.md": {
	id: "frontend/content/csp.md";
  slug: "frontend/content/csp";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/css-grid.md": {
	id: "frontend/content/css-grid.md";
  slug: "frontend/content/css-grid";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/css-specificity.md": {
	id: "frontend/content/css-specificity.md";
  slug: "frontend/content/css-specificity";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/css-variables.md": {
	id: "frontend/content/css-variables.md";
  slug: "frontend/content/css-variables";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/dom.md": {
	id: "frontend/content/dom.md";
  slug: "frontend/content/dom";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/em-vs-rem.md": {
	id: "frontend/content/em-vs-rem.md";
  slug: "frontend/content/em-vs-rem";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/event-delegation.md": {
	id: "frontend/content/event-delegation.md";
  slug: "frontend/content/event-delegation";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/event-listeners.md": {
	id: "frontend/content/event-listeners.md";
  slug: "frontend/content/event-listeners";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/event-loop-js.md": {
	id: "frontend/content/event-loop-js.md";
  slug: "frontend/content/event-loop-js";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/flexbox-layout.md": {
	id: "frontend/content/flexbox-layout.md";
  slug: "frontend/content/flexbox-layout";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/id-vs-class.md": {
	id: "frontend/content/id-vs-class.md";
  slug: "frontend/content/id-vs-class";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/improve-web-perf.md": {
	id: "frontend/content/improve-web-perf.md";
  slug: "frontend/content/improve-web-perf";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/js-promises.md": {
	id: "frontend/content/js-promises.md";
  slug: "frontend/content/js-promises";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/media-queries.md": {
	id: "frontend/content/media-queries.md";
  slug: "frontend/content/media-queries";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/null-vs-undefined.md": {
	id: "frontend/content/null-vs-undefined.md";
  slug: "frontend/content/null-vs-undefined";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/optimize-assets.md": {
	id: "frontend/content/optimize-assets.md";
  slug: "frontend/content/optimize-assets";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/same-origin-policy.md": {
	id: "frontend/content/same-origin-policy.md";
  slug: "frontend/content/same-origin-policy";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/seo-best-practices.md": {
	id: "frontend/content/seo-best-practices.md";
  slug: "frontend/content/seo-best-practices";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/service-workers.md": {
	id: "frontend/content/service-workers.md";
  slug: "frontend/content/service-workers";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/ssr-when.md": {
	id: "frontend/content/ssr-when.md";
  slug: "frontend/content/ssr-when";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/state-mgmt-spa.md": {
	id: "frontend/content/state-mgmt-spa.md";
  slug: "frontend/content/state-mgmt-spa";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/tree-shaking.md": {
	id: "frontend/content/tree-shaking.md";
  slug: "frontend/content/tree-shaking";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/content/vdom.md": {
	id: "frontend/content/vdom.md";
  slug: "frontend/content/vdom";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"frontend/frontend.md": {
	id: "frontend/frontend.md";
  slug: "frontend/frontend";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/alert-prompt-confirm.md": {
	id: "javascript/content/alert-prompt-confirm.md";
  slug: "javascript/content/alert-prompt-confirm";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/append-child-vs-insert-before.md": {
	id: "javascript/content/append-child-vs-insert-before.md";
  slug: "javascript/content/append-child-vs-insert-before";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/async-vs-sync.md": {
	id: "javascript/content/async-vs-sync.md";
  slug: "javascript/content/async-vs-sync";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/break-and-continue.md": {
	id: "javascript/content/break-and-continue.md";
  slug: "javascript/content/break-and-continue";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/callback-hell.md": {
	id: "javascript/content/callback-hell.md";
  slug: "javascript/content/callback-hell";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/closure.md": {
	id: "javascript/content/closure.md";
  slug: "javascript/content/closure";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/comma-operator.md": {
	id: "javascript/content/comma-operator.md";
  slug: "javascript/content/comma-operator";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/create-element.md": {
	id: "javascript/content/create-element.md";
  slug: "javascript/content/create-element";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/custom-event.md": {
	id: "javascript/content/custom-event.md";
  slug: "javascript/content/custom-event";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/debug-javascript.md": {
	id: "javascript/content/debug-javascript.md";
  slug: "javascript/content/debug-javascript";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/defer-vs-async.md": {
	id: "javascript/content/defer-vs-async.md";
  slug: "javascript/content/defer-vs-async";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/do-while-loop.md": {
	id: "javascript/content/do-while-loop.md";
  slug: "javascript/content/do-while-loop";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/equality-operator.md": {
	id: "javascript/content/equality-operator.md";
  slug: "javascript/content/equality-operator";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/error-in-async-await.md": {
	id: "javascript/content/error-in-async-await.md";
  slug: "javascript/content/error-in-async-await";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/error-in-promise.md": {
	id: "javascript/content/error-in-promise.md";
  slug: "javascript/content/error-in-promise";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/event-bubbling.md": {
	id: "javascript/content/event-bubbling.md";
  slug: "javascript/content/event-bubbling";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/event-loop.md": {
	id: "javascript/content/event-loop.md";
  slug: "javascript/content/event-loop";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/explicit-binding.md": {
	id: "javascript/content/explicit-binding.md";
  slug: "javascript/content/explicit-binding";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/filter-method.md": {
	id: "javascript/content/filter-method.md";
  slug: "javascript/content/filter-method";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/finally-block-in-promise.md": {
	id: "javascript/content/finally-block-in-promise.md";
  slug: "javascript/content/finally-block-in-promise";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/find-unique-array-values.md": {
	id: "javascript/content/find-unique-array-values.md";
  slug: "javascript/content/find-unique-array-values";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/for-each-method.md": {
	id: "javascript/content/for-each-method.md";
  slug: "javascript/content/for-each-method";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/heap-and-stack.md": {
	id: "javascript/content/heap-and-stack.md";
  slug: "javascript/content/heap-and-stack";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/hoisting.md": {
	id: "javascript/content/hoisting.md";
  slug: "javascript/content/hoisting";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/iife.md": {
	id: "javascript/content/iife.md";
  slug: "javascript/content/iife";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/immutable-object.md": {
	id: "javascript/content/immutable-object.md";
  slug: "javascript/content/immutable-object";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/increment-operator.md": {
	id: "javascript/content/increment-operator.md";
  slug: "javascript/content/increment-operator";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/infinite-loop.md": {
	id: "javascript/content/infinite-loop.md";
  slug: "javascript/content/infinite-loop";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/inheritance.md": {
	id: "javascript/content/inheritance.md";
  slug: "javascript/content/inheritance";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/labelled-statements.md": {
	id: "javascript/content/labelled-statements.md";
  slug: "javascript/content/labelled-statements";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/logical-operators.md": {
	id: "javascript/content/logical-operators.md";
  slug: "javascript/content/logical-operators";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/map-method.md": {
	id: "javascript/content/map-method.md";
  slug: "javascript/content/map-method";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/map.md": {
	id: "javascript/content/map.md";
  slug: "javascript/content/map";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/measure-dimensions.md": {
	id: "javascript/content/measure-dimensions.md";
  slug: "javascript/content/measure-dimensions";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/merge-arrays.md": {
	id: "javascript/content/merge-arrays.md";
  slug: "javascript/content/merge-arrays";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/nullish-coalescing-operator.md": {
	id: "javascript/content/nullish-coalescing-operator.md";
  slug: "javascript/content/nullish-coalescing-operator";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/parse-json.md": {
	id: "javascript/content/parse-json.md";
  slug: "javascript/content/parse-json";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/prevent-default.md": {
	id: "javascript/content/prevent-default.md";
  slug: "javascript/content/prevent-default";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/promise-all-vs-all-settled.md": {
	id: "javascript/content/promise-all-vs-all-settled.md";
  slug: "javascript/content/promise-all-vs-all-settled";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/prototype-chain.md": {
	id: "javascript/content/prototype-chain.md";
  slug: "javascript/content/prototype-chain";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/query-selector.md": {
	id: "javascript/content/query-selector.md";
  slug: "javascript/content/query-selector";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/reduce-method.md": {
	id: "javascript/content/reduce-method.md";
  slug: "javascript/content/reduce-method";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/remove-element.md": {
	id: "javascript/content/remove-element.md";
  slug: "javascript/content/remove-element";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/scroll-to-top.md": {
	id: "javascript/content/scroll-to-top.md";
  slug: "javascript/content/scroll-to-top";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/set-interval.md": {
	id: "javascript/content/set-interval.md";
  slug: "javascript/content/set-interval";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/set-timeout.md": {
	id: "javascript/content/set-timeout.md";
  slug: "javascript/content/set-timeout";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/set.md": {
	id: "javascript/content/set.md";
  slug: "javascript/content/set";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/spread-operator.md": {
	id: "javascript/content/spread-operator.md";
  slug: "javascript/content/spread-operator";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/switch-case.md": {
	id: "javascript/content/switch-case.md";
  slug: "javascript/content/switch-case";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/ternary-operator.md": {
	id: "javascript/content/ternary-operator.md";
  slug: "javascript/content/ternary-operator";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/content/variable-number-of-arguments.md": {
	id: "javascript/content/variable-number-of-arguments.md";
  slug: "javascript/content/variable-number-of-arguments";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"javascript/javascript.md": {
	id: "javascript/javascript.md";
  slug: "javascript/javascript";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"nodejs/content/commonjs-vs-esm.md": {
	id: "nodejs/content/commonjs-vs-esm.md";
  slug: "nodejs/content/commonjs-vs-esm";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"nodejs/content/error-handling.md": {
	id: "nodejs/content/error-handling.md";
  slug: "nodejs/content/error-handling";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"nodejs/content/exit-codes.md": {
	id: "nodejs/content/exit-codes.md";
  slug: "nodejs/content/exit-codes";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"nodejs/content/input-from-command-line.md": {
	id: "nodejs/content/input-from-command-line.md";
  slug: "nodejs/content/input-from-command-line";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"nodejs/content/order-priority.md": {
	id: "nodejs/content/order-priority.md";
  slug: "nodejs/content/order-priority";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"nodejs/content/process-argv.md": {
	id: "nodejs/content/process-argv.md";
  slug: "nodejs/content/process-argv";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"nodejs/content/process-cwd-vs-dirname.md": {
	id: "nodejs/content/process-cwd-vs-dirname.md";
  slug: "nodejs/content/process-cwd-vs-dirname";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"nodejs/content/web-server.md": {
	id: "nodejs/content/web-server.md";
  slug: "nodejs/content/web-server";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"nodejs/nodejs.md": {
	id: "nodejs/nodejs.md";
  slug: "nodejs/nodejs";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"react/content/component-lifecycle.md": {
	id: "react/content/component-lifecycle.md";
  slug: "react/content/component-lifecycle";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"react/content/controlled-vs-uncontrolled.md": {
	id: "react/content/controlled-vs-uncontrolled.md";
  slug: "react/content/controlled-vs-uncontrolled";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"react/content/create-portal.md": {
	id: "react/content/create-portal.md";
  slug: "react/content/create-portal";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"react/content/custom-hook.md": {
	id: "react/content/custom-hook.md";
  slug: "react/content/custom-hook";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"react/content/error-boundaries.md": {
	id: "react/content/error-boundaries.md";
  slug: "react/content/error-boundaries";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"react/content/flush-sync.md": {
	id: "react/content/flush-sync.md";
  slug: "react/content/flush-sync";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"react/content/investigate-slow-app.md": {
	id: "react/content/investigate-slow-app.md";
  slug: "react/content/investigate-slow-app";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"react/content/lazy-loading.md": {
	id: "react/content/lazy-loading.md";
  slug: "react/content/lazy-loading";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"react/content/pure-components.md": {
	id: "react/content/pure-components.md";
  slug: "react/content/pure-components";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"react/content/re-renders.md": {
	id: "react/content/re-renders.md";
  slug: "react/content/re-renders";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"react/content/ref-forwarding.md": {
	id: "react/content/ref-forwarding.md";
  slug: "react/content/ref-forwarding";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"react/content/render-list.md": {
	id: "react/content/render-list.md";
  slug: "react/content/render-list";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"react/content/strict-mode.md": {
	id: "react/content/strict-mode.md";
  slug: "react/content/strict-mode";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"react/content/suspense.md": {
	id: "react/content/suspense.md";
  slug: "react/content/suspense";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"react/content/synthetic-events.md": {
	id: "react/content/synthetic-events.md";
  slug: "react/content/synthetic-events";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"react/content/use-transition.md": {
	id: "react/content/use-transition.md";
  slug: "react/content/use-transition";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"react/content/virtual-dom.md": {
	id: "react/content/virtual-dom.md";
  slug: "react/content/virtual-dom";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
"react/react.md": {
	id: "react/react.md";
  slug: "react/react";
  body: string;
  collection: "question-groups";
  data: InferEntrySchema<"question-groups">
} & { render(): Render[".md"] };
};
"questions": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "questions";
  data: any;
  render(): Render[".md"];
}>;

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
