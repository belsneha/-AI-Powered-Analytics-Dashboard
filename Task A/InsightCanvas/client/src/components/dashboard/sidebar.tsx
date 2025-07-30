import { ChartLine, Users, Settings, BarChart3, TrendingUp, Zap, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Sidebar() {
  const { toast } = useToast();

  const handleNavigation = (section: string) => {
    toast({
      title: `Navigating to ${section}`,
      description: `${section} section would be displayed here in a full application.`,
    });
  };

  return (
    <aside className="w-64 bg-card shadow-lg flex-shrink-0 border-r">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <ChartLine className="text-white h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">ADmyBRAND</h1>
            <p className="text-sm text-muted-foreground">Insights</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4 space-y-2">
        <button className="sidebar-link active w-full text-left">
          <TrendingUp className="w-5 h-5" />
          <span>Dashboard</span>
        </button>
        <button 
          className="sidebar-link w-full text-left"
          onClick={() => handleNavigation("Analytics")}
        >
          <BarChart3 className="w-5 h-5" />
          <span>Analytics</span>
        </button>
        <button 
          className="sidebar-link w-full text-left"
          onClick={() => handleNavigation("Campaigns")}
        >
          <Users className="w-5 h-5" />
          <span>Campaigns</span>
        </button>
        <button 
          className="sidebar-link w-full text-left"
          onClick={() => handleNavigation("Real-time Data")}
        >
          <Zap className="w-5 h-5" />
          <span>Real-time</span>
        </button>
        <button 
          className="sidebar-link w-full text-left"
          onClick={() => handleNavigation("Data Sources")}
        >
          <Database className="w-5 h-5" />
          <span>Data Sources</span>
        </button>
        <button 
          className="sidebar-link w-full text-left"
          onClick={() => handleNavigation("Settings")}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </nav>

      <div className="mt-auto p-4 border-t">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
          <h3 className="font-semibold text-sm">Upgrade to Pro</h3>
          <p className="text-xs opacity-90 mt-1">Get advanced analytics and unlimited campaigns</p>
          <button 
            className="mt-2 bg-white/20 hover:bg-white/30 rounded px-3 py-1 text-xs transition-colors"
            onClick={() => toast({
              title: "Upgrade Feature",
              description: "Upgrade functionality would redirect to billing page.",
            })}
          >
            Learn More
          </button>
        </div>
      </div>
    </aside>
  );
}
