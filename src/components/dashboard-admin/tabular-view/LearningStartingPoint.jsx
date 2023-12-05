'use client'
import { useEffect, useState } from "react";
import { DataTable } from "../share/DataTable/DataTable";
// import { LearningStartingPointAddItem_URL, LearningStartingPointGetAllItem_URL } from "@/components/url";
// import { startingPointColumns } from "../share/columns";
// import { startingPointData } from "@/components/data";
import { useLearningState } from "@/store/useAdminStore";
import { handleGetItem } from "../share/handleGetData";
import { startingPointColumns } from "../share/Column/StartingPoint";
import { shallow } from 'zustand/shallow'
import { LearningStartingPointGetAllItem_URL } from "@/components/url";

const LearningStartingPoint = () => {
    // const statingPointDataCall = useLearningState((state) => state.data)
    // const getAllItemCall = useLearningState((state) => state.getAllItem)
    // const addItemAPICall = useLearningState((state) => state.addItem)
    // const errorMessageCall = useLearningState((state) => state.errorMessage)
    // useEffect(() => {
    //     if (Array.isArray(statingPointDataCall) && statingPointDataCall.length === 0) {
    //         getAllItemCall(LearningStartingPointGetAllItem_URL)
    //     }
    // }, [statingPointDataCall, getAllItemCall])
    // const {data, meta} = statingPointDataCall
    // const startingPointData =  data !== undefined && data.map(item => {
    //     const { id, attributes } = item;
    //     const { title,subtitle, icon } = attributes;

    //     const formats = {
    //         large: icon.data?.attributes?.formats.large?.url,
    //         small: icon.data?.attributes?.formats.small?.url,
    //         medium: icon.data?.attributes?.formats.medium?.url,
    //         thumbnail: icon.data?.attributes?.formats.thumbnail?.url
    //     };

    //     return {
    //         id,
    //         title,
    //         subtitle,
    //         formats
    //     };
    // });


    const [data, setData] = useState([])

    useEffect(() => {

        const unsubget = useLearningState.subscribe((state) => state.getAllItem,
            (get, preGet) => get(LearningStartingPointGetAllItem_URL),
            {
                equalityFn: shallow,
                fireImmediately: true,
            }
        )
        useLearningState.subscribe((state) => state.data, (data, preData) => {
            const dataInfo = data.data !== undefined && handleGetItem(data.data, 'startingPoint')
            setData(dataInfo)
        })
        return unsubget

    }, [])
    console.log(data)
    return (
        <div className='w-full bg-white  rounded-xl'>
            {/* <DataTable columns={startingPointColumns} learningTitle={"title"} addURL={LearningStartingPointAddItem_URL} getURL={LearningStartingPointGetAllItem_URL}/> */}
            {/* <DataTable data={startingPointData} columns={startingPointColumns} learningTitle={"title"} /> */}
            <DataTable
                data={data}
                columns={startingPointColumns}
                view={"startingPoint"}
            />
        </div>
    );
};

export default LearningStartingPoint;