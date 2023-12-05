import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ArrowUpDown, ClipboardEdit, Trash2 } from "lucide-react"
import Image from "next/image"
import Deletion from "../modal-body/Deletion"
import AddJourney from "../AddNewItem/AddJourney"
import { Main_URL } from "@/components/url"
import AddLearnerLevel from "../AddNewItem/AddLearnerLevel"

export const levelColumns = [
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
    accessorKey: "level",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='textPrimaryColor textNormal'
        >
          Level
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="lowercase textNormal textSecondaryColor">{row.getValue("level")}</div>
    },
  },
  {
    accessorKey: "formats",
    header: () => <div className="textPrimaryColor textNormal">Image</div>,
    cell: ({ row }) => {

      return <div >
        <Image src={`${Main_URL}${row.getValue('formats')?.small}`} alt="" width={40} height={40} className="rounded-full border-2 border-black" />
        {/* <Image src={`${row.getValue('formats').src}`} alt="" width={40} height={40} className="rounded-full border-2 border-black" /> */}
      </div>
    },
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
              <Deletion rowData={row.original} what="learnerLevel" />
            </DialogContent>
          </Dialog>
          <Dialog className="">
            <DialogTrigger asChild>
              <Button className="hover:text-[--uDText]">
                <ClipboardEdit className="" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <AddLearnerLevel
                title="learnerLevel"
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