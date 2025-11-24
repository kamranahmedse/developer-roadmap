import { cn } from '../lib/classname';
import { Cookie } from 'lucide-react';

export function CookieSettingsButton() {
  return (
    <div className="mt-12 flex items-center justify-start">
      <button
        onClick={() => {
          // @ts-ignore
          const ot: any = window.OneTrust;
          // @ts-ignore
          const optanon: any = window.Optanon;

          if (ot) {
            ot.ToggleInfoDisplay();
          } else if (optanon) {
            optanon.ToggleInfoDisplay();
          } else {
            console.warn('OneTrust/Optanon SDK not found or not loaded yet.');
          }
        }}
        className={cn(
          'flex items-center gap-2 rounded-md bg-slate-800/80 px-3 py-1.5 text-sm text-gray-400 transition-colors hover:bg-slate-700 hover:text-white',
        )}
      >
        <Cookie className="h-4 w-4" />
        Cookie Settings
      </button>
    </div>
  );
}
