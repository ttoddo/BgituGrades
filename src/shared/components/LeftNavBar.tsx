import Tasks from "./SVG/Tasks"
import Visits from "./SVG/Visits"

function LeftNavBar(){
    return (
       <div className="w-[125px] h-[570px] flex-col items-center gap-[50px] ">
        <div className="flex-col justify-center items-center gap-[10px]">
            <Visits />
            <p className="">Посещаемость</p>
        </div>
        <div className="flex-col justify-center items-center gap-[10px]">
            <Tasks />
            <p className="">Работы</p>
        </div>
       </div> 
    )
}

export default LeftNavBar