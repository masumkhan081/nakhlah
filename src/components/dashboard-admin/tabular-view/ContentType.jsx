'use client'
import { DataTable } from './share/DataTable/DataTable';
import { LearningGoalAddItem_URL, LearningGoalGetAllItem_URL } from '../../../lib/url';
import { goalColumns } from './share/columns';
import { goalData } from '../../../static-data/data';


const ContentType = () => {
    // const goalDataCall = useLearningState((state) => state.data)
    // const getAllItemCall = useLearningState((state) => state.getAllItem)
    // const addItemAPICall = useLearningState((state) => state.addItem)
    // const errorMessageCall = useLearningState((state) => state.errorMessage)
    // useEffect(() => {
    //     if (Array.isArray(goalDataCall) && goalDataCall.length === 0) {
    //         getAllItemCall(LearningGoalGetAllItem_URL)
    //     }
    // }, [goalDataCall, getAllItemCall])
    // const {data, meta} = goalDataCall
    // const goalData =  data !== undefined && data.map(item => {
    //     const { id, attributes } = item;
    //     const { goal, time } = attributes;
    //     return {
    //         id,
    //         goal,
    //         time
    //     };
    // });
    return (
        <div className='w-full bg-white  rounded-xl'>
            {/* <DataTable columns={goalColumns} learningTitle={"goal"} addURL={LearningGoalAddItem_URL} getURL={LearningGoalGetAllItem_URL}/> */}
            <DataTable data={goalData} columns={goalColumns} learningTitle={"goal"}/>
        </div>
    );
};

export default ContentType;