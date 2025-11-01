// components/UserProfileContext.tsx
"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { UserData } from "@/lib/api";

interface UserProfileContextType {
    userProfile: UserData | null;
    setUserProfile: (profile: UserData) => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

interface UserProfileProviderProps {
    children: React.ReactNode;
    initialProfile?: UserData | null;
}

export const UserProfileProvider = ({ children, initialProfile = null }: UserProfileProviderProps) => {
    const [userProfile, setUserProfile] = useState<UserData | null>(initialProfile);

    useEffect(() => {
        setUserProfile(initialProfile ?? null);
    }, [initialProfile]);

    return (
        <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
            {children}
        </UserProfileContext.Provider>
    );
};

export const useUserProfile = () => {
    const context = useContext(UserProfileContext);
    if (!context) {
        throw new Error("useUserProfile must be used within a UserProfileProvider");
    }
    return context.userProfile;
};

export const useSetUserProfile = () => {
    const context = useContext(UserProfileContext);
    if (!context) {
        throw new Error("useSetUserProfile must be used within a UserProfileProvider");
    }
    return context.setUserProfile;
};
