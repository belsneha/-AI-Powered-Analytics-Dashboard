import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Analytics } from "@shared/schema";

interface PieChartProps {
  analytics?: Analytics;
}

export function PieChart({ analytics }: PieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!analytics || !canvasRef.current) return;

    const loadChart = async () => {
      const { default: Chart } = await import('chart.js/auto');
      const ctx = canvasRef.current!.getContext('2d')!;

      // Destroy existing chart
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const trafficData = analytics.trafficSources as Record<string, number>;

      chartRef.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(trafficData),
          datasets: [{
            data: Object.values(trafficData),
            backgroundColor: [
              '#3B82F6',
              '#10B981',
              '#8B5CF6',
              '#F59E0B'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          cutout: '70%'
        }
      });
    };

    loadChart();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [analytics]);

  if (!analytics) return null;

  const trafficData = analytics.trafficSources as Record<string, number>;
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="chart-container mb-4">
          <canvas ref={canvasRef}></canvas>
        </div>
        <div className="space-y-2">
          {Object.entries(trafficData).map(([source, percentage], index) => (
            <div key={source} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 ${colors[index]} rounded-full`}></div>
                <span className="text-sm text-muted-foreground">{source}</span>
              </div>
              <span className="text-sm font-medium text-foreground">{percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
