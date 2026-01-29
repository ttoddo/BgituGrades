import Button from "./Button";


interface PropsInterface{
    isEditMode?: boolean;
    className?: string;
    cellType?: "student" | "work" | "date";
    workLink?: string | null;
    cellDateType: "Лаб" | "Прак" | null;
    cellData?: string;
}



export default function TableCell({isEditMode = false, className = "valuev", cellType = "student", workLink = null, cellData = "inCell", cellDateType = null}: PropsInterface){
    

    switch (cellType) {
        case "student":
                    
            return  (
                isEditMode ? 
                <td className={className}>
                    <Button />
                </td> :
                <td>
                    <p>{inputData}</p>
                </td>)

            break;
        case "work":
            if(isEditMode) {
                return (
                    <td className={className}>
                        <Button />
                    </td>) 
            } else {
                return (
                    
                    <td {if(workLink){onClick()}} className={className}>
                        {cellData}
                    </td>

                )

            }
            break;
        case "date":

            break;
    
        default:
            break;
    }
        
        
        
        

    
}