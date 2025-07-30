import { useState } from "react";
import { Search, Filter, ChevronLeft, ChevronRight, Edit, Eye, Play, Pause, StopCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Campaign } from "@shared/schema";

interface DataTableProps {
  campaigns: Campaign[];
}

export function DataTable({ campaigns }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const itemsPerPage = 10;
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateCampaignMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await fetch(`/api/campaigns/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      }).then(res => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/campaigns'] });
      toast({
        title: "Campaign Updated",
        description: "Campaign status has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update campaign status.",
        variant: "destructive",
      });
    }
  });

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || campaign.status.toLowerCase() === statusFilter;
    const matchesPlatform = platformFilter === "all" || campaign.platform.toLowerCase().includes(platformFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const handleCampaignAction = (campaignId: string, action: string) => {
    if (action === "view") {
      toast({
        title: "Campaign Details",
        description: "Opening campaign details view...",
      });
    } else if (action === "edit") {
      toast({
        title: "Edit Campaign",
        description: "Opening campaign editor...",
      });
    } else if (action === "pause") {
      updateCampaignMutation.mutate({ id: campaignId, status: "Paused" });
    } else if (action === "resume") {
      updateCampaignMutation.mutate({ id: campaignId, status: "Active" });
    } else if (action === "stop") {
      updateCampaignMutation.mutate({ id: campaignId, status: "Ended" });
    }
  };

  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
    if (!filterOpen) {
      toast({
        title: "Filters",
        description: "Advanced filtering options are now available.",
      });
    }
  };

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "paused":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "ended":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Campaign Analytics</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm" onClick={handleFilterToggle}>
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {filterOpen && (
        <div className="px-6 py-4 border-b bg-muted/50">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <select 
                className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="ended">Ended</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-muted-foreground">Platform</label>
              <select 
                className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
              >
                <option value="all">All Platforms</option>
                <option value="google">Google Ads</option>
                <option value="facebook">Facebook Ads</option>
                <option value="linkedin">LinkedIn Ads</option>
              </select>
            </div>
          </div>
        </div>
      )}
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Impressions</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>CTR</TableHead>
                <TableHead>Spend</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCampaigns.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-sm text-muted-foreground">{campaign.platform}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{campaign.impressions.toLocaleString()}</TableCell>
                  <TableCell>{campaign.clicks.toLocaleString()}</TableCell>
                  <TableCell>{parseFloat(campaign.ctr)}%</TableCell>
                  <TableCell>${parseFloat(campaign.spend).toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleCampaignAction(campaign.id, "view")}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleCampaignAction(campaign.id, "edit")}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {campaign.status === "Active" ? (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleCampaignAction(campaign.id, "pause")}
                          className="h-8 w-8 p-0 text-orange-600"
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : campaign.status === "Paused" ? (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleCampaignAction(campaign.id, "resume")}
                          className="h-8 w-8 p-0 text-green-600"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      ) : null}
                      {campaign.status !== "Ended" && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleCampaignAction(campaign.id, "stop")}
                          className="h-8 w-8 p-0 text-red-600"
                        >
                          <StopCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredCampaigns.length)}</span> of{" "}
            <span className="font-medium">{filteredCampaigns.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
              const page = currentPage <= 2 ? i + 1 : currentPage - 1 + i;
              if (page > totalPages) return null;
              
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              );
            })}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
