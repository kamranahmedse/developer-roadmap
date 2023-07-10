import { useEffect, useState } from "preact/hooks"
import { httpGet } from "../../lib/http";

export function NotificationBadge() {
  const [notifyCount, setNotifyCount] = useState(0)

  function updateNotificationCount(count: number) {
    const notifyCountEl = document.querySelectorAll('#notification-count')
    if (!notifyCountEl) {
      return
    }

    notifyCountEl.forEach(el => {
      el.innerHTML = count.toString()
    })
  }

  async function getNotificationCount() {
    const { response, error } = await httpGet<{ count: number }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-notification-count`
    );
    if (error || !response) {
      console.log(error);
      return;
    }

    updateNotificationCount(response.count)
    setNotifyCount(response.count)
  }

  useEffect(() => {
    getNotificationCount()
    const listener = (e: Event) => {
      const {
        count
      } = (e as CustomEvent).detail;
      updateNotificationCount(count)
      setNotifyCount(count)
    };
    window.addEventListener('refresh-notification', listener)

    return () => {
      window.removeEventListener('refresh-notification', listener)
    }
  }, [])

  if (!notifyCount) {
    return null
  }

  return (
    <div className="absolute -top-1 -left-1.5 p-1 min-w-[20px] flex items-center justify-center rounded-xl bg-white text-black text-xs leading-none">{notifyCount}</div>
  )
}
