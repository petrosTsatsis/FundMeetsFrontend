// API utility functions for FundMeets

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Types for analytics data
export interface TopInvestorData {
  id: string;
  name: string;
  company: string;
  title: string;
  location: string;
  avatar: string;
  verified: boolean;
  type: string;
  focusAreas: string[];
  portfolioSize: number;
  averageCheck: number;
  lastActive: string;
  totalInvested: number;
  successfulDeals: number;
  successRate: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        data,
        success: true,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        data: null as T,
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Analytics endpoints
  async getDashboardMetrics() {
    return this.request('/analytics/dashboard');
  }

  async getUserActivityMetrics() {
    return this.request('/analytics/user-activity');
  }

  async getEnhancedMatchingMetrics() {
    return this.request('/analytics/enhanced-matching');
  }

  async getContentInteractionMetrics() {
    return this.request('/analytics/content-interaction');
  }

  async getEcosystemDistributionMetrics() {
    return this.request('/analytics/ecosystem-distribution');
  }

  async getMonetizationMetrics() {
    return this.request('/analytics/monetization');
  }

  async getEnhancedFinancialMetrics() {
    return this.request('/analytics/enhanced-financial');
  }

  async getGrowthTrends(months: number = 12) {
    return this.request(`/analytics/trends?months=${months}`);
  }

  // Auth endpoints
  async loginAdmin(email: string, password: string) {
    return this.request('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logoutAdmin() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminToken', token);
    }
  }
}

// Create a singleton instance
export const apiClient = new ApiClient();

// Helper functions for common operations
export const analyticsApi = {
  getDashboard: () => apiClient.getDashboardMetrics(),
  getUserActivity: () => apiClient.getUserActivityMetrics(),
  getMatching: () => apiClient.getEnhancedMatchingMetrics(),
  getContent: () => apiClient.getContentInteractionMetrics(),
  getEcosystem: () => apiClient.getEcosystemDistributionMetrics(),
  getMonetization: () => apiClient.getMonetizationMetrics(),
  getFinancial: () => apiClient.getEnhancedFinancialMetrics(),
  getTrends: (months?: number) => apiClient.getGrowthTrends(months),
};