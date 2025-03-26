import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import 'react-tooltip/dist/react-tooltip.css';
import { formatActivityDate, formatMonthDate } from '../../lib/date';
import type { UserActivityCount } from '../../api/user';
import dayjs from 'dayjs';

type UserActivityHeatmapProps = {
  activity: UserActivityCount;
  joinedAt: string;
};

const legends = [
  { count: '1-2', color: 'bg-gray-200' },
  { count: '3-4', color: 'bg-gray-300' },
  { count: '5-9', color: 'bg-gray-500' },
  { count: '10-19', color: 'bg-gray-600' },
  { count: '20+', color: 'bg-gray-800' },
];

type ReactCalendarHeatmapValue<T> = { date: T; count: number };
type TooltipDataAttrs = { /* TooltipDataAttrs türünü burada tanımlayın */ };

export function UserActivityHeatmap(props: UserActivityHeatmapProps) {
  const { activity } = props;
  const data = Object.entries(activity.activityCount).map(([date, count]) => ({
    date,
    count,
  }));

  const startDate = dayjs().subtract(1, 'year').toDate();
  const endDate = dayjs().toDate();

  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="-mx-4 mb-8 flex justify-between border-b px-4 pb-3">
        <div className="">
          <h2 className="mb-0.5 font-semibold">Activity</h2>
          <p className="text-sm text-gray-500">
            Progress updates over the past year
          </p>
        </div>
        <span className="text-sm text-gray-400">
          Member since: {formatMonthDate(props.joinedAt)}
        </span>
      </div>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={data}
        classForValue={(value) => {
          if (!value) {
            return 'fill-gray-100 rounded-md [rx:2px] focus:outline-none';
          }

          const { count } = value;
          if (count >= 20) {
            return 'fill-gray-800 rounded-md [rx:2px] focus:outline-none';
          } else if (count >= 10) {
            return 'fill-gray-600 rounded-md [rx:2px] focus:outline-none';
          } else if (count >= 5) {
            return 'fill-gray-500 rounded-md [rx:2px] focus:outline-none';
          } else if (count >= 3) {
            return 'fill-gray-300 rounded-md [rx:2px] focus:outline-none';
          } else {
            return 'fill-gray-200 rounded-md [rx:2px] focus:outline-none';
          }
        }}
        tooltipDataAttrs={(value): TooltipDataAttrs => {
          if (!value) {
            return {
              'data-tooltip': 'No activity on this day'
            };
          }
          return {
            'data-tooltip': `${value.count} activities on ${value.date}`
          };
        }}
      />

      <ReactTooltip
        id="user-activity-tip"
        className="!rounded-lg !bg-gray-900 !p-1 !px-2 !text-sm"
      />

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-400">
          Number of topics marked as learning, or completed by day
        </span>
        <div className="flex items-center">
          <span className="mr-2 text-xs text-gray-500">Less</span>
          {legends.map((legend) => (
            <div
              key={legend.count}
              className="flex items-center"
              data-tooltip-id="user-activity-tip"
              data-tooltip-content={`${legend.count} Updates`}
            >
              <div className={`h-3 w-3 ${legend.color} mr-1 rounded-sm`}></div>
            </div>
          ))}
          <span className="ml-2 text-xs text-gray-500">More</span>
          <ReactTooltip
            id="user-activity-tip"
            className="!rounded-lg !bg-gray-900 !p-1 !px-2 !text-sm"
          />
        </div>
      </div>
    </div>
  );
}
