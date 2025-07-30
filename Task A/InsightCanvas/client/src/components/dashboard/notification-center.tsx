import { useState } from "react";
import { Bell, X, CheckCircle, AlertTriangle, Info, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "alert";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Campaign Performance Alert",
    message: "Summer Sale campaign exceeded expected CTR by 15%",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false
  },
  {
    id: "2", 
    type: "warning",
    title: "Budget Alert",
    message: "Holiday Promotions campaign has reached 85% of allocated budget",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false
  },
  {
    id: "3",
    type: "info",
    title: "Weekly Report Ready",
    message: "Your weekly analytics report is now available for download",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: true
  },
  {
    id: "4",
    type: "alert",
    title: "Revenue Milestone",
    message: "Congratulations! You've reached $100K in monthly revenue",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    read: true
  }
];

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "alert":
        return <TrendingUp className="h-4 w-4 text-purple-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "Your notification center has been cleared.",
    });
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast({
      title: "Notification removed",
      description: "The notification has been deleted.",
    });
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return `${minutes}m ago`;
    }
  };

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 w-80 max-h-96 overflow-hidden z-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all read
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b hover:bg-muted/50 cursor-pointer ${
                      !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {getIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatTimeAgo(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}