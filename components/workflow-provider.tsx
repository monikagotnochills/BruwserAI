"use client"

import * as React from "react"

export type Workflow = {
  id: string
  name: string
}

type WorkflowContextProps = {
  workflows: Workflow[]
  selectedId: string | null
  selectWorkflow: (id: string | null) => void
  createWorkflow: () => void
  renameWorkflow: (id: string, name: string) => void
  deleteWorkflow: (id: string) => void
}

const WorkflowContext = React.createContext<WorkflowContextProps | null>(null)

function useWorkflows() {
  const context = React.useContext(WorkflowContext)
  if (!context) {
    throw new Error("useWorkflows must be used within a WorkflowProvider.")
  }

  return context
}

function WorkflowProvider({ children }: { children: React.ReactNode }) {
  const [workflows, setWorkflows] = React.useState<Workflow[]>([])
  const [selectedId, setSelectedId] = React.useState<string | null>(null)

  const createWorkflow = React.useCallback(() => {
    const workflow: Workflow = {
      id: crypto.randomUUID(),
      name: "Untitled workflow",
    }
    setWorkflows((workflows) => [...workflows, workflow])
    setSelectedId(workflow.id)
  }, [])

  const renameWorkflow = React.useCallback((id: string, name: string) => {
    const trimmed = name.trim()
    if (!trimmed) {
      return
    }

    setWorkflows((workflows) =>
      workflows.map((workflow) =>
        workflow.id === id ? { ...workflow, name: trimmed } : workflow
      )
    )
  }, [])

  const deleteWorkflow = React.useCallback((id: string) => {
    setWorkflows((workflows) =>
      workflows.filter((workflow) => workflow.id !== id)
    )
    setSelectedId((selectedId) => (selectedId === id ? null : selectedId))
  }, [])

  const contextValue = React.useMemo<WorkflowContextProps>(
    () => ({
      workflows,
      selectedId,
      selectWorkflow: setSelectedId,
      createWorkflow,
      renameWorkflow,
      deleteWorkflow,
    }),
    [workflows, selectedId, createWorkflow, renameWorkflow, deleteWorkflow]
  )

  return (
    <WorkflowContext.Provider value={contextValue}>
      {children}
    </WorkflowContext.Provider>
  )
}

export { WorkflowProvider, useWorkflows }
