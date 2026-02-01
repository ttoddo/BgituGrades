import Button from "../components/Button";


interface PropsInterface{
    isEditMode?: boolean;
    className?: string;
    cellType: "student" | "work" | "date";
    workLink?: string | null;
    cellDateType?: "Лек" | "Прак" | null;
    cellData?: string;
    onClick?: () => void;
}



export default function EditableTableCell({isEditMode = false, className = "valuev", cellType = "student", workLink = null, cellData = "inCell", cellDateType = null, onClick}: PropsInterface){
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
                <td className={className} onClick={onClick}>
                    <Button />
                </td> :
                <td className={className} onClick={onClick}>
                    <p>{cellData}</p>
                </td>)
        case "work":
            if(isEditMode) {
                return (
                    <td className={className} onClick={onClick}>
                        <Button />
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
                <td className={className} onClick={onClick}>
                    <Button />
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