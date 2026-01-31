import { useState } from "react";
import Button from "../components/Button";
import StudentModal from "../components/modals/StudentModal";


interface PropsInterface{
    isEditMode?: boolean;
    className?: string;
    cellType: "student" | "work" | "date";
    workLink?: string | null;
    cellDateType?: "Лаб" | "Прак" | null;
    cellData?: string;
    id?: number;
    backgroundColor?: string;
    onClick?: Function;
}



export default function EditableTableCell({isEditMode = false, className = "valuev", cellType = "student", workLink = null, cellData = "inCell", cellDateType = null, onClick = () => {console.log("clicked")}, id=2}: PropsInterface){

    isEditMode = true;
    
    const handleClick = () => {
        if (workLink) {
            console.log("Я существую")
        }
        else {
            console.log("Я сушеный сморчок")
        }
    }

    switch (cellType) {
        case "student":
                    
            return  (
                isEditMode ? 
                <td className={className}>
                    <Button className={className} onClick={onClick} id={id}>{cellData}</Button>
                </td> :
                <td onClick={onClick} className={className}>
                    <p>Имя студента</p>
                </td>)

            break;
        case "work":
            if(isEditMode) {
                return (
                    <td className={className}>
                        <Button onClick={onClick}/>
                    </td>) 
            } else {
                return (
                    <td className={className} onClick={handleClick}>

                    </td>
                )

            }
            break;
        case "date":
            return  (
                isEditMode ? 
                <td className={className}>
                    <Button onClick={onClick}/>
                </td> :
                <td className={className}>
                    <div>23.01</div>
                    <div className="h-[2px] bg-bgDark dark:bg-bgDarkD"></div>
                    <div >Лаб</div>
                </td>)
            break;
    
        default:
            break;
    }
        
        
        
        

    
}