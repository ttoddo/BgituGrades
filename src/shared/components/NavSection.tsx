import type { ReactNode } from "react";
import Visits from "./SVG/Visits";


interface PropsInterface{
    className?: string;
    activityStatus: boolean; 
    childrenNode: ReactNode;
    childrenText: string;
    onClick?: () => void;
}




function NavSection({className = "flex", childrenNode = <Visits />, childrenText = "Посещаемость", activityStatus = true, onClick = () => {"I,ve been clicked"}} : PropsInterface){
    const isActive = (status:boolean) => {
        if(status){
            return " bg-primary dark:bg:primaryD"
        } else {
            return " "
        }
    }
    return(
        <div className={className + isActive(activityStatus)} onClick={onClick}>
            {childrenNode}
            {childrenText}
        </div>
    )
}

export default NavSection