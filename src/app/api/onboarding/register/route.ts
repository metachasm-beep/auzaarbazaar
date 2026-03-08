import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        const { name, orgType, phone, address, gstin, city, state, pincode } = data;

        if (!name || !orgType) {
            return NextResponse.json({ error: "Name and OrgType are required" }, { status: 400 });
        }

        // 1. Get/Update User
        const user = await (prisma.user as any).findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Update user phone if provided
        if (phone && !user.phone) {
            await (prisma.user as any).update({
                where: { id: user.id },
                data: { phone },
            });
        }

        // 2. Create Org and Membership in a transaction
        const result = await (prisma as any).$transaction(async (tx: any) => {
            const org = await tx.org.create({
                data: {
                    name,
                    orgType,
                    gstin: gstin || null,
                    phone: phone || null,
                    address1: address || null,
                    city: city || null,
                    state: state || null,
                    pincode: pincode || null,
                },
            });

            const membership = await tx.orgMembership.create({
                data: {
                    orgId: org.id,
                    userId: user.id,
                    role: "admin",
                },
            });

            return { org, membership };
        });

        // 3. Determine redirect path
        const redirectPath = orgType === "buyer" ? "/buyer/dashboard" : "/seller/dashboard";

        return NextResponse.json({ 
            success: true, 
            redirect: redirectPath,
            orgId: result.org.id 
        });

    } catch (error: any) {
        console.error("Onboarding Registration Error:", error);
        return NextResponse.json({ 
            error: error.message || "Failed to complete onboarding" 
        }, { status: 500 });
    }
}
