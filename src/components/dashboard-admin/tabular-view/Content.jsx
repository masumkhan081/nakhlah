// "use client";
// import DataTable  from '../table/DataTable';
// import ColContent from "../table/ColContent";
// import { useContent } from "../../../store/useAdminStore";
// import { useEffect } from "react";
// import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
// import { getHandler } from "@/lib/requestHandler";

// const Content = () => {
//     const learnerGoals = useLearnerGoal((state) => state.data);
//     const setGoals = useLearnerGoal((state) => state.setGoals);
//     const addEdit = useLearnerGoal((state) => state.addEdit);
  
//     useEffect(() => {
//       const fetch = async () => {
//         const response = await getHandler("learner-goal");
//         console.log(response.data);
//         if (response.status === 200) {
//           const goalData = response.data.data.map((item) => {
//             return {
//               id: item.id,
//               goal: item.attributes.goal,
//               time: item.attributes.time,
//             };
//           });
//           setGoals(goalData);
//         }
//       };
//       if (Array.isArray(learnerGoals) && learnerGoals.length === 0) {
//         fetch();
//       }
//     }, [learnerGoals]);

//   return (
//     <div className="w-full bg-white  rounded-xl">
//       <DataTable data={goalData} columns={goalColumns} learningTitle={"goal"} />
//     </div>
//   );
// };

// export default Content;
