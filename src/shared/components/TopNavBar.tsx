import Button from "./Button"
import Input from "./Input"
import Image from "../../assets/alt.png"
import { useSearchParams } from "react-router-dom";

type Data = {
    id: number;
    name: string;
}


const hui:Data[] = [{id:1, name: "pidaras"}, {id:2, name:"gnida"}, {id:3, name:"huesos"}]

interface PropsInterface {
    groups: JSON[];
    disciplines: JSON[];
    handleSearch: () => void;
}


function TopNavBar({groups, disciplines, handleSearch}: PropsInterface){
    return (
       <div className="h-[100px] mt-[55px] flex justify-between pl-[15px] items-end">
            <div className="flex gap-[25px] items-end">
                <img className="mr-[13px]" src={Image} alt="img" />
                <Input handleSearch={handleSearch} inputType="discipline" array={disciplines} textChildren="Дисциплина" helpText="Название дисциплины..."/>
                <Input handleSearch={handleSearch} inputType="group" array={groups} textChildren="Группа" helpText="Название группы..."/>
            </div> 
            <div className="flex  gap-[25px]">
                <Button children="Редактировать"/>
                <Button children="Скачать в Excel"/>
                <Button children="Поделиться"/>
            </div>
       </div> 
    )
}

export default TopNavBar