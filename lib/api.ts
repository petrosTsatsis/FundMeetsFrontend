import { useAuth } from "@clerk/nextjs";
import { UUID } from "crypto";
import { useState, useEffect } from "react";

// Types

// Startup Profile Interface
export interface StartupProfile {
  id: UUID;
  userId: string;

  name: string;
  description?: string;
  website?: string;
  logo?: string;
  industry?: Industry;
  foundedDate?: Date;
  location?: string;
  status: StartupStatus;
  stage?: StartupStage;
  businessModel?: BusinessModel;
  verified: boolean;
  verifiedAt?: Date;

  amountNeeded?: number;
  currency?: Currency;
  valuation?: number;
  equityOffered?: number;
  previousFunding?: number;

  revenue?: number;
  growthRate?: number;
  users?: number;
  churnRate?: number;
  cac?: number;
  ltv?: number;
  teamSize?: number;

  tags?: string[];
  contactPerson?: string;
  lastActive?: Date;

  // Social
  x?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;

  createdAt: Date;
  updatedAt: Date;

  // Relations
  user: UserData;
  interests: Interest[];
  matches: Match[];
  dealRooms: DealRoom[];
  _count?: {
    matches?: number;
    interests?: number;
  };
}

export interface RecommendedStartup {
  id: UUID;
  name: string;

  verified: boolean;
  location: string;
  industry: Industry;
  stage: StartupStage;
  businessModel: BusinessModel;
  tags: string[];
  equityOffered: number;
  matchPercentage?: number;
  recommendationScore?: number;
}

// Investor Profile Interface
export interface InvestorProfile {
  id: UUID;
  userId: string;

  name: string;
  description?: string;
  verified: boolean;
  verifiedAt?: Date;
  profilePicture?: string;
  location?: string;
  phoneNumber?: string;
  website?: string;
  investorType?: InvestorType;
  currentPosition?: string;

  checkSizeMin?: number;
  checkSizeMax?: number;
  preferredStage?: StartupStage[];
  preferredIndustry?: Industry[];
  preferredBusinessModels?: BusinessModel[];
  geographyFocus?: string[];
  dealsPerYear?: number;
  thesis?: string;

  portfolioUrl?: string;
  accredited: boolean;
  dealsClosed?: number;

  tags?: string[];
  lastActive?: Date;

  // Social
  x?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;

  createdAt: Date;
  updatedAt: Date;

  // Relations
  user: UserData;
  interests: Interest[];
  matches: Match[];
  dealRooms: DealRoom[];
  _count?: {
    matches?: number;
    interests?: number;
  };
}

// Interest Request Interface
export interface Interest {
  id: UUID;
  investorId: string;
  startupId: string;
  message?: string;
  senderType: SenderType;
  status: InterestStatus;
  deletedByInvestor: boolean;
  deletedByStartup: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  investor: InvestorProfile;
  startup: StartupProfile;
}

// Match Interface
export interface Match {
  id: UUID;
  investorId: string;
  startupId: string;
  createdAt: Date;
  updatedAt: Date;

  investor: InvestorProfile;
  startup: StartupProfile;
}

// Notification Interface
export interface Notification {
  id: UUID;
  userId: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;

  user: UserData;
}

// User Data Interface
export interface UserData {
  id: UUID;
  email: string;
  role: Role;
  newUser: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  startupProfile?: StartupProfile;
  investorProfile?: InvestorProfile;
  notifications: Notification[];
}

export interface DealRoom {
  id: UUID;
  startupId: string;
  investorId: string;
  status: DealStatus;
  deletedByStartup: boolean;
  deletedByInvestor: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;

  startup: StartupProfile;
  investor: InvestorProfile;
  documents: DealRoomDocument[];
  questions: Question[];
  progress: DealProgress[];
}

export interface DealRoomDocument {
  id: UUID;
  dealRoomId: string;
  type: DocumentType;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  dealRoom: DealRoom;
}

