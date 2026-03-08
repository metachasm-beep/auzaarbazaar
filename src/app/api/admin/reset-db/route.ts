import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.email !== "metachasm@gmail.com") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { type } = await req.json();
        const superAdminEmail = "metachasm@gmail.com";

        if (type === "ALL") {
            // Transactional delete of almost everything
            await (prisma as any).$transaction([
                prisma.event.deleteMany({}),
                prisma.messageAttachment.deleteMany({}),
                prisma.message.deleteMany({}),
                prisma.threadReadReceipt.deleteMany({}),
                prisma.messageThread.deleteMany({}),
                prisma.savedListing.deleteMany({}),
                prisma.quoteLineItem.deleteMany({}),
                prisma.quote.deleteMany({}),
                prisma.rfqTarget.deleteMany({}),
                prisma.rfqRequirement.deleteMany({}),
                prisma.rfq.deleteMany({}),
                prisma.inquiry.deleteMany({}),
                prisma.listingMedia.deleteMany({}),
                prisma.listingSpec.deleteMany({}),
                prisma.listing.deleteMany({}),
                prisma.orgVerification.deleteMany({}),
                prisma.orgMembership.deleteMany({}),
                prisma.org.deleteMany({}),
                prisma.user.deleteMany({
                    where: { email: { not: superAdminEmail } }
                })
            ]);
            return NextResponse.json({ success: true, message: "System fully reset. Only Super Admin remains." });
        }

        if (type === "TRANSACTIONS") {
            // Delete only transaction-based data
            await (prisma as any).$transaction([
                prisma.event.deleteMany({}),
                prisma.message.deleteMany({}),
                prisma.messageThread.deleteMany({}),
                prisma.quote.deleteMany({}),
                prisma.rfq.deleteMany({}),
                prisma.inquiry.deleteMany({}),
            ]);
            return NextResponse.json({ success: true, message: "All transactions, messages, and RFQs cleared." });
        }

        return NextResponse.json({ error: "Invalid reset type" }, { status: 400 });

    } catch (error: any) {
        console.error("Admin DB Reset Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
