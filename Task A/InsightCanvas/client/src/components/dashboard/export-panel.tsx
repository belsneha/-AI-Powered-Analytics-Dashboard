import { useState } from "react";
import { Download, FileText, Image, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export function ExportPanel() {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const exportOptions = [
    {
      type: "csv",
      title: "CSV Export",
      description: "Export campaign data as CSV",
      icon: <FileSpreadsheet className="h-4 w-4" />,
      color: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
    },
    {
      type: "pdf",
      title: "PDF Report",
      description: "Generate comprehensive analytics report",
      icon: <FileText className="h-4 w-4" />,
      color: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
    },
    {
      type: "png",
      title: "Chart Images",
      description: "Export charts as PNG images",
      icon: <Image className="h-4 w-4" />,
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
    }
  ];

  const handleExport = async (type: string) => {
    setIsExporting(true);
    
    try {
      if (type === "csv") {
        const csvData = [
          ['Campaign Name', 'Platform', 'Status', 'Impressions', 'Clicks', 'CTR', 'Spend'],
          ['Summer Sale Campaign', 'Google Ads', 'Active', '124,593', '3,847', '3.09%', '$2,459'],
          ['Holiday Promotions', 'Facebook Ads', 'Paused', '89,237', '2,183', '2.45%', '$1,892'],
          ['Brand Awareness', 'LinkedIn Ads', 'Active', '67,194', '1,642', '2.44%', '$1,237'],
          ['Retargeting Campaign', 'Google Ads', 'Ended', '156,847', '7,293', '4.65%', '$3,284']
        ];
        
        const csvContent = csvData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `admybrand-campaigns-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "CSV Export Complete",
          description: "Campaign data has been exported successfully.",
        });
      } else if (type === "pdf") {
        // Simulate PDF generation
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        toast({
          title: "PDF Report Generated",
          description: "Your analytics report is ready for download.",
        });
      } else if (type === "png") {
        // Simulate image export
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast({
          title: "Charts Exported",
          description: "Chart images have been saved to your downloads.",
        });
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {exportOptions.map((option) => (
          <div key={option.type} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${option.color}`}>
                {option.icon}
              </div>
              <div>
                <p className="font-medium text-sm">{option.title}</p>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport(option.type)}
              disabled={isExporting}
            >
              {isExporting ? "Exporting..." : "Export"}
            </Button>
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Export Status</span>
            <Badge variant="secondary">Ready</Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            All export formats are available. Data is current as of {new Date().toLocaleString()}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}