export interface Question {
  id: UUID;
  dealRoomId: string;
  question: string;
  answer?: string;
  askedById: string;
  answeredById?: string;
  createdAt: Date;
  updatedAt: Date;

  dealRoom: DealRoom;
}

export interface DealProgress {
  id: UUID;
  dealRoomId: string;
  stage: DealStatus;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;

  dealRoom: DealRoom;
}

export interface AppMetrics {
  // Nested shape returned by backend
  totals: {
    investors: number;
    startups: number;
    matches: number;
    closedDeals: number;
  };
  growth: {
    // % growth compared to last month
    investors: number;
    startups: number;
    matches: number;
    closedDeals: number;
  };
}

// Top Investor Type for the frontend table
export interface TopInvestorData {
  id: string;
  name: string;
  profilePicture?: string;
  currentPosition?: string;
  investorType: InvestorType;
  title?: string;
  location?: string;
  checkSizeMin?: number;
  checkSizeMax?: number;
  preferredStage?: StartupStage[];
  preferredIndustry?: Industry[];
  dealsClosed?: number;
  verified: boolean;
  tags?: string[];
  matchesCount?: number; // maps from _count.matches
}

// Top Startup Type for the frontend table
export interface TopStartupData {
  id: string;
  name: string;
  verified: boolean;
  location?: string;
  industry?: Industry;
  stage?: StartupStage;
  businessModel?: BusinessModel;
  amountNeeded?: number;
  tags?: string[];
  equityOffered?: number;
  logo?: string;
  matchesCount?: number; // maps from _count.matches
}

// Enums
export type Role = "STARTUP" | "INVESTOR" | "ADMIN";

// Export canonical option arrays for UI selections
export const INDUSTRY_OPTIONS: Industry[] = [
  "FINTECH",
  "HEALTHTECH",
  "EDTECH",
  "AGRITECH",
  "GREENTECH",
  "AI",
  "BIOTECH",
  "SAAS",
  "MARKETPLACE",
  "ECOMMERCE",
  "PROPTECH",
  "INSURTECH",
  "MOBILITY",
  "LOGISTICS",
  "GAMING",
  "MARTECH",
  "CYBERSECURITY",
  "BLOCKCHAIN",
  "IOT",
  "HRTECH",
  "TRAVELTECH",
  "CONSUMER_TECH",
  "LEGALTECH",
  "SOCIAL_IMPACT",
  "GOVTECH",
  "MEDIA",
  "OTHER",
];

export const STARTUP_STAGE_OPTIONS: StartupStage[] = [
  "IDEA",
  "PRE_SEED",
  "SEED",
  "SERIES_A",
  "SERIES_B",
  "SERIES_C",
  "GROWTH",
  "IPO",
  "GRANT",
  "ACQUISITION",
  "NOT_SEEKING",
];

export const BUSINESS_MODEL_OPTIONS: BusinessModel[] = [
  "SAAS",
  "MARKETPLACE",
  "ECOMMERCE",
  "SUBSCRIPTION",
  "TRANSACTIONAL",
  "FREEMIUM",
  "ADVERTISING",
  "LICENSING",
  "HARDWARE",
  "SERVICES",
  "FRANCHISE",
  "OPEN_SOURCE",
  "DONATION",
  "HYBRID",
];

export const INVESTOR_TYPE_OPTIONS: InvestorType[] = [
  "ANGEL_INVESTOR",
  "VENTURE_CAPITAL",
  "MICRO_VC",
  "CORPORATE_VC",
  "FAMILY_OFFICE",
  "PRIVATE_EQUITY",
  "HEDGE_FUND",
  "SOVEREIGN_WEALTH",
  "ACCELERATOR",
  "CROWDFUNDING",
  "PENSION_FUND",
  "IMPACT_INVESTOR",
  "UNIVERSITY_ENDOWMENT",
];

export type InterestStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "WITHDRAWN";

