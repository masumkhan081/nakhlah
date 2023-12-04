import { userDashboard } from '@/components/data';
import MyPlanPage from '@/components/userDashboard/MyPlanPage/MyPlanPage';
import React from 'react';

const MyPlan = () => {
    const data = userDashboard.myPlan
    return (
        <MyPlanPage data={data}/>
    );
};

export default MyPlan;