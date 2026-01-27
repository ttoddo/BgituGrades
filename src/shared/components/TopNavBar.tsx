import Button from "./Button"
import Input from "./Input"
import Image from "../../assets/alt.png"

function TopNavBar(){
    return (
       <div className="h-[100px] mt-[55px] flex justify-between pl-[15px] items-end">
            <div className="flex gap-[25px] items-end">
                <img src={Image} alt="img" />
                <Input textChildren="Дисциплина" helpText="Название дисциплины..."/>
                <Input textChildren="Группа" helpText="Название группы..."/>
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