export type StartupStage =
  | "IDEA"
  | "PRE_SEED"
  | "SEED"
  | "SERIES_A"
  | "SERIES_B"
  | "SERIES_C"
  | "GROWTH"
  | "IPO"
  | "GRANT"
  | "ACQUISITION"
  | "NOT_SEEKING";

export type StartupStatus =
  | "STEALTH"
  | "ACTIVE"
  | "SCALING"
  | "PIVOTING"
  | "ACQUIRED"
  | "MERGED"
  | "CLOSED"
  | "PUBLIC";

export type Industry =
  | "FINTECH"
  | "HEALTHTECH"
  | "EDTECH"
  | "AGRITECH"
  | "GREENTECH"
  | "AI"
  | "BIOTECH"
  | "SAAS"
  | "MARKETPLACE"
  | "ECOMMERCE"
  | "PROPTECH"
  | "INSURTECH"
  | "MOBILITY"
  | "LOGISTICS"
  | "GAMING"
  | "MARTECH"
  | "CYBERSECURITY"
  | "BLOCKCHAIN"
  | "IOT"
  | "HRTECH"
  | "TRAVELTECH"
  | "CONSUMER_TECH"
  | "LEGALTECH"
  | "SOCIAL_IMPACT"
  | "GOVTECH"
  | "MEDIA"
  | "OTHER";

export type Currency =
  | "USD"
  | "EUR"
  | "GBP"
  | "INR"
  | "JPY"
  | "CNY"
  | "CAD"
  | "AUD"
  | "CHF"
  | "OTHER";

export type BusinessModel =
  | "SAAS"
  | "MARKETPLACE"
  | "ECOMMERCE"
  | "SUBSCRIPTION"
  | "TRANSACTIONAL"
  | "FREEMIUM"
  | "ADVERTISING"
  | "LICENSING"
  | "HARDWARE"
  | "SERVICES"
  | "FRANCHISE"
  | "OPEN_SOURCE"
  | "DONATION"
  | "HYBRID";

export type InvestorType =
  | "ANGEL_INVESTOR"
  | "VENTURE_CAPITAL"
  | "MICRO_VC"
  | "CORPORATE_VC"
  | "FAMILY_OFFICE"
  | "PRIVATE_EQUITY"
  | "HEDGE_FUND"
  | "SOVEREIGN_WEALTH"
  | "ACCELERATOR"
  | "CROWDFUNDING"
  | "PENSION_FUND"
  | "IMPACT_INVESTOR"
  | "UNIVERSITY_ENDOWMENT";

export type SenderType = "INVESTOR" | "STARTUP";

export type DealStatus =
  | "INITIATED"
  | "DUE_DILIGENCE"
  | "NEGOTIATION"
  | "AGREED"
  | "CLOSED"
  | "REJECTED";

export type DocumentType = "PUBLIC" | "PRIVATE_STARTUP" | "PRIVATE_INVESTOR";

// API Client
export class ApiClient {
  private baseUrl: string;
  private token: string | null = null;
  private userId: string | null = null;
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> =
    new Map();
  private pendingRequests: Map<string, Promise<any>> = new Map();

  constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/mvp";
  }

  setToken(token: string | null) {
    this.token = token;
  }

  setUserId(userId: string | null) {
    this.userId = userId;
  }

  private getHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
    };
  }

  private getCacheKey(endpoint: string, params?: any): string {
    return `${endpoint}${params ? `_${JSON.stringify(params)}` : ""}`;
  }

  private getCachedData<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data as T;
  }

  private setCachedData<T>(
    key: string,
    data: T,
    ttl: number = 5 * 60 * 1000
  ): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  private async requestWithCache<T>(
    endpoint: string,
    options: RequestInit = {},
    ttl: number = 5 * 60 * 1000,
    params?: any
  ): Promise<T> {
    const cacheKey = this.getCacheKey(endpoint, params);

    // Check cache first
    const cached = this.getCachedData<T>(cacheKey);
    if (cached) {
      return cached;
    }

    // Check if request is already pending
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey)!;
    }

    // Make new request
    const requestPromise = this.makeRequest<T>(endpoint, options);
    this.pendingRequests.set(cacheKey, requestPromise);

    try {
      const data = await requestPromise;
      this.setCachedData(cacheKey, data, ttl);
      return data;
    } finally {
      this.pendingRequests.delete(cacheKey);
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      (error as any).response = response;
      throw error;
    }

    return response.json();
  }

  // Basic metrics
  async getAppMetrics(): Promise<AppMetrics> {
    return this.requestWithCache("/common/metrics", {}, 2 * 60 * 1000); // 2 min cache
  }

  // Startup endpoints
  async getAllStartups(): Promise<StartupProfile[]> {
    return this.requestWithCache("/startups", {}, 5 * 60 * 1000); // 5 min cache
  }

  async getStartupById(startupId: string): Promise<StartupProfile> {
    const response = await fetch(`${this.baseUrl}/startups/${startupId}`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch startup: ${response.statusText}`);
    }
    return response.json();
  }

  async getTopStartups(): Promise<TopStartupData[]> {
    const response = await fetch(`${this.baseUrl}/common/top-startups`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch top investors: ${response.statusText}`);
    }
    return response.json();
  }

  async getNewStartups(): Promise<TopStartupData[]> {
    const response = await fetch(`${this.baseUrl}/common/new-startups`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch top investors: ${response.statusText}`);
    }
    return response.json();
  }

  async getRecommendedInvestors(): Promise<InvestorProfile[]> {
    try {
      return await this.requestWithCache(
        "/startups/recommended-investors",
        {},
        3 * 60 * 1000
      ); // 3 min cache
    } catch (error: any) {
      // Preserve the original error handling logic
      if (error.response?.status === 400) {
        const errorMessage =
          "You need to have a startup profile to see recommended investors. Please complete your startup profile first.";
        const newError: any = new Error(errorMessage);
        newError.response = error.response;
        throw newError;
      }
      throw error;
    }
  }

  async createStartup(data: Partial<StartupProfile>): Promise<StartupProfile> {
    const response = await fetch(`${this.baseUrl}/startups`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to create startup: ${response.statusText}`);
    }
    return response.json();
  }

  async updateStartup(
    startupId: string,
    data: Partial<StartupProfile>
  ): Promise<StartupProfile> {
    const response = await fetch(
      `${this.baseUrl}/startups/update/${startupId}`,
      {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to update startup: ${response.statusText}`);
    }
    return response.json();
  }

  async deleteStartup(startupId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/startups/${startupId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to delete startup: ${response.statusText}`);
    }
  }

  async updateStartupLogo(
    startupId: string,
    formData: FormData
  ): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/startups/update/logo/${startupId}`,
      {
        method: "PUT",
        headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to upload logo: ${response.statusText}`);
    }
  }

  // Investor endpoints
  async getAllInvestors(): Promise<InvestorProfile[]> {
    const response = await fetch(`${this.baseUrl}/investors`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch investors: ${response.statusText}`);
    }
    return response.json();
  }

  async getTopInvestors(): Promise<TopInvestorData[]> {
    const response = await fetch(`${this.baseUrl}/common/top-investors`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch top investors: ${response.statusText}`);
    }
    return response.json();
  }

  async getNewInvestors(): Promise<TopInvestorData[]> {
    const response = await fetch(`${this.baseUrl}/common/new-investors`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch top investors: ${response.statusText}`);
    }
    return response.json();
  }

  async getRecommendedStartups(): Promise<StartupProfile[]> {
    try {
      return await this.requestWithCache(
        "/investors/recommended-startups",
        {},
        3 * 60 * 1000
      ); // 3 min cache
    } catch (error: any) {
      // Preserve the original error handling logic
      if (error.response?.status === 400) {
        const errorMessage =
          "You need to have an investor profile to see recommended startups. Please complete your investor profile first.";
        const newError: any = new Error(errorMessage);
        newError.response = error.response;
        throw newError;
      }
      throw error;
    }
  }

  async getInvestorById(investorId: string): Promise<InvestorProfile> {
    const response = await fetch(`${this.baseUrl}/investors/${investorId}`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch investor: ${response.statusText}`);
    }
    return response.json();
  }

  async createInvestor(
    data: Partial<InvestorProfile>
  ): Promise<InvestorProfile> {
    const response = await fetch(`${this.baseUrl}/investors`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to create investor: ${response.statusText}`);
    }
    return response.json();
  }

  async updateInvestor(
    investorId: string,
    data: Partial<InvestorProfile>
  ): Promise<InvestorProfile> {
    const response = await fetch(
      `${this.baseUrl}/investors/update/${investorId}`,
      {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to update investor: ${response.statusText}`);
    }
    return response.json();
  }

  async updateInvestorLogo(
    investorId: string,
    formData: FormData
  ): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/investors/update/profilePicture/${investorId}`,
      {
        method: "PUT",
        headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to upload logo: ${response.statusText}`);
    }
  }

  async deleteInvestor(investorId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/investors/${investorId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to delete investor: ${response.statusText}`);
    }
  }

  // Search endpoints
  async searchStartups(params: {
    q?: string;
    industry?: string;
    stage?: string;
    location?: string;
  }): Promise<StartupProfile[]> {
    const queryParams = new URLSearchParams(params as Record<string, string>);
    const response = await fetch(
      `${this.baseUrl}/search/startups?${queryParams}`,
      {
        headers: this.getHeaders(),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to search startups: ${response.statusText}`);
    }
    return response.json();
  }

  async searchInvestors(params: {
    q?: string;
    name?: string;
    location?: string;
  }): Promise<InvestorProfile[]> {
    const queryParams = new URLSearchParams(params as Record<string, string>);
    const response = await fetch(
      `${this.baseUrl}/search/investors?${queryParams}`,
      {
        headers: this.getHeaders(),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to search investors: ${response.statusText}`);
    }
    return response.json();
  }

  // Interest endpoints
  async createInterest(startupId: string, message?: string): Promise<Interest> {
    const requestBody: { startupId: string; message?: string } = { startupId };
    if (message) {
      requestBody.message = message;
    }

    const response = await fetch(`${this.baseUrl}/interests/create`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      let errorMessage = `Failed to create interest: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData?.message) {
          errorMessage = Array.isArray(errorData.message)
            ? errorData.message.join(", ")
            : errorData.message;
        }
        const error: any = new Error(errorMessage);
        error.response = { data: errorData };
        throw error;
      } catch (parseError) {
        throw new Error(errorMessage);
      }
    }

    return response.json();
  }

  async getStartupInterestRequests(): Promise<Interest[]> {
    const response = await fetch(`${this.baseUrl}/interests/startup`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch interest requests: ${response.statusText}`
      );
    }
    return response.json();
  }

  async getInvestorInterestRequests(): Promise<Interest[]> {
    const response = await fetch(`${this.baseUrl}/interests/investor`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch interest requests: ${response.statusText}`
      );
    }
    return response.json();
  }

  async getInterestRequestById(id: string): Promise<Interest> {
    const response = await fetch(`${this.baseUrl}/interests/${id}`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch interest request: ${response.statusText}`
      );
    }
    return response.json();
  }

  async updateInterestRequestStatus(
    id: string,
    status: "ACCEPTED" | "REJECTED"
  ): Promise<Interest> {
    const response = await fetch(`${this.baseUrl}/interests/update/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to update interest request: ${response.statusText}`
      );
    }
    return response.json();
  }

  async deleteInterestRequest(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/interests/delete/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to delete interest request: ${response.statusText}`
      );
    }
  }

  // Notification endpoints
  async getNotifications(): Promise<Notification[]> {
    const response = await fetch(`${this.baseUrl}/notifications`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch notifications: ${response.statusText}`);
    }
    return response.json();
  }

  async getNotificationById(notificationId: string): Promise<Notification> {
    const response = await fetch(
      `${this.baseUrl}/notifications/${notificationId}`,
      {
        headers: this.getHeaders(),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch notification: ${response.statusText}`);
    }
    return response.json();
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/notifications/mark-as-read/${notificationId}`,
      {
        method: "PUT",
        headers: this.getHeaders(),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to mark notification as read: ${response.statusText}`
      );
    }
  }

  async markAllNotificationsAsRead(): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/notifications/mark-all-as-read`,
      {
        method: "PUT",
        headers: this.getHeaders(),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to mark all notifications as read: ${response.statusText}`
      );
    }
  }

  async deleteNotification(notificationId: string): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/notifications/${notificationId}`,
      {
        method: "DELETE",
        headers: this.getHeaders(),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to delete notification: ${response.statusText}`);
    }
  }

  // Matching endpoints
  async getMatchings(): Promise<Match[]> {
    const response = await fetch(`${this.baseUrl}/matches`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch matchings: ${response.statusText}`);
    }
    return response.json();
  }

  async getMatching(matchingId: string): Promise<Match> {
    const response = await fetch(`${this.baseUrl}/matches/${matchingId}`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch matching: ${response.statusText}`);
    }
    return response.json();
  }

  async deleteMatching(matchingId: string): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/matches/delete/${matchingId}`,
      {
        method: "DELETE",
        headers: this.getHeaders(),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to delete matching: ${response.statusText}`);
    }
  }

  // User endpoints
  async syncBareUser(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/auth/user/sync`, {
      method: "POST",
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to sync bare user: ${response.statusText}`);
    }
  }

  async completeOnboarding(data: { role: string } & any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/auth/user/onboarding`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to complete onboarding: ${response.statusText}`);
    }
    return response.json();
  }

  async getUserProfile(userId: string): Promise<UserData> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/profile`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch user profile: ${response.statusText}`);
    }
    return response.json();
  }

  async updateUserProfile(
    userId: string,
    data: {
      name?: string;
      bio?: string;
      industry?: string;
      location?: string;
      investmentSize?: string;
      image?: string;
      website?: string;
      social_media_links?: string[];
    }
  ): Promise<void> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/profile`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to update user profile: ${response.statusText}`);
    }
  }

  async updateStartupProfile(
    startupId: UUID,
    data: Partial<StartupProfile>
  ): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/startups/update/${startupId}`,
      {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to update startup profile: ${response.statusText}`
      );
    }
  }

  async updateInvestorProfile(
    investorId: string,
    data: Partial<InvestorProfile>
  ): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/investors/update/${investorId}`,
      {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to update investor profile: ${response.statusText}`
      );
    }
  }

  async fetchUserData(): Promise<UserData> {
    const response = await fetch(
      `${this.baseUrl}/users/${this.userId}/profile`,
      {
        headers: this.getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    return response.json();
  }
}

// Hook to use the API client
export function useApi() {
  const { getToken, userId } = useAuth();
  const [api, setApi] = useState<ApiClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApi = async () => {
      const client = new ApiClient();
      if (getToken && userId) {
        try {
          const token = await getToken({ template: "FundMeets" });
          client.setToken(token);
          client.setUserId(userId);
          setApi(client);
        } catch (error) {
          console.error("Error getting token:", error);
        }
      }
      setIsLoading(false);
    };

    initializeApi();
  }, [getToken, userId]);

  // Update token when it changes
  useEffect(() => {
    if (api && getToken) {
      getToken({ template: "FundMeets" }).then((token) => {
        api.setToken(token);
      });
    }
  }, [getToken, api]);

  if (isLoading || !api) {
    return null;
  }

  return api;
}
