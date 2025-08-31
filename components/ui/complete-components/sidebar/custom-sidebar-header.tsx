"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserData } from "@/lib/api";

interface CustomSidebarHeaderProps {
  userProfile: UserData | null;
  onSectionChange?: (section: string) => void;
}

export function CustomSidebarHeader({
  userProfile,
  onSectionChange,
}: CustomSidebarHeaderProps) {
  let role = userProfile?.role || "User";
  let name = "User";
  let firstLetter = "U";

  if (role === "STARTUP") {
    firstLetter =
      userProfile?.startupProfile?.name?.charAt(0)?.toUpperCase() || "U";
    name = userProfile?.startupProfile?.name.slice(0, 4) || "Startup";
    role = "Startup";
  } else if (role === "INVESTOR") {
    firstLetter =
      userProfile?.investorProfile?.name?.charAt(0)?.toUpperCase() || "U";
    name = userProfile?.investorProfile?.name.slice(0, 4) || "Investor";
    role = "Investor";
  }

  const handleHeaderClick = () => {
    if (onSectionChange) {
      onSectionChange("overview");
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-sidebar-accent/80 hover:bg-sidebar-accent/90 border-b border-sidebar-border/20 cursor-pointer"
          onClick={handleHeaderClick}
        >
          <div className="bg-[var(--primary-800)] text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            {firstLetter}
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{name} - Dashboard</span>
            <span className="truncate text-xs">{role}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
