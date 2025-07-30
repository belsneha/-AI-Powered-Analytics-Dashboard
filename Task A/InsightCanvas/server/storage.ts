import { type Analytics, type InsertAnalytics, type Campaign, type InsertCampaign, type Activity, type InsertActivity } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Analytics
  getAnalytics(): Promise<Analytics[]>;
  getLatestAnalytics(): Promise<Analytics | undefined>;
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  
  // Campaigns
  getCampaigns(): Promise<Campaign[]>;
  getCampaign(id: string): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaign(id: string, campaign: Partial<InsertCampaign>): Promise<Campaign | undefined>;
  
  // Activities
  getActivities(limit?: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
}

export class MemStorage implements IStorage {
  private analytics: Map<string, Analytics>;
  private campaigns: Map<string, Campaign>;
  private activities: Map<string, Activity>;

  constructor() {
    this.analytics = new Map();
    this.campaigns = new Map();
    this.activities = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed multiple analytics data points for better visualization
    const analyticsData: Analytics[] = [
      {
        id: randomUUID(),
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
      },
      {
        id: randomUUID(),
        date: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
        revenue: "118932.00",
        users: 23456,
        conversions: 1721,
        growthRate: "21.40",
        trafficSources: {
          "Organic Search": 40.1,
          "Social Media": 30.2,
          "Paid Ads": 20.3,
          "Direct": 9.4
        },
        campaignData: {
          "Google Ads": { conversions: 452, impressions: 1180 },
          "Facebook": { conversions: 378, impressions: 920 },
          "LinkedIn": { conversions: 265, impressions: 640 },
          "Twitter": { conversions: 142, impressions: 390 },
          "YouTube": { conversions: 194, impressions: 520 }
        }
      }
    ];
    
    analyticsData.forEach(data => {
      this.analytics.set(data.id, data);
    });

    // Seed comprehensive campaign data
    const campaignData: Campaign[] = [
      {
        id: randomUUID(),
        name: "Summer Sale Campaign",
        platform: "Google Ads",
        status: "Active",
        impressions: 124593,
        clicks: 3847,
        ctr: "3.09",
        spend: "2459.00",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        id: randomUUID(),
        name: "Holiday Promotions",
        platform: "Facebook Ads",
        status: "Paused",
        impressions: 89237,
        clicks: 2183,
        ctr: "2.45",
        spend: "1892.00",
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
      },
      {
        id: randomUUID(),
        name: "Brand Awareness",
        platform: "LinkedIn Ads",
        status: "Active",
        impressions: 67194,
        clicks: 1642,
        ctr: "2.44",
        spend: "1237.00",
        createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
      },
      {
        id: randomUUID(),
        name: "Retargeting Campaign",
        platform: "Google Ads",
        status: "Ended",
        impressions: 156847,
        clicks: 7293,
        ctr: "4.65",
        spend: "3284.00",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      },
      {
        id: randomUUID(),
        name: "Mobile App Install",
        platform: "Facebook Ads",
        status: "Active",
        impressions: 98435,
        clicks: 2947,
        ctr: "2.99",
        spend: "1856.00",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: randomUUID(),
        name: "Video Campaign",
        platform: "YouTube Ads",
        status: "Active",
        impressions: 234567,
        clicks: 5632,
        ctr: "2.40",
        spend: "3421.00",
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
      },
      {
        id: randomUUID(),
        name: "B2B Lead Generation",
        platform: "LinkedIn Ads",
        status: "Active",
        impressions: 45632,
        clicks: 1234,
        ctr: "2.70",
        spend: "2145.00",
        createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000)
      },
      {
        id: randomUUID(),
        name: "Black Friday Special",
        platform: "Google Ads",
        status: "Ended",
        impressions: 345678,
        clicks: 12345,
        ctr: "3.57",
        spend: "5678.00",
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
      }
    ];

    campaignData.forEach(campaign => {
      this.campaigns.set(campaign.id, campaign);
    });

    // Seed comprehensive activity data
    const activityData: Activity[] = [
      {
        id: randomUUID(),
        type: "campaign",
        title: 'Campaign "Summer Sale" launched',
        description: "New campaign started with $5000 budget",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        icon: "check",
        color: "green"
      },
      {
        id: randomUUID(),
        type: "milestone",
        title: "Revenue target reached",
        description: "Monthly revenue goal achieved",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        icon: "chart-line",
        color: "blue"
      },
      {
        id: randomUUID(),
        type: "segment",
        title: "New user segment created",
        description: "High-value customers segment defined",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        icon: "users",
        color: "purple"
      },
      {
        id: randomUUID(),
        type: "alert",
        title: "Budget alert triggered",
        description: "Campaign spending reached 80% of budget",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        icon: "exclamation",
        color: "orange"
      },
      {
        id: randomUUID(),
        type: "optimization",
        title: "Auto-bid optimization enabled",
        description: "AI-powered bid optimization activated for Google Ads",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        icon: "check",
        color: "green"
      },
      {
        id: randomUUID(),
        type: "conversion",
        title: "High conversion rate detected",
        description: "Mobile App Install campaign showing 15% above average CVR",
        timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000),
        icon: "chart-line",
        color: "blue"
      },
      {
        id: randomUUID(),
        type: "audience",
        title: "Lookalike audience created",
        description: "New lookalike audience based on top 10% customers",
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
        icon: "users",
        color: "purple"
      },
      {
        id: randomUUID(),
        type: "performance",
        title: "CTR improvement noted",
        description: "Video campaign CTR increased by 23% this week",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        icon: "chart-line",
        color: "blue"
      }
    ];

    activityData.forEach(activity => {
      this.activities.set(activity.id, activity);
    });
  }

  async getAnalytics(): Promise<Analytics[]> {
    return Array.from(this.analytics.values());
  }

  async getLatestAnalytics(): Promise<Analytics | undefined> {
    const allAnalytics = Array.from(this.analytics.values());
    return allAnalytics.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  }

  async createAnalytics(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const id = randomUUID();
    const analytics: Analytics = { ...insertAnalytics, id };
    this.analytics.set(id, analytics);
    return analytics;
  }

  async getCampaigns(): Promise<Campaign[]> {
    return Array.from(this.campaigns.values());
  }

  async getCampaign(id: string): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const id = randomUUID();
    const campaign: Campaign = { 
      ...insertCampaign, 
      id, 
      createdAt: new Date() 
    };
    this.campaigns.set(id, campaign);
    return campaign;
  }

  async updateCampaign(id: string, updateData: Partial<InsertCampaign>): Promise<Campaign | undefined> {
    const existing = this.campaigns.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updateData };
    this.campaigns.set(id, updated);
    return updated;
  }

  async getActivities(limit = 10): Promise<Activity[]> {
    const allActivities = Array.from(this.activities.values());
    return allActivities
      .sort((a, b) => new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime())
      .slice(0, limit);
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = randomUUID();
    const activity: Activity = { 
      ...insertActivity, 
      id, 
      timestamp: new Date(),
      description: insertActivity.description || null
    };
    this.activities.set(id, activity);
    return activity;
  }
}

export const storage = new MemStorage();
