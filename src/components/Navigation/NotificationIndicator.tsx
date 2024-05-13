export function NotificationIndicator() {
  return (
    <span className="absolute right-0 -top-1 text-xs uppercase tracking-wider h-3 w-3">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
    </span>
  );
}
