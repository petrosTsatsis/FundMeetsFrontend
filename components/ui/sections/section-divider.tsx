import React from 'react';

interface SectionDividerProps {
    className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
    className = ''
}) => {
    return (
        <div className={`relative w-full ${className}`}>
            <div className="absolute inset-0 flex items-center">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent"></div>
            </div>
        </div>
    );
}; 