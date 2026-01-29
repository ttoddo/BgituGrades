
interface PropsInterface{
    selectData: string[];
}



export default function Select({selectData = ["П", "Н", "У"]}: PropsInterface){
    return (
        <select value=" " className="cellVariants">
            {selectData.map((val) => (
                 <option value={val}>{val}</option>
            ))}
        </select>
    )
}