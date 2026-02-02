import Button from "./Button"
import Input from "./Input"
import Image from "../../assets/alt.png"
import type { DisciplineInterface, GroupInterface } from "../types/fromRequests";

interface PropsInterface {
    groups: GroupInterface[];
    disciplines: DisciplineInterface[];
    handleSearch: () => void;
}


function TopNavBar({groups, disciplines, handleSearch}: PropsInterface){
    return (
       <div className="h-25 mt-13.75 flex justify-between pl-3.75 items-end">
            <div className="flex gap-6.25 items-end">
                <img className="mr-3.25" src={Image} alt="img" />
                <Input handleSearch={handleSearch} inputType="group" array={groups} textChildren="Группа" helpText="Название группы..."/>
                <Input handleSearch={handleSearch} inputType="discipline" array={disciplines} textChildren="Дисциплина" helpText="Название дисциплины..."/>
            </div> 
            <div className="flex gap-6.25">
                <Button children="Редактировать"/>
                <Button children="Скачать в Excel"/>
                <Button children="Поделиться"/>
            </div>
       </div> 
    )
}

export default TopNavBar