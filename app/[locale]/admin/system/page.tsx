import { getAuditLogs } from "@/lib/audit"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default async function AdminSystemPage() {
    const logs = await getAuditLogs()

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">System Audit Logs</h1>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Time</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>Resource</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>IP</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell className="whitespace-nowrap">
                                    {new Date(log.createdAt).toLocaleString()}
                                </TableCell>
                                <TableCell className="font-medium">{log.action}</TableCell>
                                <TableCell>{log.resource}</TableCell>
                                <TableCell>{log.user?.email || 'System/Anon'}</TableCell>
                                <TableCell className="max-w-xs truncate" title={log.details || ''}>
                                    {log.details || '-'}
                                </TableCell>
                                <TableCell>{log.ipAddress}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
