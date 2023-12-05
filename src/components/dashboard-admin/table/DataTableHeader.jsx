import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IoIosAddCircleOutline } from "react-icons/io";
//
import AddJourney from "../modals/AddJourney";
import AddTaskUnit from "../modals/AddTaskUnit";
import AddLevel from "../modals/AddLevel";
import AddLesson from "../modals/AddLesson";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import AddGoal from "../modals/AddGoal";
import AddPurpose from "../modals/AddPurpose";
import AddStartingPoint from "../modals/AddStartingPoint";
import AddLearnerLevel from "../modals/AddLearnerLevel";

const viewMap = {
  journey: "id_journey_titel",
  task: "id_task_titel",
  level: "id_level_titel",
  lesson: "id_lesson_titel",
  goal: "goal",
  purpose: "purpose",
  startingPoint: "startingPoint",
  learnerLevel: "learnerLevel",
};

// {table,title, addURL, addItemAPICall, errorMessageCall}
const DataTableHeader = ({ table, view }) => {
  return (
    <div className="flex items-center justify-between py-4">
      <Input
        placeholder={`Filter ${view}...`}
        // value={table.getColumn(`${title}`)?.getFilterValue() ?? ""}
        // onChange={(event) =>
        //   table.getColumn(`${title}`)?.setFilterValue(event.target.value)
        // }
        value={table.getColumn(viewMap[view])?.getFilterValue() ?? ""}
        onChange={(event) =>
          table.getColumn(viewMap[view])?.setFilterValue(event.target.value)
        }
        className="max-w-sm border-[1px] textSecondaryColor  px-3 py-[10px] placeholder:text-xl "
      />
      <div className="flex items-center gap-4">
        {/* modal button add new item */}
        <Dialog className="">
          <DialogTrigger asChild>
            <Button className="textNormal textSecondaryColor gap-2 border-[1px] py-2 px-3">
              <IoIosAddCircleOutline /> <span className="">Add New</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px]">
            {/* <AddNewItem  title={title}  isJourney={false}/> */}
            {view == "journey" && <AddJourney title={view} />}
            {view == "level" && <AddLevel title={view} />}
            {view == "lesson" && <AddLesson title={view} />}
            {view == "task" && <AddTaskUnit title={view} />}
            {view == "goal" && <AddGoal title={view} />}
            {view == "purpose" && <AddPurpose title={view} />}
            {view == "startingPoint" && <AddStartingPoint title={view} />}
            {view == "learnerLevel" && <AddLearnerLevel title={view} />}
          </DialogContent>
        </Dialog>
        {/* table columns hide dropdown section */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="border-[1px] textSecondaryColor textNormal  py-2 px-3 ">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize textSecondaryColor"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </div>
  );
};

export default DataTableHeader;
