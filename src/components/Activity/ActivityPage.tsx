import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { Chart as ChartJS, ChartTypeRegistry } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { httpGet } from '../../lib/http';
import { ActivityCounters } from './ActivityCounters';
import { ResourceProgress } from './ResourceProgress';
import { pageProgressMessage } from '../../stores/page';
import { EmptyActivity } from './EmptyActivity';

type ActivityResponse = {
  done: {
    today: number;
    total: number;
  };
  learning: {
    today: number;
    total: number;
    roadmaps: {
      title: string;
      id: string;
      learning: number;
      done: number;
      total: number;
      skipped: number;
      updatedAt: string;
    }[];
    bestPractices: {
      title: string;
      id: string;
      learning: number;
      done: number;
      skipped: number;
      total: number;
      updatedAt: string;
    }[];
  };
  streak: {
    count: number;
    firstVisitAt: Date | null;
    lastVisitAt: Date | null;
  };
  activity: {
    type: 'done' | 'learning' | 'pending' | 'skipped';
    createdAt: Date;
    metadata: {
      resourceId?: string;
      resourceType?: 'roadmap' | 'best-practice';
      topicId?: string;
      topicLabel?: string;
      resourceTitle?: string;
    };
  }[];
};

type ChartLegendItem = {
  title: string;
  color: string;
}

export function ActivityPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activity, setActivity] = useState<ActivityResponse>();
  const [chartLegend, setChartLegend] = useState<ChartLegendItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadActivity() {
    const { error, response } = await httpGet<ActivityResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-user-stats`
    );

    if (!response || error) {
      console.error('Error loading activity');
      console.error(error);

      return;
    }

    setActivity(response);
  }

  useEffect(() => {
    loadActivity().finally(() => {
      pageProgressMessage.set('');
      setIsLoading(false);
    });
  }, []);

  const learningRoadmaps = activity?.learning.roadmaps || [];
  const learningBestPractices = activity?.learning.bestPractices || [];

  if (isLoading) {
    return null;
  }

  const chartData = useMemo(() => {
    return {
      labels: [...learningRoadmaps, ...learningBestPractices].map(resource => resource.title),
      data: [...learningRoadmaps, ...learningBestPractices].map(resource => resource.done)
    }
  }, [activity])

  useEffect(() => {
    let chart: ChartJS<"pie", number[], string> | null = null
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) {
      return;
    }

    if (!chart) {
      chart = new ChartJS(ctx, {
        type: 'pie',
        data: {
          labels: chartData.labels,
          datasets: [{
            data: chartData.data,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false
            },
          }
        }
      });
    }
    const legendItems = chart?.legend?.legendItems || []
    const enrichedLegendItems = legendItems.map((item, index) => {
      return {
        title: item.text,
        color: item.fillStyle?.toString() || ''
      }
    })
    console.log(enrichedLegendItems)
    setChartLegend(enrichedLegendItems)

    return () => {
      chart?.destroy();
    };
  }, [chartData]);

  return (
    <>
      <ActivityCounters
        done={activity?.done || { today: 0, total: 0 }}
        learning={activity?.learning || { today: 0, total: 0 }}
        streak={activity?.streak || { count: 0 }}
      />

      <div className="mx-0 px-0 py-5 md:-mx-10 md:px-8 md:py-8">
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="font-medium">Knowledge Structure</h2>
          <div className="grid grid-cols-4 gap-5 mt-6">
            <div className="w-full aspect-square flex items-center justify-center h-full">
              <canvas
                ref={canvasRef}
              />
            </div>

            <div className="col-span-3">
              <div className="flex flex-col gap-1.5 justify-center h-full">
                {chartLegend.map((data) => (
                  <div className="flex items-center gap-2">
                    <div
                      style={{
                        background: `${data.color}`
                      }}
                      className="w-3 h-3 rounded-full"
                    />
                    <span className="text-xs text-gray-500">{data.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mx-0 px-0 py-5 md:-mx-10 md:px-8 md:py-8">
        {learningRoadmaps.length === 0 &&
          learningBestPractices.length === 0 && <EmptyActivity />}

        {(learningRoadmaps.length > 0 || learningBestPractices.length > 0) && (
          <>
            <h2 class="mb-3 text-xs uppercase text-gray-400">
              Continue Following
            </h2>
            <div class="flex flex-col gap-3">
              {learningRoadmaps
                .sort((a, b) => {
                  const updatedAtA = new Date(a.updatedAt);
                  const updatedAtB = new Date(b.updatedAt);

                  return updatedAtB.getTime() - updatedAtA.getTime();
                })
                .map((roadmap) => (
                  <ResourceProgress
                    doneCount={roadmap.done || 0}
                    learningCount={roadmap.learning || 0}
                    totalCount={roadmap.total || 0}
                    skippedCount={roadmap.skipped || 0}
                    resourceId={roadmap.id}
                    resourceType={'roadmap'}
                    updatedAt={roadmap.updatedAt}
                    title={roadmap.title}
                    onCleared={() => {
                      pageProgressMessage.set('Updating activity');
                      loadActivity().finally(() => {
                        pageProgressMessage.set('');
                      });
                    }}
                  />
                ))}

              {learningBestPractices
                .sort((a, b) => {
                  const updatedAtA = new Date(a.updatedAt);
                  const updatedAtB = new Date(b.updatedAt);

                  return updatedAtB.getTime() - updatedAtA.getTime();
                })
                .map((bestPractice) => (
                  <ResourceProgress
                    doneCount={bestPractice.done || 0}
                    totalCount={bestPractice.total || 0}
                    learningCount={bestPractice.learning || 0}
                    resourceId={bestPractice.id}
                    skippedCount={bestPractice.skipped || 0}
                    resourceType={'best-practice'}
                    title={bestPractice.title}
                    updatedAt={bestPractice.updatedAt}
                    onCleared={() => {
                      pageProgressMessage.set('Updating activity');
                      loadActivity().finally(() => {
                        pageProgressMessage.set('');
                      });
                    }}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
