import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Analytics } from "@shared/schema";

interface BarChartProps {
  analytics?: Analytics;
}

export function BarChart({ analytics }: BarChartProps) {
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

      const campaignData = analytics.campaignData as Record<string, { conversions: number; impressions: number }>;

      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(campaignData),
          datasets: [{
            label: 'Conversions',
            data: Object.values(campaignData).map(d => d.conversions),
            backgroundColor: '#3B82F6',
            borderRadius: 4
          }, {
            label: 'Impressions (000s)',
            data: Object.values(campaignData).map(d => d.impressions),
            backgroundColor: '#E5E7EB',
            borderRadius: 4
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
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="chart-container">
          <canvas ref={canvasRef}></canvas>
        </div>
      </CardContent>
    </Card>
  );
}
