import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, ClipboardEdit, Trash2 } from "lucide-react"
import Deletion from "../modals/Deletion"
import AddGoal from "../modals/AddGoal"

export const goalColumns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: () => (
        <div className="textNormal textPrimaryColor">ID</div>
      ),
      cell: ({ row }) => {
        const rowId = parseInt(row.id) + 1
        return (
          <div className="textSecondaryColor textNormal">{rowId} </div>
        )
      },
    },
    {
      accessorKey: "goal",
      header: ({ column }) => {
        return (
          <Button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className='textPrimaryColor textNormal'
          >
            Goal
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div className="lowercase textNormal textSecondaryColor">{row.getValue("goal")}</div>
      },
    },
    {
      accessorKey: "time",
      header: ({ column }) => {
        return (
          <Button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className='textPrimaryColor textNormal'
          >
            Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase textNormal textSecondaryColor">{row.getValue("time")}</div>,
    },
    {
      id: "actions",
      header: () => (
        <div className="textNormal textPrimaryColor text-center">Actions</div>
      ),
      enableHiding: false,
      cell: ({ row }) => {
        
        return (
          <div className="flex gap-2 justify-center textSecondaryColor textSemiHeader">
            <Dialog className="">
            <DialogTrigger asChild>
              <Button className="hover:text-[--uDText]">
                <Trash2 className="" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <Deletion rowData={row.original.data} what="goal" />
            </DialogContent>
          </Dialog>
          <Dialog className="">
            <DialogTrigger asChild>
              <Button className="hover:text-[--uDText]">
                <ClipboardEdit className="" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <AddGoal
                title="goal"
                useForEdit={true}
                rowData={row.original}
              />
            </DialogContent>
          </Dialog>
          </div>
        )
      },
    },
  ]