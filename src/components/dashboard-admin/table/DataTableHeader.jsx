import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IoIosAddCircleOutline } from "react-icons/io";
//
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
//
import AddGoal from "../modals/AddGoal";
import AddPurpose from "../modals/AddPurpose";
import AddStartingPoint from "../modals/AddStartPoint";
import AddLearnerLevel from "../modals/AddLearnerLevel";
import AddJourney from "../modals/AddJourney";
import AddTaskUnit from "../modals/AddTaskUnit";
import AddLevel from "../modals/AddLevel";
import AddLesson from "../modals/AddLesson";
import AddQueType from "../modals/AddQueType";
import AddContentType from "../modals/AddContentType";
import AddConTypeCategory from "../modals/AddConTypeCategory";

const viewMap = {
  // learning journey
  "learning-journey": "id_learning_journey",
  "learning-unit": "id_learning_unit",
  "learning-level": "id_learning_level",
  "learning-lesson": "id_learning_lesson",
  // get-start or ?
  "learner-goal": "id_learner_goal",
  "learner-purpose": "id_learner_purpose",
  "learner-start-point": "id_learner_start_point",
  "learner-level": "id_learner_level",
  // questionaries
  "question-type": "id_question_type",
  "content-type": "id_content_type",
  "content-type-category": "id_content_type_category",
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
            {view == "learning-journey" && <AddJourney title={view} />}
            {view == "learning-level" && <AddLevel title={view} />}
            {view == "learning-lesson" && <AddLesson title={view} />}
            {view == "learning-unit" && <AddTaskUnit title={view} />}
            {view == "learner-goal" && <AddGoal title={view} />}
            {view == "learner-purpose" && <AddPurpose title={view} />}
            {view == "learner-start-point" && <AddStartingPoint title={view} />}
            {view == "learner-level" && <AddLearnerLevel title={view} />}
            {view == "question-type" && <AddQueType title={view} />}
            {view == "content-type" && <AddContentType title={view} />}
            {view == "content-type-category" && (
              <AddConTypeCategory title={view} />
            )}
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
