import React from 'react';
import { BuyerSidebar } from '@/components/dashboard/BuyerSidebar';

export default function BuyerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <BuyerSidebar>
            {children}
        </BuyerSidebar>
    );
}
