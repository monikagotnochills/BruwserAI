"use client"

import * as React from "react"
import {
  MoreHorizontalIcon,
  PanelLeftIcon,
  PlusIcon,
  WorkflowIcon,
} from "lucide-react"

import { useWorkflows } from "@/components/workflow-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInput,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"

function WorkflowNav() {
  const { state } = useSidebar()

  if (state === "collapsed") {
    return <WorkflowNavCollapsed />
  }

  return <WorkflowNavExpanded />
}

function WorkflowNavExpanded() {
  const { workflows, selectedId, selectWorkflow, createWorkflow } =
    useWorkflows()
  const { toggleSidebar } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workflows</SidebarGroupLabel>
      <SidebarGroupAction title="New workflow" onClick={createWorkflow}>
        <PlusIcon />
        <span className="sr-only">New workflow</span>
      </SidebarGroupAction>
      <SidebarGroupAction
        title="Collapse sidebar"
        onClick={toggleSidebar}
        className="right-10"
      >
        <PanelLeftIcon />
        <span className="sr-only">Collapse sidebar</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {workflows.map((workflow) => (
            <WorkflowMenuItem
              key={workflow.id}
              workflow={workflow}
              isActive={workflow.id === selectedId}
              onSelect={() => selectWorkflow(workflow.id)}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function WorkflowMenuItem({
  workflow,
  isActive,
  onSelect,
}: {
  workflow: { id: string; name: string }
  isActive: boolean
  onSelect: () => void
}) {
  const { renameWorkflow, deleteWorkflow } = useWorkflows()
  const [isRenaming, setIsRenaming] = React.useState(false)

  if (isRenaming) {
    return (
      <SidebarMenuItem>
        <SidebarInput
          autoFocus
          defaultValue={workflow.name}
          onFocus={(event) => event.currentTarget.select()}
          onBlur={(event) => {
            renameWorkflow(workflow.id, event.currentTarget.value)
            setIsRenaming(false)
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              renameWorkflow(workflow.id, event.currentTarget.value)
              setIsRenaming(false)
            }
            if (event.key === "Escape") {
              setIsRenaming(false)
            }
          }}
        />
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} onClick={onSelect}>
        <span>{workflow.name}</span>
      </SidebarMenuButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover>
            <MoreHorizontalIcon />
            <span className="sr-only">Workflow options</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuItem onSelect={() => setIsRenaming(true)}>
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => deleteWorkflow(workflow.id)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}

function WorkflowNavCollapsed() {
  const { workflows, selectedId, selectWorkflow, createWorkflow } =
    useWorkflows()
  const { toggleSidebar } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              title="Expand sidebar"
              onClick={toggleSidebar}
            >
              <PanelLeftIcon />
              <span>Expand sidebar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Popover>
              <PopoverTrigger asChild>
                <SidebarMenuButton>
                  <WorkflowIcon />
                  <span>Workflows</span>
                </SidebarMenuButton>
              </PopoverTrigger>
              <PopoverContent side="right" align="start" className="w-56 p-1">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={createWorkflow}>
                      <PlusIcon />
                      <span>New workflow</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
                {workflows.length > 0 && (
                  <>
                    <SidebarSeparator className="mx-1 my-1" />
                    <SidebarMenu className="max-h-72 overflow-y-auto">
                      {workflows.map((workflow) => (
                        <SidebarMenuItem key={workflow.id}>
                          <SidebarMenuButton
                            isActive={workflow.id === selectedId}
                            onClick={() => selectWorkflow(workflow.id)}
                          >
                            <span>{workflow.name}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </>
                )}
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export { WorkflowNav }
