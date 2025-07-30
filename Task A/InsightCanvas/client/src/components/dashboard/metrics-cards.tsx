import { DollarSign, Users, TrendingUp, Target, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Analytics } from "@shared/schema";

interface MetricsCardsProps {
  analytics?: Analytics;
}

export function MetricsCards({ analytics }: MetricsCardsProps) {
  if (!analytics) return null;

  const metrics = [
    {
      title: "Total Revenue",
      value: `$${parseFloat(analytics.revenue).toLocaleString()}`,
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      gradient: "from-green-400 to-green-600",
    },
    {
      title: "Active Users",
      value: analytics.users.toLocaleString(),
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Users,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      title: "Conversions",
      value: analytics.conversions.toLocaleString(),
      change: "-2.1%",
      changeType: "negative" as const,
      icon: Target,
      gradient: "from-purple-400 to-purple-600",
    },
    {
      title: "Growth Rate",
      value: `${parseFloat(analytics.growthRate)}%`,
      change: "+5.3%",
      changeType: "positive" as const,
      icon: TrendingUp,
      gradient: "from-orange-400 to-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const ChangeIcon = metric.changeType === "positive" ? ArrowUp : ArrowDown;
        
        return (
          <Card key={index} className="metric-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    <ChangeIcon className={`h-4 w-4 ${
                      metric.changeType === "positive" ? "text-green-500" : "text-red-500"
                    }`} />
                    <span className={`text-sm font-medium ml-1 ${
                      metric.changeType === "positive" ? "text-green-500" : "text-red-500"
                    }`}>
                      {metric.change}
                    </span>
                    <span className="text-muted-foreground text-sm ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${metric.gradient} rounded-xl flex items-center justify-center`}>
                  <Icon className="text-white h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
