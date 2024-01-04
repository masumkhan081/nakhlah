"use client";
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
import { ChevronDown, Filter, Plus } from "lucide-react";
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
import AddQuestion from "../modals/AddQuestion";
import AddContent from "../modals/AddContent";
import AddQueContent from "../modals/AddQueContent";
import AddQueContOption from "../modals/AddQueContOption";
import { useTabularView } from "@/store/useAdminStore";

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
  question: "id_question",
  content: "id_content",
  "question-content": "id_question_content",
  "question-content-option": "id_question_content_option",
};

// {table,title, addURL, addItemAPICall, errorMessageCall}
export default function DataTableHeader({ table, view, filter }) {
  const currentView = useTabularView((state) => state.data.currentView);
  const addWhat = currentView.slice(0, currentView.length - 1);

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center border border-slate-300 rounded-md">
        <span className="h-full border-r border-slate-400 ">
          <Filter className="w-5 h-5 mx-1 text-slate-600" />
        </span>
        <Input
          placeholder={`Filter ${currentView}`}
          value={table.getColumn(viewMap[view])?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn(viewMap[view])?.setFilterValue(event.target.value)
          }
          className="max-w-[350px] min-w-[220px] text-center text-slate-700 px-3 py-1 placeholder:text-slate-500 "
        />
      </div>

      <div className="flex items-center gap-4">
        {/* modal button add new item */}
        <Dialog className="">
          <DialogTrigger asChild>
            <Button className="text-sm font-semibold font-sans bg-slate-50 hover:bg-slate-100 hover:shadow-sm hover:drop-shadow-md border border-slate-300  text-slate-600 gap-2 py-0.25 px-3">
              <Plus className="w-5 h-5 mx-1" />
              <span className="">{`Add ${addWhat}`}</span>
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
            {view == "question" && <AddQuestion title={view} />}{" "}
            {view == "content" && <AddContent title={view} />}
            {view == "question-content" && <AddQueContent title={view} />}
            {view == "question-content-option" && (
              <AddQueContOption title={view} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
