import { PrismaClient } from '@prisma/client';
import { headers } from 'next/headers';

const prisma = new PrismaClient();

export async function logAudit(action: string, resource: string, details?: string, userId?: string) {
    try {
        const headersList = await headers();
        const ipAddress = headersList.get('x-forwarded-for') || 'unknown';

        await prisma.auditLog.create({
            data: {
                action,
                resource,
                details,
                ipAddress,
                userId
            }
        });
    } catch (e) {
        console.error('Failed to write audit log:', e);
        // Do not throw, audit logging should be best-effort to not break main flow
    }
}

export async function getAuditLogs() {
    return await prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
        include: { user: { select: { email: true } } }
    });
}
