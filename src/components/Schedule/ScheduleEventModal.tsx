import { DateTime } from 'luxon';
import { Modal } from '../Modal';
import { ChevronRight, type LucideIcon, X } from 'lucide-react';
import { useState, type ReactNode, type SVGProps } from 'react';
import { GoogleCalendarIcon } from '../ReactIcons/GoogleCalendarIcon';
import { OutlookCalendarIcon } from '../ReactIcons/OutlookCalendarIcon';
import { AppleCalendarIcon } from '../ReactIcons/AppleCalendarIcon';
import { FileIcon } from '../ReactIcons/FileIcon';

function generateRoadmapIcsFile(
  title: string,
  details: string,
  location: string,
  startDate: Date,
  endDate: Date,
) {
  const ics = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${details}
LOCATION:${location}
DTSTART:${startDate.toISOString().replace(/-|:|\.\d+/g, '')}
DTEND:${endDate.toISOString().replace(/-|:|\.\d+/g, '')}
RRULE:FREQ=DAILY

BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Reminder: ${title} starts in 30 minutes
END:VALARM

BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Reminder: ${title} starts in 15 minutes
END:VALARM

END:VEVENT
END:VCALENDAR
  `.trim();

  return new Blob([ics], { type: 'text/calendar' });
}

type ScheduleEventModalProps = {
  roadmapTitle: string;
  roadmapId: string;
  onClose: () => void;
};

export function ScheduleEventModal(props: ScheduleEventModalProps) {
  const { onClose, roadmapId, roadmapTitle } = props;

  const [selectedCalendar, setSelectedCalendar] = useState<
    'apple' | 'outlook' | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = `https://roadmap.sh/${roadmapId}`;
  const title = `Learn ${roadmapTitle}`;
  const details = `
Learn ${roadmapTitle} on roadmap.sh

For more details, visit: https://roadmap.sh/${roadmapId}
  `.trim();

  const downloadICS = () => {
    setIsLoading(true);

    const startDate = DateTime.now().minus({
      minutes: DateTime.now().minute % 30,
    });
    const endDate = startDate.plus({ hours: 1 });
    const blob = generateRoadmapIcsFile(
      title,
      details,
      location,
      startDate.toJSDate(),
      endDate.toJSDate(),
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${roadmapTitle}.ics`;
    a.click();

    setIsLoading(false);
    URL.revokeObjectURL(url);
  };

  const handleGoogleCalendar = () => {
    setIsLoading(true);
    const baseURL =
      'https://calendar.google.com/calendar/render?action=TEMPLATE';

    const startDate = DateTime.now().minus({
      minutes: DateTime.now().minute % 30,
    });
    const endDate = startDate.plus({ hours: 1 });

    const eventDetails = new URLSearchParams({
      text: title,
      dates: `${startDate.toISO().replace(/-|:|\.\d+/g, '')}/${endDate.toISO().replace(/-|:|\.\d+/g, '')}`,
      details,
      location,
      recur: 'RRULE:FREQ=DAILY',
    }).toString();

    setIsLoading(false);
    window.open(`${baseURL}&${eventDetails}`, '_blank');
  };

  const steps = {
    apple: {
      title: 'Add to Apple Calendar',
      steps: [
        'Download the iCS File',
        'Open the downloaded file, and it will automatically open your default calendar app.',
        <>
          If Apple Calendar is not your default calendar app, open Apple
          Calendar, go to <strong>File &gt; Import</strong>, and choose the
          downloaded file.
        </>,
      ],
    },
    outlook: {
      title: 'Add to Outlook Calendar',
      steps: [
        'Download the iCS File',
        <>
          Open Outlook and go to{' '}
          <strong>File &gt; Open & Export &gt; Import/Export</strong>.
        </>,
        <>
          In the Import and Export Wizard select{' '}
          <strong>Import an iCalendar (.ics) or vCalendar file (.vcs)</strong>.
          You can then choose to keep it a separate calendar or make it a new
          calendar.
        </>,
      ],
    },
  };

  return (
    <Modal onClose={onClose} wrapperClassName="max-w-lg">
      <button
        className="absolute right-4 top-4 text-gray-400 hover:text-black"
        onClick={onClose}
      >
        <X className="h-4 w-4 stroke-[2.5]" />
      </button>

      <div className="flex flex-col items-center p-4 py-6 text-center">
        {selectedCalendar && (
          <CalendarSteps
            title={steps[selectedCalendar].title}
            steps={steps[selectedCalendar].steps}
            onDownloadICS={downloadICS}
            onCancel={() => {
              setSelectedCalendar(null);
            }}
            isLoading={isLoading}
          />
        )}

        {!selectedCalendar && (
          <>
            <h2 className="text-2xl font-medium tracking-wide">
              Add to Your Calendar
            </h2>
            <p className="mt-1 text-balance text-sm text-gray-600">
              Export the event to your calendar of choice. Future changes to
              either the original or the copy will not be reflected in the
              other.
            </p>

            <div className="mt-6 flex w-full flex-col gap-1">
              <CalendarButton
                icon={GoogleCalendarIcon}
                label="Google Calendar"
                onClick={handleGoogleCalendar}
                isLoading={isLoading}
              />
              <CalendarButton
                icon={AppleCalendarIcon}
                label="Apple Calendar"
                onClick={() => {
                  setSelectedCalendar('apple');
                }}
              />
              <CalendarButton
                icon={OutlookCalendarIcon}
                label="Outlook Calendar"
                onClick={() => {
                  setSelectedCalendar('outlook');
                }}
              />

              <CalendarButton
                icon={FileIcon}
                label="Download File (.ics)"
                onClick={downloadICS}
              />
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

type SVGIcon = (props: SVGProps<SVGSVGElement>) => ReactNode;

type CalendarButtonProps = {
  icon: LucideIcon | SVGIcon;
  label: string;
  isLoading?: boolean;
  onClick: () => void;
};

function CalendarButton(props: CalendarButtonProps) {
  const { icon: Icon, label, isLoading, onClick } = props;

  return (
    <button
      className="flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-3 leading-none hover:bg-gray-100 disabled:opacity-60 data-[loading='true']:cursor-progress"
      data-loading={isLoading}
      disabled={isLoading}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0 stroke-[2.5]" />
        {label}
      </div>
      <ChevronRight className="h-4 w-4 stroke-[2.5]" />
    </button>
  );
}

type CalendarStepsProps = {
  title: string;
  steps: (string | ReactNode)[];
  onDownloadICS: () => void;
  isLoading?: boolean;
  onCancel: () => void;
};

export function CalendarSteps(props: CalendarStepsProps) {
  const { steps, onDownloadICS, onCancel, title, isLoading } = props;

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-medium tracking-wide">{title}</h2>

      <div className="mt-6 flex flex-col gap-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
              {index + 1}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-left text-sm text-gray-800">{step}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <button
          className="flex-1 rounded-lg border border-gray-300 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-60 data-[loading='true']:cursor-progress"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          className="flex-1 rounded-lg bg-blue-600 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-60 data-[loading='true']:cursor-progress"
          onClick={onDownloadICS}
          disabled={isLoading}
          data-loading={isLoading}
        >
          Download
        </button>
      </div>
    </div>
  );
}
