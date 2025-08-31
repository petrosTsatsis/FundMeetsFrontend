"use client";

import * as React from "react";
import {
  Folder,
  Handshake,
  Search,
  Settings,
  SquareTerminal,
  Bell,
} from "lucide-react";

import { CustomSidebarHeader } from "./custom-sidebar-header";
import { useUserProfile } from "@/lib/UserProfileContext";

import { NavMain } from "./nav-main";
import { NavDealRooms } from "./nav-deal-rooms";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onSectionChange?: (section: string) => void;
  currentSection?: string;
}

export function AppSidebar({
  onSectionChange,
  currentSection,
  ...props
}: AppSidebarProps) {
  const userProfile = useUserProfile();

  // Memoize user data to prevent unnecessary re-renders
  const userData = React.useMemo(
    () => ({
      name:
        userProfile?.investorProfile?.name ||
        userProfile?.startupProfile?.name ||
        "User",
      email: userProfile?.email || "user@example.com",
      avatar:
        userProfile?.investorProfile?.profilePicture ||
        userProfile?.startupProfile?.logo ||
        "/avatars/user.jpg",
    }),
    [userProfile]
  );

  // Memoize deal rooms data
  // Placeholder until Deal Room is implemented
  const dealRooms = React.useMemo(
    () => [
      {
        name: "Tech Startup Fund",
        url: "/deal-rooms/tech-startup-fund",
        icon: Folder,
      },
      {
        name: "Healthcare Innovation",
        url: "/deal-rooms/healthcare-innovation",
        icon: Folder,
      },
      {
        name: "Green Energy Solutions",
        url: "/deal-rooms/green-energy-solutions",
        icon: Folder,
      },
      {
        name: "AI & Machine Learning",
        url: "/deal-rooms/ai-ml",
        icon: Folder,
      },
      {
        name: "Fintech Revolution",
        url: "/deal-rooms/fintech-revolution",
        icon: Folder,
      },
    ],
    []
  );

  // Memoize navigation data with section change handlers
  const navMainData = React.useMemo(
    () => [
      {
        title: "Discover",
        url: "#",
        icon: Search,
        isActive: currentSection === "discover",
        items: [
          {
            title: "Search Startups",
            url: "#",
            section: "search-startups",
          },
          {
            title: "Search Investors",
            url: "#",
            section: "search-investors",
          },
          {
            title: "Saved Profiles",
            url: "#",
            section: "saved-profiles",
          },
        ],
        section: "discover",
      },
      {
        title: "Matches",
        url: "#",
        icon: Handshake,
        section: "matches",
        isActive: currentSection === "matches",
      },
      {
        title: "Interest Requests",
        url: "#",
        icon: SquareTerminal,
        section: "interest-requests",
        isActive: currentSection === "interest-requests",
      },
      {
        title: "Notifications",
        url: "#",
        icon: Bell,
        section: "notifications",
        isActive: currentSection === "notifications",
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings,
        section: "settings",
        isActive: currentSection === "settings",
      },
    ],
    [currentSection]
  );

  // Handle section changes
  const handleSectionChange = (section: string) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CustomSidebarHeader
          userProfile={userProfile}
          onSectionChange={handleSectionChange}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={navMainData}
          onSectionChange={handleSectionChange}
          currentSection={currentSection}
        />
        <NavDealRooms
          dealRooms={dealRooms.slice(0, 5)}
          onSectionChange={handleSectionChange}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
