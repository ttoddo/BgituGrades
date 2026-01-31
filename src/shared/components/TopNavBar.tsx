import Button from "./Button"
import Input from "./Input"
import Image from "../../assets/alt.png"

type Data = {
    id: number;
    name: string;
}


const hui:Data[] = [{id:1, name: "pidaras"}, {id:2, name:"gnida"}, {id:3, name:"huesos"}]



function TopNavBar(){
    return (
       <div className="h-[100px] mt-[55px] flex justify-between pl-[15px] items-end">
            <div className="flex gap-[25px] items-end">
                <img className="mr-[13px]" src={Image} alt="img" />
                <Input array={hui} textChildren="Дисциплина" helpText="Название дисциплины..."/>
                <Input array={hui} textChildren="Группа" helpText="Название группы..."/>
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