import MyPlan from "@/components/dashboard-user/MyPlan";
import { userDashboard } from "@/static-data/data";


const MyPlanPage = () => {
    const data = userDashboard.myPlan
    return (
        <MyPlan data={data}/>
    );
};

export default MyPlanPage;