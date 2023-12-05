"use client";
import { useEffect } from "react";
import DataTable from "../table/DataTable";
import { journey_add_url, journey_get_url } from "../../../lib/url";
import { staticJourneyData } from "../../../static-data/data";
import { useJourney } from "../../../store/useAdminStore";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Main_URL } from "../../../lib/url";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUpDown, ClipboardEdit, Trash2 } from "lucide-react";
import Deletion from "../modals/Deletion";
import AddJourney from "../modals/AddJourney";


export default function LearningJourney() {
  const journeyData = useJourney((state) => state.data);
  const getJournies = useJourney((state) => state.getJournies);
  const addNewJourney = useJourney((state) => state.addNewJourney);
  //   const errorMessageCall = useJourney((state) => state.errorMessage);

  useEffect(() => {
    if (Array.isArray(journeyData) && journeyData.length === 0) {
      getJournies(journey_get_url);
    }
  }, [journeyData, getJournies]);

  // _____________________________________________don,t remove
  // const { data, meta } = journeyData;
  // const dataRenderable =
  //   data !== undefined &&
  //   data.map((item) => {
  //     const { id, attributes } = item;
  //     const { title } = attributes;
  //     return {
  //       id,
  //       title,
  //     };
  //   });
  // _____________________________________________don,t remove

  return (
    <div className="w-full bg-white  rounded-xl">
      <DataTable data={journeyData} columns={columnJourney} view={"journey"} />
    </div>
  );
}


