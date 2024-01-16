import CustomSelect from "@/components/ui-custom/CustomSelect";
import {
  renderableLearningLevels,
  renderableLessons,
  renderableTaskUnits,
  renderableTasks,
} from "@/lib/fetchFunctions";
import { getHandler } from "@/lib/requestHandler";
import {
  useLearningJourney,
  useLearningLesson,
  useLearningLevel,
  useLearningUnit,
} from "@/store/useAdminStore";
import React, { useEffect, useState } from "react";

export default function QueFilter() {
  const journeyData = useLearningJourney((state) => state.data);
  const setJournies = useLearningJourney((state) => state.setJournies);
  //
  const unitData = useLearningUnit((state) => state.data);
  const setUnits = useLearningUnit((state) => state.setUnits);
  //
  const levelData = useLearningLevel((state) => state.data);
  const setLevels = useLearningLevel((state) => state.setLevels);
  //
  const lessonData = useLearningLesson((state) => state.data);
  const setLessons = useLearningLesson((state) => state.setLessons);

  const initStateSelection = {
    id: null,
    title: "",
  };

  function filterUnitsByJourney(id) {
    setFilteredUnits(unitData.filter((item) => item.learning_journey.id == id));
  }

  function filterLevelsByUnit(id) {
    setFilteredLevels(
      levelData.filter((item) => item.learning_journey_unit.id == id)
    );
  }

  const [selectedLesson, setSelectedLesson] = useState(initStateSelection);
  function filterLessonsByLevel(id) {
    setFilteredLessons(
      lessonData.filter((item) => item.learning_journey_level.id == id)
    );
  }
  const [filteredLessons, setFilteredLessons] = useState([]);

  const [selectedJourney, setSelectedJourney] = useState(initStateSelection);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(initStateSelection);
  const [filteredLevels, setFilteredLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(initStateSelection);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-journey");
      if (response.status === 200) {
        setJournies(renderableLearningLevels(response.data.data));
      }
    };
    if (Array.isArray(journeyData) && journeyData.length === 0) {
      fetch();
    }
  }, [journeyData]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-unit");
      if (response.status === 200) {
        setUnits(renderableTasks(response.data.data));
      }
    };
    if (Array.isArray(unitData) && unitData.length === 0) {
      fetch();
    }
  }, [unitData]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-level");
      if (response.status === 200) {
        setLevels(renderableTaskUnits(response.data.data));
      }
    };
    if (Array.isArray(levelData) && levelData.length === 0) {
      fetch();
    }
  }, [levelData]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-lesson");
      if (response.status === 200) {
        setLessons(renderableLessons(response.data.data));
      }
    };
    if (Array.isArray(lessonData) && lessonData.length === 0) {
      fetch();
    }
  }, [lessonData]);
  //
  useEffect(() => {
    if (selectedJourney.id != null) {
      setSelectedUnit(initStateSelection);
      filterUnitsByJourney(selectedJourney.id);
    }
  }, [selectedJourney]);

  useEffect(() => {
    if (selectedUnit.id != null) {
      setSelectedLevel(initStateSelection);
      filterLevelsByUnit(selectedUnit.id);
    }
  }, [selectedUnit]);

  //
  return (
    <div className="flex gap-1 items-center max-h-[28px]">
      <CustomSelect
        value={selectedJourney}
        ph={"Select Level"}
        options={journeyData}
        bg="wh"
        onChange={(value) =>
          setSelectedJourney({ id: value.id, title: value.title })
        }
      />

      <CustomSelect
        value={selectedUnit}
        options={filteredUnits}
        bg="wh"
        ph={"Select Task"}
        onChange={(value) =>
          setSelectedUnit({ id: value.id, title: value.title })
        }
      />
      <CustomSelect
        ph={"Select Task Unit"}
        value={selectedLevel}
        options={filteredLevels}
        bg="wh"
        onChange={(value) =>
          setSelectedLevel({ id: value.id, title: value.title })
        }
      />
      <CustomSelect
        ph={"Select Lesson"}
        value={selectedLesson}
        options={filteredLessons}
        bg="wh"
        onChange={(value) =>
          setSelectedLesson({ id: value.id, title: value.title })
        }
      />
    </div>
  );
}
