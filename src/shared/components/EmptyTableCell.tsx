import Select from "./Select";


interface EmptyPropsInterface{
    selectData: string[];
}





export default function EmptyTableCell({selectData = ["1", "2", "3"]}: EmptyPropsInterface){

    return (    
        <div>
            <Select selectData={selectData} />
        </div>
    )
}