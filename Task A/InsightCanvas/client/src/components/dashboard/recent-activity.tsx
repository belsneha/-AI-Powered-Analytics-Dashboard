import { Check, TrendingUp, Users, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Activity } from "@shared/schema";

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "check":
        return Check;
      case "chart-line":
        return TrendingUp;
      case "users":
        return Users;
      case "exclamation":
        return AlertTriangle;
      default:
        return Check;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400";
      case "blue":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
      case "purple":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400";
      case "orange":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400";
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours} hours ago`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getIcon(activity.icon);
            const colorClasses = getColorClasses(activity.color);
            
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClasses}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp ? formatTimeAgo(activity.timestamp) : 'Unknown time'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
