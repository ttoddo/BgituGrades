import CustomSelect from "../components/CustomSelect";

interface EmptyPropsInterface{
    className?: string;
    cellType: "work" | "date" | null;
    backgroundColor?: string;
}


export default function EmptyTableCell({cellType, className = ""}: EmptyPropsInterface){
    const selectDataMarks = ["2", "3", "4", "5", "+"]
    const selectDataVisit = ["Н", "У", "П"]

    switch (cellType) {
        case "date":
            return (
                <td className={className}>
                    <CustomSelect selectData={selectDataVisit} />
                </td>
            )
            
            break;
        case "work":
            return (
                <td className={className}>
                    <CustomSelect selectData={selectDataMarks} />
                </td>
            )
        default:
            break;
    }
}