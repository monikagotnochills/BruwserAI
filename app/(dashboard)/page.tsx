"use client"

import { PlusIcon, WorkflowIcon } from "lucide-react"

import { useWorkflows } from "@/components/workflow-provider"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function Page() {
  const { workflows, selectedId, createWorkflow } = useWorkflows()
  const selected = workflows.find((workflow) => workflow.id === selectedId)

  if (selected) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <h1 className="font-heading text-lg font-medium tracking-tight">
          {selected.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          Workflow editor coming soon.
        </p>
      </div>
    )
  }

  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <WorkflowIcon />
        </EmptyMedia>
        <EmptyTitle>No workflow selected</EmptyTitle>
        <EmptyDescription>
          Select a workflow from the sidebar or create a new one to get
          started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={createWorkflow}>
          <PlusIcon />
          New workflow
        </Button>
      </EmptyContent>
    </Empty>
  )
}
