import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RealTimeData {
  activeUsers: number;
  revenue: number;
  conversions: number;
  clicks: number;
}

export function RealTimeSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [data, setData] = useState<RealTimeData>({
    activeUsers: 1247,
    revenue: 12754.32,
    conversions: 184,
    clicks: 3847
  });
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setData(prev => ({
          activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 4,
          revenue: prev.revenue + (Math.random() * 50),
          conversions: prev.conversions + (Math.random() > 0.7 ? 1 : 0),
          clicks: prev.clicks + Math.floor(Math.random() * 5)
        }));
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
    toast({
      title: isRunning ? "Real-time Updates Paused" : "Real-time Updates Started",
      description: isRunning ? "Data simulation has been paused." : "Data is now updating every 2 seconds.",
    });
  };

  const resetData = () => {
    setData({
      activeUsers: 1247,
      revenue: 12754.32,
      conversions: 184,
      clicks: 3847
    });
    toast({
      title: "Data Reset",
      description: "Real-time data has been reset to initial values.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Real-time Analytics
            <Badge variant={isRunning ? "default" : "secondary"}>
              {isRunning ? "LIVE" : "PAUSED"}
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSimulation}
            >
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetData}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{data.activeUsers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">${data.revenue.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Revenue (Today)</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{data.conversions}</div>
            <div className="text-sm text-muted-foreground">Conversions</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{data.clicks.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Clicks</div>
          </div>
        </div>
        {isRunning && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Updating every 2 seconds
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}