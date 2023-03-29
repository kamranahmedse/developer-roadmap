import type { FunctionComponent } from 'preact';

export default function LoginComponent() {
	return (
		<div>
			<div className="text-center">
				<h2 className="font-semibold text-2xl leading-5 text-slate-900">
					Welcome back
				</h2>
				<p className="text-slate-600 mt-2 text-sm leading-4">
					Please enter your details.
				</p>
			</div>

			<div className="space-y-2 mt-10">
				<GithubLoginButton />
				<GoogleLoginButton />
			</div>

			<div className="flex items-center gap-2 text-sm text-slate-600 py-6">
				<div className="h-px w-full bg-slate-200" />
				OR
				<div className="h-px w-full bg-slate-200" />
			</div>

			<div>
				<label htmlFor="email" className="sr-only">
					Email address
				</label>
				<input
					id="email"
					name="email"
					type="email"
					autoComplete="email"
					required
					className="block w-full appearance-none border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400  focus:ring-black rounded-lg outline-none transition duration-150 ease-in-out focus:ring-2 focus:ring-offset-1"
					placeholder="Enter you email"
				/>
				<button className="inline-flex h-10 w-full bg-black text-white focus:ring-black items-center justify-center rounded-lg border border-slate-300 p-2 text-sm font-medium outline-none transition duration-150 ease-in-out focus:ring-2 disabled:opacity-60 focus:ring-offset-1 mt-3">
					Continue
				</button>
			</div>

			<div className="text-center text-slate-600 text-sm mt-6">
				Don't have an account?{' '}
				<a href="/signup" className="font-medium text-[#4285f4]">
					Sign up
				</a>
			</div>
		</div>
	);
}

export const GithubLoginButton: FunctionComponent<{ className?: string }> = ({
	className,
}) => {
	return (
		<button className="inline-flex h-10 w-full bg-white text-black focus:ring-[#333] items-center justify-center rounded border border-slate-300 p-2 text-sm font-medium outline-none transition duration-150 ease-in-out focus:ring-2 disabled:opacity-60 focus:ring-offset-1">
			<svg
				width="18"
				height="18"
				viewBox="0 0 96 96"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
					fill="#24292f"
				/>
			</svg>
			<span className="ml-2">Continue with Github</span>
		</button>
	);
};

export const GoogleLoginButton: FunctionComponent<{ className?: string }> = ({
	className,
}) => {
	return (
		<button className="inline-flex h-10 w-full bg-white text-black focus:ring-[#333] items-center justify-center rounded border border-slate-300 p-2 text-sm font-medium outline-none transition duration-150 ease-in-out focus:ring-2 disabled:opacity-60 focus:ring-offset-1">
			<GoogleLogo />
			<span className="ml-2">Continue with Google</span>
		</button>
	);
};

function GoogleLogo() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height={18}
			viewBox="0 0 186.69 190.5"
		>
			<g transform="translate(1184.583 765.171)">
				<path
					clipPath="none"
					mask="none"
					d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
					fill="#4285f4"
				/>
				<path
					clipPath="none"
					mask="none"
					d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
					fill="#34a853"
				/>
				<path
					clipPath="none"
					mask="none"
					d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
					fill="#fbbc05"
				/>
				<path
					d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
					fill="#ea4335"
					clipPath="none"
					mask="none"
				/>
			</g>
		</svg>
	);
}
