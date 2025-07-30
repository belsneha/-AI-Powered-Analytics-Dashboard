import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { LineChart } from "@/components/dashboard/line-chart";
import { PieChart } from "@/components/dashboard/pie-chart";
import { BarChart } from "@/components/dashboard/bar-chart";
import { DataTable } from "@/components/dashboard/data-table";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { RealTimeSimulator } from "@/components/dashboard/real-time-simulator";
import { AdvancedMetrics } from "@/components/dashboard/advanced-metrics";
import { ExportPanel } from "@/components/dashboard/export-panel";
import { Skeleton } from "@/components/ui/skeleton";
import type { Analytics, Campaign, Activity } from "@shared/schema";

export default function Dashboard() {
  const { data: analytics, isLoading: analyticsLoading } = useQuery<Analytics>({
    queryKey: ['/api/analytics/latest'],
  });

  const { data: campaigns, isLoading: campaignsLoading } = useQuery<Campaign[]>({
    queryKey: ['/api/campaigns'],
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery<Activity[]>({
    queryKey: ['/api/activities'],
  });

  const isLoading = analyticsLoading || campaignsLoading || activitiesLoading;

  if (isLoading) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Header />
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <Skeleton className="lg:col-span-2 h-96 rounded-xl" />
              <Skeleton className="h-96 rounded-xl" />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Skeleton className="h-96 rounded-xl" />
              <Skeleton className="h-96 rounded-xl" />
            </div>
            <Skeleton className="h-96 rounded-xl" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Header />
        <div className="p-6 space-y-6">
          <MetricsCards analytics={analytics} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-2">
              <LineChart analytics={analytics} />
            </div>
            <PieChart analytics={analytics} />
            <AdvancedMetrics />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <BarChart analytics={analytics} />
            <RecentActivity activities={activities || []} />
            <RealTimeSimulator />
            <ExportPanel />
          </div>

          <DataTable campaigns={campaigns || []} />
        </div>
      </main>
    </div>
  );
}
