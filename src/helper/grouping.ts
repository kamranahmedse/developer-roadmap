import { DateTime } from 'luxon';
import type { ChatHistoryWithoutMessages } from '../queries/chat-history';

export function groupChatHistory(chatHistories: ChatHistoryWithoutMessages[]) {
  const today = DateTime.now().startOf('day');

  return chatHistories?.reduce(
    (acc, chatHistory) => {
      const updatedAt = DateTime.fromJSDate(
        new Date(chatHistory.updatedAt),
      ).startOf('day');
      const diffInDays = Math.abs(updatedAt.diff(today, 'days').days);

      if (diffInDays === 0) {
        acc.today.histories.push(chatHistory);
      } else if (diffInDays <= 7) {
        acc.last7Days.histories.push(chatHistory);
      } else {
        acc.older.histories.push(chatHistory);
      }

      return acc;
    },
    {
      today: {
        title: 'Today',
        histories: [],
      },
      last7Days: {
        title: 'Last 7 Days',
        histories: [],
      },
      older: {
        title: 'Older',
        histories: [],
      },
    } as Record<
      string,
      { title: string; histories: ChatHistoryWithoutMessages[] }
    >,
  );
}
