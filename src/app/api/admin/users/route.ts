import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET all users
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.email !== "metachasm@gmail.com") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const users = await (prisma.user as any).findMany({
            include: {
                memberships: {
                    include: { org: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(users);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST create a new user manually
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.email !== "metachasm@gmail.com") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { email, fullName, phone } = await req.json();

        const user = await (prisma.user as any).create({
            data: { email, fullName, phone }
        });

        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
