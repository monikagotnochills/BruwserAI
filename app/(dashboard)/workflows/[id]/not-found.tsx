import Link from "next/link"
import { WorkflowIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"

export default function NotFoundPage() {
    return (
        <Empty className="h-full">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <WorkflowIcon />
                </EmptyMedia>
                <EmptyTitle>Workflow not found</EmptyTitle>
                <EmptyDescription>
                    The workflow you are looking for does not exist or may have been
                    removed.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button asChild>
                    <Link href="/workflows">Back to workflows</Link>
                </Button>
            </EmptyContent>
        </Empty>
    )
}
