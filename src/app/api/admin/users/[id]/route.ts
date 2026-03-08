import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.email !== "metachasm@gmail.com") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id: userId } = await params;

        // Prevent self-deletion of super admin
        const userToDelete = await (prisma.user as any).findUnique({ where: { id: userId } });
        if (userToDelete?.email === "metachasm@gmail.com") {
            return NextResponse.json({ error: "Cannot delete the Super Admin account." }, { status: 403 });
        }

        await (prisma.user as any).delete({
            where: { id: userId }
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
