import type { FunctionComponent } from 'preact';

export default function LoginComponent() {
	return (
		<div className="space-y-5">
			<div className="space-y-2">
				<Button className="bg-[#333] text-white focus:ring-[#333]">
					Login with Github
				</Button>
				<Button className="bg-[#4285f4] text-white focus:ring-[#4285f4]">
					Login with Google
				</Button>
			</div>
			<div className="h-px w-full bg-slate-200" />

			<div className="text-center text-slate-500 text-sm">
				Don't have an account?{' '}
				<a href="/signup" className="font-medium text-[#4285f4]">
					Sign up
				</a>
			</div>
		</div>
	);
}

const Button: FunctionComponent<{ className?: string }> = ({
	children,
	className,
}) => {
	return (
		<button
			className={`inline-flex h-10 w-full items-center justify-center rounded border border-slate-300 p-2 text-sm font-medium outline-none transition duration-150 ease-in-out focus:ring-2 disabled:opacity-60 focus:ring-offset-1 ${className}`}
		>
			{children}
		</button>
	);
};
