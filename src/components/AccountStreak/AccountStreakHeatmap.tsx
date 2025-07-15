import CalendarHeatmap from 'react-calendar-heatmap';
import dayjs from 'dayjs';
import { formatActivityDate } from '../../lib/date';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import './AccountStreakHeatmap.css';

const legends = [
  { count: 1, color: 'bg-slate-600' },
  { count: 3, color: 'bg-slate-500' },
  { count: 5, color: 'bg-slate-400' },
  { count: 10, color: 'bg-slate-300' },
  { count: 20, color: 'bg-slate-200' },
];

type AccountStreakHeatmapProps = {};

export function AccountStreakHeatmap(props: AccountStreakHeatmapProps) {
  const startDate = dayjs().subtract(6, 'months').toDate();
  const endDate = dayjs().toDate();

  return (
    <div className="mt-4">
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={[
          {
            date: '2024-08-01',
            count: 4,
          },
          {
            date: '2024-08-02',
            count: 10,
          },
          {
            date: '2024-08-03',
            count: 5,
          },
          {
            date: '2024-08-04',
            count: 3,
          },
          {
            date: '2024-08-05',
            count: 7,
          },
          {
            date: '2024-08-06',
            count: 2,
          },
          {
            date: '2024-08-07',
            count: 6,
          },
          {
            date: '2024-08-08',
            count: 8,
          },
          {
            date: '2024-08-09',
            count: 9,
          },
          {
            date: '2024-08-10',
            count: 1,
          },
          {
            date: '2024-08-11',
            count: 3,
          },
          {
            date: '2024-08-12',
            count: 5,
          },
          {
            date: '2024-08-13',
            count: 7,
          },
          {
            date: '2024-08-14',
            count: 8,
          },
          {
            date: '2024-08-15',
            count: 2,
          },
          {
            date: '2024-08-16',
            count: 4,
          },
          {
            date: '2024-08-17',
            count: 6,
          },
          {
            date: '2024-08-18',
            count: 8,
          },
          {
            date: '2024-08-19',
            count: 10,
          },
          {
            date: '2024-08-20',
            count: 2,
          },
          {
            date: '2024-08-21',
            count: 4,
          },
          {
            date: '2024-08-22',
            count: 6,
          },
          {
            date: '2024-08-23',
            count: 8,
          },
          {
            date: '2024-08-24',
            count: 10,
          },
          {
            date: '2024-08-25',
            count: 30,
          },
        ]}
        classForValue={(value) => {
          if (!value) {
            return 'fill-slate-700 rounded-md [rx:2px] focus:outline-hidden';
          }

          const { count } = value;
          if (count >= 20) {
            return 'fill-slate-200 rounded-md [rx:2px] focus:outline-hidden';
          } else if (count >= 10) {
            return 'fill-slate-300 rounded-md [rx:2px] focus:outline-hidden';
          } else if (count >= 5) {
            return 'fill-slate-400 rounded-md [rx:2px] focus:outline-hidden';
          } else if (count >= 3) {
            return 'fill-slate-500 rounded-md [rx:2px] focus:outline-hidden';
          } else {
            return 'fill-slate-600 rounded-md [rx:2px] focus:outline-hidden';
          }
        }}
        tooltipDataAttrs={(value: any) => {
          if (!value || !value.date) {
            return null;
          }

          const formattedDate = formatActivityDate(value.date);
          return {
            'data-tooltip-id': 'user-activity-tip',
            'data-tooltip-content': `${value.count} Updates - ${formattedDate}`,
          };
        }}
      />

      <ReactTooltip
        id="user-activity-tip"
        className="rounded-lg! bg-slate-900! p-1! px-2! text-xs!"
      />

      <div className="mt-2 flex items-center justify-end">
        <div className="flex items-center">
          <span className="mr-2 text-xs text-slate-500">Less</span>
          {legends.map((legend) => (
            <div
              key={legend.count}
              className="flex items-center"
              data-tooltip-id="user-activity-tip"
              data-tooltip-content={`${legend.count} Updates`}
            >
              <div
                className={`h-2.5 w-2.5 ${legend.color} mr-1 rounded-xs`}
              ></div>
            </div>
          ))}
          <span className="ml-2 text-xs text-slate-500">More</span>
          <ReactTooltip
            id="user-activity-tip"
            className="rounded-lg! bg-slate-900! p-1! px-2! text-sm!"
          />
        </div>
      </div>
    </div>
  );
}
