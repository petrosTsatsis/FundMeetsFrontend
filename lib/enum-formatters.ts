// Enum formatting utilities for a consistent display across the application

// Mapping functions for enum display formatting
export function formatIndustry(industry: string | undefined | null): string {
    if (!industry) return "N/A";

    const industryMap: Record<string, string> = {
        FINTECH: "Fintech",
        HEALTHTECH: "Healthtech",
        EDTECH: "Edtech",
        AGRITECH: "Agritech",
        GREENTECH: "Greentech",
        AI: "AI",
        BIOTECH: "Biotech",
        SAAS: "SaaS",
        MARKETPLACE: "Marketplace",
        ECOMMERCE: "E-commerce",
        PROPTECH: "Proptech",
        INSURTECH: "Insurtech",
        MOBILITY: "Mobility",
        LOGISTICS: "Logistics",
        GAMING: "Gaming",
        MARTECH: "Martech",
        CYBERSECURITY: "Cybersecurity",
        BLOCKCHAIN: "Blockchain",
        IOT: "IoT",
        HRTECH: "HR Tech",
        TRAVELTECH: "Travel Tech",
        CONSUMER_TECH: "Consumer Tech",
        LEGALTECH: "Legal Tech",
        SOCIAL_IMPACT: "Social Impact",
        GOVTECH: "Gov Tech",
        MEDIA: "Media",
        OTHER: "Other",
    };

    return industryMap[industry] || industry;
}

// format a Startup stage
export function formatStage(stage: string | undefined | null): string {
    if (!stage) return "N/A";

    const stageMap: Record<string, string> = {
        IDEA: "Idea",
        PRE_SEED: "Pre-seed",
        SEED: "Seed",
        SERIES_A: "Series A",
        SERIES_B: "Series B",
        SERIES_C: "Series C",
        GROWTH: "Growth",
        IPO: "IPO",
        GRANT: "Grant",
        ACQUISITION: "Acquisition",
        NOT_SEEKING: "Not Seeking",
    };

    return stageMap[stage] || stage;
}

// format Investor type
export function formatInvestorType(
    investorType: string | undefined | null
): string {
    if (!investorType) return "N/A";

    const investorTypeMap: Record<string, string> = {
        ANGEL_INVESTOR: "Angel Investor",
        VENTURE_CAPITAL: "Venture Capital",
        MICRO_VC: "Micro VC",
        CORPORATE_VC: "Corporate VC",
        FAMILY_OFFICE: "Family Office",
        PRIVATE_EQUITY: "Private Equity",
        HEDGE_FUND: "Hedge Fund",
        SOVEREIGN_WEALTH: "Sovereign Wealth",
        ACCELERATOR: "Accelerator",
        CROWDFUNDING: "Crowdfunding",
        PENSION_FUND: "Pension Fund",
        IMPACT_INVESTOR: "Impact Investor",
        UNIVERSITY_ENDOWMENT: "University Endowment",
    };

    return investorTypeMap[investorType] || investorType;
}

// format Startup business model
export function formatBusinessModel(
    businessModel: string | undefined | null
): string {
    if (!businessModel) return "N/A";

    const businessModelMap: Record<string, string> = {
        SAAS: "SaaS",
        MARKETPLACE: "Marketplace",
        ECOMMERCE: "E-commerce",
        SUBSCRIPTION: "Subscription",
        TRANSACTIONAL: "Transactional",
        FREEMIUM: "Freemium",
        ADVERTISING: "Advertising",
        LICENSING: "Licensing",
        HARDWARE: "Hardware",
        SERVICES: "Services",
        FRANCHISE: "Franchise",
        OPEN_SOURCE: "Open Source",
        DONATION: "Donation",
        HYBRID: "Hybrid",
    };

    return businessModelMap[businessModel] || businessModel;
}

// format Startup status
export function formatStartupStatus(status: string | undefined | null): string {
    if (!status) return "N/A";

    const statusMap: Record<string, string> = {
        STEALTH: "Stealth",
        ACTIVE: "Active",
        SCALING: "Scaling",
        PIVOTING: "Pivoting",
        ACQUIRED: "Acquired",
        MERGED: "Merged",
        CLOSED: "Closed",
        PUBLIC: "Public",
    };

    return statusMap[status] || status;
}

// format Interest request status
export function formatInterestStatus(
    status: string | undefined | null
): string {
    if (!status) return "N/A";

    const statusMap: Record<string, string> = {
        PENDING: "Pending",
        ACCEPTED: "Accepted",
        REJECTED: "Rejected",
        WITHDRAWN: "Withdrawn",
    };

    return statusMap[status] || status;
}

// format Deal status
export function formatDealStatus(status: string | undefined | null): string {
    if (!status) return "N/A";

    const statusMap: Record<string, string> = {
        INITIATED: "Initiated",
        DUE_DILIGENCE: "Due Diligence",
        NEGOTIATION: "Negotiation",
        AGREED: "Agreed",
        CLOSED: "Closed",
        REJECTED: "Rejected",
    };

    return statusMap[status] || status;
}

// format currency to decide what the prefix should be
export function formatCurrency(amount: number, currency: string): string {
    if (amount >= 1_000_000) {
        return `${(amount / 1_000_000).toFixed(1)}M ${currency}`;
    } else if (amount >= 1_000) {
        return `${(amount / 1_000).toFixed(0)}k ${currency}`;
    } else {
        return `${amount} ${currency}`;
    }
}
