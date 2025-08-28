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
  industry?: string;
  foundedDate?: Date;
  location?: string;
  status?: string;
  stage?: string;
  verified: boolean;
  amountNeeded?: number;
  valuation?: number;
  equityOffered?: number;
  teamSize?: number;
  contactPerson?: string;
  phoneNumber?: string;
  x?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  user: UserData;
  interests: InterestRequest[];
  matches: Match[];
  _count?: {
    matches?: number;
    interests?: number;
  };
}

// Investor Profile Interface
export interface InvestorProfile {
  id: UUID;
  userId: string;
  name: string;
  description?: string;
  verified: boolean;
  location?: string;
  profilePicture?: string;
  phoneNumber?: string;
  website?: string;
  x?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  user: UserData;
  interests: InterestRequest[];
  matches: Match[];
  _count?: {
    matches?: number;
    interests?: number;
  };
}

// Interest Request Interface
export interface InterestRequest {
  id: UUID;
  investorId: string;
  startupId: string;
  message?: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
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

  // Relations
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

  // Relations
  user: UserData;
}

// User Data Interface
export interface UserData {
  id: UUID;
  email: string;
  role: "STARTUP" | "INVESTOR" | "ADMIN";
  createdAt: Date; // Defaults to now
  updatedAt: Date; // Defaults to now

  // Relations
  startupProfile?: StartupProfile;
  investorProfile?: InvestorProfile;
}

// API Client
export class ApiClient {
  private baseUrl: string;
  private token: string | null = null;
  private userId: string | null = null;

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

  // Startup endpoints
  async getAllStartups(): Promise<StartupProfile[]> {
    const response = await fetch(`${this.baseUrl}/startups`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch startups: ${response.statusText}`);
    }
    return response.json();
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
  async createInterest(
    startupId: string,
    message?: string
  ): Promise<InterestRequest> {
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

  async getStartupInterestRequests(): Promise<InterestRequest[]> {
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

  async getInvestorInterestRequests(): Promise<InterestRequest[]> {
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

  async getInterestRequestById(id: string): Promise<InterestRequest> {
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
  ): Promise<InterestRequest> {
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
  async syncUserRecord(role: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/auth/user/sync`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ role }),
    });
    if (!response.ok) {
      throw new Error(`Failed to sync user record: ${response.statusText}`);
    }
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
