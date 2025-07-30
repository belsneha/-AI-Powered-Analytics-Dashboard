import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Analytics } from "@shared/schema";

interface LineChartProps {
  analytics?: Analytics;
}

export function LineChart({ analytics }: LineChartProps) {
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

      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'This Year',
            data: [12000, 15000, 18000, 16000, 22000, 25000, 28000, 26000, 30000, 32000, 29000, 35000],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true
          }, {
            label: 'Last Year',
            data: [10000, 12000, 14000, 13000, 18000, 20000, 22000, 21000, 24000, 26000, 23000, 28000],
            borderColor: '#9CA3AF',
            backgroundColor: 'transparent',
            tension: 0.4
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
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Revenue Trend</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">This Year</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Last Year</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="chart-container">
          <canvas ref={canvasRef}></canvas>
        </div>
      </CardContent>
    </Card>
  );
}
