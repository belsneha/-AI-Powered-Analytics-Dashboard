import { Calendar, Download, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/hooks/use-theme";
import { useToast } from "@/hooks/use-toast";
import { NotificationCenter } from "./notification-center";
import { useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState("7days");

  const handleExport = () => {
    // Generate CSV data for export
    const csvData = [
      ['Metric', 'Value', 'Change'],
      ['Revenue', '$127,543', '+12.5%'],
      ['Users', '24,891', '+8.2%'],
      ['Conversions', '1,847', '-2.1%'],
      ['Growth Rate', '23.70%', '+5.3%']
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `admybrand-analytics-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Successful",
      description: "Analytics data has been exported to CSV file.",
    });
  };

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    toast({
      title: "Date Range Updated",
      description: `Analytics data filtered to ${value === "7days" ? "last 7 days" : value === "30days" ? "last 30 days" : value === "90days" ? "last 90 days" : "custom range"}.`,
    });
  };

  return (
    <header className="bg-card shadow-sm border-b">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your campaigns.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-muted rounded-lg px-3 py-2">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <Select value={dateRange} onValueChange={handleDateRangeChange}>
              <SelectTrigger className="border-0 bg-transparent focus:ring-0 text-sm font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>

          <NotificationCenter />

          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
