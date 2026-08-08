"use client"

import { AlertTriangleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"

export default function ErrorPage({
    reset,
    error,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    void error

    return (
        <Empty className="h-full">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <AlertTriangleIcon />
                </EmptyMedia>
                <EmptyTitle>Something went wrong</EmptyTitle>
                <EmptyDescription>
                    This workflow could not be loaded. Please try again.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button onClick={reset}>Try again</Button>
            </EmptyContent>
        </Empty>
    )
}
