import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        const { 
            title, 
            category, 
            condition, 
            description, 
            price, 
            priceType,
            specs, // Array of { key, value }
            media // Array of { url, type }
        } = data;

        // 1. Get user and their organization
        const user = await (prisma.user as any).findUnique({
            where: { email: session.user.email },
            include: {
                memberships: {
                    include: { org: true }
                }
            }
        });

        if (!user || user.memberships.length === 0) {
            return NextResponse.json({ error: "No organization found for this user." }, { status: 403 });
        }

        // Use the first membership (primary org)
        const primaryOrg = user.memberships[0].org;

        if (primaryOrg.orgType === 'buyer') {
             return NextResponse.json({ error: "Buyer accounts cannot create listings." }, { status: 403 });
        }

        // 2. Create Listing within a transaction
        const listing = await (prisma as any).$transaction(async (tx: any) => {
            const newListing = await tx.listing.create({
                data: {
                    orgId: primaryOrg.id,
                    title,
                    category,
                    condition: condition || 'new',
                    description: description || '',
                    price: price ? parseFloat(price) : null,
                    priceType: priceType || 'fixed',
                    status: 'active'
                }
            });

            // Create specs if provided
            if (specs && Array.isArray(specs)) {
                await tx.listingSpec.createMany({
                    data: specs.map((s: any) => ({
                        listingId: newListing.id,
                        label: s.label,
                        value: s.value
                    }))
                });
            }

            // Create media placeholders if provided (just URLs for now)
            if (media && Array.isArray(media)) {
                await tx.listingMedia.createMany({
                    data: media.map((m: any, idx: number) => ({
                        listingId: newListing.id,
                        url: m.url,
                        mediaType: m.type || 'image',
                        position: idx
                    }))
                });
            }

            return newListing;
        });

        return NextResponse.json({ 
            success: true, 
            listingId: listing.id,
            message: "Listing published successfully!" 
        });

    } catch (error: any) {
        console.error("Listing Creation Error:", error);
        return NextResponse.json({ 
            error: error.message || "Failed to create listing" 
        }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get('limit') || '10');
        
        // Fetch most recent active listings
        const listings = await (prisma.listing as any).findMany({
            where: { status: 'active' },
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                org: {
                    select: { name: true, city: true }
                },
                media: {
                    take: 1,
                    orderBy: { position: 'asc' }
                }
            }
        });

        return NextResponse.json(listings);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
