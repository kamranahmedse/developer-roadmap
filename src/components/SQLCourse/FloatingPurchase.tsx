import { ArrowRightIcon } from 'lucide-react';

export function FloatingPurchase() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999] flex items-center justify-center p-4">
      <div className="flex w-full max-w-[800px] items-center justify-between rounded-2xl bg-yellow-950 p-5 shadow-lg ring-1 ring-yellow-500/40">
        <div className="flex flex-col">
          <h2 className="mb-1 text-xl font-medium text-white">
            Master SQL for just $59
          </h2>
          <p className="text-sm text-zinc-400">
            Get instant access to 55+ lessons, 100+ challenges, and AI-powered
            learning
          </p>
        </div>

        <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-8 py-2 font-medium text-black transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-zinc-900">
          <span className="relative flex items-center gap-2">
            Buy Now
            <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </span>
        </button>
      </div>
    </div>
  );
}
