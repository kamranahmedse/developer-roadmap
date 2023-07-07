import { useState } from "preact/hooks"

export function NotificationBadge() {
  const [notifyCount, setNotifyCount] = useState(99)

  return (
    <div className="absolute -top-1 -left-1.5 p-1 rounded-xl bg-white text-black text-xs leading-none">{notifyCount}</div>
  )
}
