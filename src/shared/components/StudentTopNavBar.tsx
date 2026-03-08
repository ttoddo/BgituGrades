import Button from "./Button"
import Input from "./Input"
import type { DisciplineInterface, GroupInterface } from "../types/fromRequests";

interface PropsInterface {
    groups: GroupInterface[];
    disciplines: DisciplineInterface[];
    handleSearch: () => void;
}


export default function StudentTopNavBar({groups, disciplines, handleSearch}: PropsInterface){
    return (
       <div className="h-25 mt-13.75 flex justify-between pl-3.75 items-end">
            <div className="flex gap-6.25 items-end">
                <Input handleSearch={handleSearch} inputType="group" array={groups} textChildren="Группа" helpText="Название группы..."/>
                <Input handleSearch={handleSearch} inputType="discipline" array={disciplines} textChildren="Дисциплина" helpText="Название дисциплины..."/>
                <Input handleSearch={handleSearch} inputType="student" array={groups} textChildren="Студент" helpText="Имя студента..."/>
                <Input handleSearch={handleSearch} inputType="type" array={groups} textChildren="Тип отчетности" helpText="Тип отчетности..."/>
                <Input handleSearch={handleSearch} inputType="startDate" array={groups} textChildren="Начало периода" helpText="Начало периода..."/>
                <Input handleSearch={handleSearch} inputType="endDate" array={groups} textChildren="Конец периода" helpText="Окончание периода..."/>
            </div> 
            <div className="flex gap-6.25">
                <Button children="Скачать в Excel"/>
            </div>
       </div> 
    )
}

