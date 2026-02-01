import { useState } from "react";
import Button from "../components/Button";
import StudentModal from "../components/modals/StudentModal";


interface PropsInterface{
    isEditMode?: boolean;
    className?: string;
    cellType: "student" | "work" | "date";
    workLink?: string | null;
    cellDateType?: "Лек" | "Прак" | null;
    cellData?: string;
<<<<<<< HEAD
    id?: number;
    backgroundColor?: string;
    onClick?: Function;
=======
    onClick?: () => void;
>>>>>>> 5fef1af7dd9c68d3be57def2bed13dcc1c1f2722
}



<<<<<<< HEAD
export default function EditableTableCell({isEditMode = false, className = "valuev", cellType = "student", workLink = null, cellData = "inCell", cellDateType = null, onClick = () => {console.log("clicked")}, id=2}: PropsInterface){

    isEditMode = true;
    
=======
export default function EditableTableCell({isEditMode = false, className = "valuev", cellType = "student", workLink = null, cellData = "inCell", cellDateType = null, onClick}: PropsInterface){
>>>>>>> 5fef1af7dd9c68d3be57def2bed13dcc1c1f2722
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
<<<<<<< HEAD
                <td className={className}>
                    <Button className={className} onClick={onClick} id={id}>{cellData}</Button>
                </td> :
                <td onClick={onClick} className={className}>
                    <p>Имя студента</p>
=======
                <td className={className} onClick={onClick}>
                    <Button />
                </td> :
                <td className={className} onClick={onClick}>
                    <p>{cellData}</p>
>>>>>>> 5fef1af7dd9c68d3be57def2bed13dcc1c1f2722
                </td>)
        case "work":
            if(isEditMode) {
                return (
<<<<<<< HEAD
                    <td className={className}>
                        <Button onClick={onClick}/>
=======
                    <td className={className} onClick={onClick}>
                        <Button />
>>>>>>> 5fef1af7dd9c68d3be57def2bed13dcc1c1f2722
                    </td>) 
            } else {
                return (
                    <td className={className} onClick={onClick}>

                    </td>
                )

            }
        case "date":
            return  (
                isEditMode ? 
<<<<<<< HEAD
                <td className={className}>
                    <Button onClick={onClick}/>
=======
                <td className={className} onClick={onClick}>
                    <Button />
>>>>>>> 5fef1af7dd9c68d3be57def2bed13dcc1c1f2722
                </td> :
                <td className={className} onClick={onClick}>
                    <div>{cellData}</div>
                    <div className="h-[2px] bg-bgDark dark:bg-bgDarkD"></div>
                    <div >{cellDateType}</div>
                </td>)
        default:
            break;
    }
        
        
        
        

    
}