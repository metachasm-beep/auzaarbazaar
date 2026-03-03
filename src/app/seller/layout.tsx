import React from 'react';
import { SellerSidebar } from '@/components/dashboard/SellerSidebar';

export default function SellerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SellerSidebar>
            {children}
        </SellerSidebar>
    );
}
