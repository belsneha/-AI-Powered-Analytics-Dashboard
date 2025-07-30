import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target, Users, DollarSign, MousePointer } from "lucide-react";

interface MetricItemProps {
  title: string;
  value: string;
  target: string;
  progress: number;
  trend: "up" | "down";
  trendValue: string;
  icon: React.ReactNode;
}

function MetricItem({ title, value, target, progress, trend, trendValue, icon }: MetricItemProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <Badge variant={trend === "up" ? "default" : "secondary"}>
          {trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
          {trendValue}
        </Badge>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-semibold">{value}</span>
          <span className="text-muted-foreground">Target: {target}</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="text-xs text-muted-foreground">
          {progress}% of target achieved
        </div>
      </div>
    </div>
  );
}

export function AdvancedMetrics() {
  const metrics = [
    {
      title: "Monthly Revenue",
      value: "$127,543",
      target: "$150,000",
      progress: 85,
      trend: "up" as const,
      trendValue: "+12.5%",
      icon: <DollarSign className="h-4 w-4 text-green-500" />
    },
    {
      title: "Conversion Rate",
      value: "3.42%",
      target: "4.00%",
      progress: 86,
      trend: "up" as const,
      trendValue: "+0.8%",
      icon: <Target className="h-4 w-4 text-blue-500" />
    },
    {
      title: "User Acquisition",
      value: "2,847",
      target: "3,200",
      progress: 89,
      trend: "up" as const,
      trendValue: "+18.3%",
      icon: <Users className="h-4 w-4 text-purple-500" />
    },
    {
      title: "Click-through Rate",
      value: "2.84%",
      target: "3.50%",
      progress: 81,
      trend: "down" as const,
      trendValue: "-0.3%",
      icon: <MousePointer className="h-4 w-4 text-orange-500" />
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Goals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric, index) => (
          <MetricItem key={index} {...metric} />
        ))}
      </CardContent>
    </Card>
  );
}