import { useLocation, useNavigate } from "react-router-dom";
import NavSection from "./NavSection"
import Tasks from "./SVG/Tasks"
import Visits from "./SVG/Visits"
import { useState } from "react";

interface PropsInterface{
    visitsStatus:boolean;
    tasksStatus: boolean;
}

function LeftNavBar({visitsStatus = false, tasksStatus = false}: PropsInterface){



    const navigate = useNavigate();
    function handleVisitClick(){
        navigate('/visit')

    }
    function handleTaskClick(){
        navigate('/task')

    }



    return (
       <div className="w-31.25 h-142.5 bg-bgMiddle dark:bg-bgMiddleD flex flex-col items-center gap-12.5  ">
        {/* Заменил кнопки в левом навбарек на компоненты с пропсами, также теперь можно передавать активна ли страница для подсвечивания кнопки на навбаре через activityStatus */}
            <NavSection className={"h-[100px] w-[125px] flex pt-2.5 flex-col cursor-pointer text-tLight dark:text-tLightD justify-center items-center gap-2.5 rounded-[8px] hover:opacity-85 hover:bg-bgModal dark:hover:bg-bgModalD transition duration-300 disabled"} childrenNode={<Visits />} onClick={handleVisitClick} childrenText="Посещаемость" activityStatus={visitsStatus} />
            <NavSection className={"h-[100px] w-[125px] flex pt-2.5 flex-col cursor-pointer text-tLight dark:text-tLightD justify-center items-center gap-2.5 rounded-[8px] hover:opacity-85 hover:bg-bgModal dark:hover:bg-bgModalD transition duration-300 disabled:" + String(tasksStatus) }childrenNode={<Tasks />} childrenText="Работы" onClick={handleTaskClick} activityStatus={tasksStatus} />
       </div> 
    )
}

export default LeftNavBar