import CustomSelect from "../components/CustomSelect";

interface EmptyPropsInterface{
    className?: string;
    cellType: "work" | "date";
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