import type { Analytics, Campaign, Activity } from "@shared/schema";

// Generate realistic sample data for development/demo purposes
export const generateMockAnalytics = (): Analytics => ({
  id: "analytics-1",
  date: new Date(),
  revenue: "127543.00",
  users: 24891,
  conversions: 1847,
  growthRate: "23.70",
  trafficSources: {
    "Organic Search": 42.3,
    "Social Media": 28.7,
    "Paid Ads": 19.1,
    "Direct": 9.9
  },
  campaignData: {
    "Google Ads": { conversions: 485, impressions: 1250 },
    "Facebook": { conversions: 392, impressions: 980 },
    "LinkedIn": { conversions: 287, impressions: 670 },
    "Twitter": { conversions: 156, impressions: 420 },
    "YouTube": { conversions: 203, impressions: 560 }
  }
});

export const generateMockCampaigns = (): Campaign[] => [
  {
    id: "campaign-1",
    name: "Summer Sale Campaign",
    platform: "Google Ads",
    status: "Active",
    impressions: 124593,
    clicks: 3847,
    ctr: "3.09",
    spend: "2459.00",
    createdAt: new Date()
  },
  {
    id: "campaign-2",
    name: "Holiday Promotions",
    platform: "Facebook Ads",
    status: "Paused",
    impressions: 89237,
    clicks: 2183,
    ctr: "2.45",
    spend: "1892.00",
    createdAt: new Date()
  },
  {
    id: "campaign-3",
    name: "Brand Awareness",
    platform: "LinkedIn Ads",
    status: "Active",
    impressions: 67194,
    clicks: 1642,
    ctr: "2.44",
    spend: "1237.00",
    createdAt: new Date()
  },
  {
    id: "campaign-4",
    name: "Retargeting Campaign",
    platform: "Google Ads",
    status: "Ended",
    impressions: 156847,
    clicks: 7293,
    ctr: "4.65",
    spend: "3284.00",
    createdAt: new Date()
  }
];

export const generateMockActivities = (): Activity[] => [
  {
    id: "activity-1",
    type: "campaign",
    title: 'Campaign "Summer Sale" launched',
    description: "New campaign started with $5000 budget",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    icon: "check",
    color: "green"
  },
  {
    id: "activity-2",
    type: "milestone",
    title: "Revenue target reached",
    description: "Monthly revenue goal achieved",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    icon: "chart-line",
    color: "blue"
  },
  {
    id: "activity-3",
    type: "segment",
    title: "New user segment created",
    description: "High-value customers segment defined",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    icon: "users",
    color: "purple"
  },
  {
    id: "activity-4",
    type: "alert",
    title: "Budget alert triggered",
    description: "Campaign spending reached 80% of budget",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    icon: "exclamation",
    color: "orange"
  }
];
